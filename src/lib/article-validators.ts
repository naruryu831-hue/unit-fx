import type { Article } from '@/data/articles-types'

const COUNT_TITLE_PATTERN = /(\d+)\s*(選|社|本)/

export function validateArticleTitleCount(article: Article): string[] {
  const errors: string[] = []
  const match = article.title.match(COUNT_TITLE_PATTERN)
  if (match) {
    const claimedCount = Number(match[1])
    if (claimedCount !== article.brokerSlugs.length) {
      errors.push(
        `title claims ${claimedCount} items but brokerSlugs has ${article.brokerSlugs.length}`
      )
    }
  }
  if (article.faq.length < 1) {
    errors.push('article must include at least one FAQ item')
  }
  return errors
}

/** 見出し（■行）の最大文字数。これを超えると見出しの帯が段落になってしまう。 */
export const MAX_HEADING_LENGTH = 60

const HEADING_LINE_PREFIX = '■'
const HEADING_NUMBER_RE = /^(\d+)(?:-\d+)?\.\s?/
// 完全なリンク記法 `[表示文字](/path)`
const LINK_MARKUP_RE = /\[[^\]]+\]\(\/[^\s)]+\)/g
const RAW_URL_RE = /https?:\/\/\S+/

function headingTexts(body: string): string[] {
  return body
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith(HEADING_LINE_PREFIX))
    .map((line) => line.slice(HEADING_LINE_PREFIX.length).trim())
}

/**
 * 記事の表記ルール検査（ビルド前に走らせる）。
 * - 見出しが長すぎない（結論段落がそのまま見出しになる事故を防ぐ）
 * - 見出しにリンク記法を置かない
 * - FAQ のリンク記法が壊れていない（部品が変換するのは完全な記法のみ）
 * - 本文・FAQ に生の URL を置かない（リンクにならず読みにくい）
 * - 見出しの番号が 1 から始まる（「2-1.」から始まる親なし番号を防ぐ）
 */
export function validateArticleMarkup(article: Article): string[] {
  const errors: string[] = []
  const headings = headingTexts(article.body)

  for (const text of headings) {
    if (text.length > MAX_HEADING_LENGTH) {
      errors.push(`heading is ${text.length} chars (max ${MAX_HEADING_LENGTH}): "${text.slice(0, 30)}…"`)
    }
    if (text.includes('](')) {
      errors.push(`heading contains link markup: "${text.slice(0, 30)}…"`)
    }
  }

  const firstNumbered = headings
    .map((text) => text.match(HEADING_NUMBER_RE))
    .find((match): match is RegExpMatchArray => match !== null)
  if (firstNumbered && firstNumbered[1] !== '1') {
    errors.push(`heading numbering starts at "${firstNumbered[0].trim()}" instead of 1.`)
  }

  article.faq.forEach((item, index) => {
    for (const [label, text] of [
      ['question', item.question],
      ['answer', item.answer],
    ] as const) {
      if (text.replace(LINK_MARKUP_RE, '').includes('](')) {
        errors.push(`faq[${index}] ${label} contains broken link markup`)
      }
      if (RAW_URL_RE.test(text)) {
        errors.push(`faq[${index}] ${label} contains a raw URL`)
      }
    }
  })

  if (RAW_URL_RE.test(article.body)) {
    errors.push('body contains a raw URL (https://…)')
  }

  return errors
}
