import { describe, it, expect } from 'vitest'
import { parseBody, extractHeadings } from '../parse-body'
import { xmReview } from '@/data/articles/xm-review'

describe('parseBody', () => {
  it('parses a single heading line', () => {
    const blocks = parseBody('■ XMとは何か')
    expect(blocks).toEqual([
      { type: 'heading', level: 2, id: 'heading-1', text: 'XMとは何か' },
    ])
  })

  it('treats a heading with a plain number (no hyphen) as level 2', () => {
    const blocks = parseBody('■ 3. 全20社の特徴')
    expect(blocks[0]).toMatchObject({
      type: 'heading',
      level: 2,
      text: '3. 全20社の特徴',
    })
  })

  it('treats a heading with a hyphenated number as level 3', () => {
    const blocks = parseBody('■ 3-1. XM（XM Trading）')
    expect(blocks[0]).toMatchObject({
      type: 'heading',
      level: 3,
      text: '3-1. XM（XM Trading）',
    })
  })

  it('treats a heading with no number at all as level 2', () => {
    const blocks = parseBody('■ まとめ')
    expect(blocks[0]).toMatchObject({ type: 'heading', level: 2, text: 'まとめ' })
  })

  it('does not misidentify a heading containing a bare number+kanji as numbered', () => {
    // e.g. "1988年からの沿革" - digits followed by 年, not by "." -> should stay level 2
    const blocks = parseBody('■ 1988年からの沿革と日本市場への展開について')
    expect(blocks[0]).toMatchObject({ type: 'heading', level: 2 })
  })

  it('groups consecutive ・ lines into a single ul block', () => {
    const blocks = parseBody('・項目1\n・項目2')
    expect(blocks).toEqual([{ type: 'ul', items: ['項目1', '項目2'] }])
  })

  it('groups consecutive numbered lines into a single ol block', () => {
    const blocks = parseBody('1. 手順1\n2. 手順2')
    expect(blocks).toEqual([{ type: 'ol', items: ['手順1', '手順2'] }])
  })

  it('does not treat "■ 1. 見出し" as an ol item, only as a heading', () => {
    const blocks = parseBody('■ 1. 見出し\n\n本文段落です。')
    expect(blocks).toEqual([
      { type: 'heading', level: 2, id: 'heading-1', text: '1. 見出し' },
      { type: 'paragraph', text: '本文段落です。' },
    ])
  })

  it('parses a heading directly followed by a paragraph', () => {
    const body = '■ 見出し\n\nこれは段落です。'
    const blocks = parseBody(body)
    expect(blocks).toEqual([
      { type: 'heading', level: 2, id: 'heading-1', text: '見出し' },
      { type: 'paragraph', text: 'これは段落です。' },
    ])
  })

  it('separates blank-line-delimited paragraphs', () => {
    const body = '段落1です。\n\n段落2です。'
    const blocks = parseBody(body)
    expect(blocks).toEqual([
      { type: 'paragraph', text: '段落1です。' },
      { type: 'paragraph', text: '段落2です。' },
    ])
  })

  it('parses the opening of the real xm-review body correctly', () => {
    const blocks = parseBody(xmReview.body)

    // intro paragraph, then first heading section
    expect(blocks[0]).toMatchObject({ type: 'paragraph' })
    expect(blocks[1]).toMatchObject({
      type: 'heading',
      level: 2,
      text: 'XM(XM Trading)とは',
    })
    expect(blocks[2]).toMatchObject({ type: 'paragraph' })

    // there should be a ul block somewhere (the spec list) and an ol block
    // somewhere (the deposit-notes list) further down
    expect(blocks.some((b) => b.type === 'ul')).toBe(true)
    expect(blocks.some((b) => b.type === 'ol')).toBe(true)

    // every heading in xm-review has no numbering, so all headings are level 2
    const headingBlocks = blocks.filter((b) => b.type === 'heading')
    expect(headingBlocks.length).toBeGreaterThan(8)
    expect(headingBlocks.every((b) => b.type === 'heading' && b.level === 2)).toBe(
      true
    )

    // the very last heading should be まとめ
    const lastHeading = headingBlocks[headingBlocks.length - 1]
    expect(lastHeading).toMatchObject({ text: 'まとめ' })
  })
})

describe('extractHeadings', () => {
  it('returns only headings, in order, with matching ids', () => {
    const body = '■ 見出し1\n\n本文。\n\n■ 見出し2\n\n・項目A\n・項目B'
    const headings = extractHeadings(body)
    const blocks = parseBody(body)
    const headingBlocks = blocks.filter((b) => b.type === 'heading')

    expect(headings).toEqual([
      { id: 'heading-1', level: 2, text: '見出し1' },
      { id: 'heading-2', level: 2, text: '見出し2' },
    ])
    expect(headings).toEqual(
      headingBlocks.map((b) => ({ id: b.id, level: b.level, text: b.text }))
    )
  })

  it('returns an empty array when there are no headings', () => {
    expect(extractHeadings('ただの段落です。')).toEqual([])
  })
})
