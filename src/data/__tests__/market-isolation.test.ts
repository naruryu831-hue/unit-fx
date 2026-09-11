import { describe, it, expect } from 'vitest'
import { allArticles } from '@/data/articles-index'
import { allBrokers } from '@/data/brokers-index'
import overseasSlugsJson from '@/data/overseas-slugs.json'

// 国内FX広告主は「掲載サイト内に海外FXの掲載・訴求があるサイト」を禁止しているため、
// domestic 記事に海外FXの内容が一切紛れ込んでいないことをデータの時点で保証する。

const OVERSEAS_BROKER_NAMES = ['XM', 'Exness', 'TitanFX', 'Titan FX', 'HFM', 'HotForex', 'BigBoss', 'FXGT', 'AXIORY']

function marketOf(article: { market?: 'domestic' | 'overseas' }): 'domestic' | 'overseas' {
  return article.market ?? 'overseas'
}

function extractArticleLinks(text: string): string[] {
  const re = /\[[^\]]+\]\(\/articles\/([a-z0-9-]+)\)/g
  const out: string[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    out.push(m[1])
  }
  return out
}

const domesticArticles = allArticles.filter((a) => marketOf(a) === 'domestic')
const overseasArticles = allArticles.filter((a) => marketOf(a) === 'overseas')
const slugToMarket = new Map(allArticles.map((a) => [a.slug, marketOf(a)]))
const slugToBroker = new Map(allBrokers.map((b) => [b.slug, b]))

describe('market isolation: domestic articles never mention overseas brokers', () => {
  it.each(domesticArticles)('article $slug has no overseas broker name', (article) => {
    const haystack = [
      article.title,
      article.body,
      ...(article.summaryPoints ?? []),
      ...article.faq.flatMap((f) => [f.question, f.answer]),
    ].join('\n')

    const found = OVERSEAS_BROKER_NAMES.filter((name) =>
      new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(haystack)
    )
    expect(found).toEqual([])
  })
})

describe('market isolation: in-body article links stay within the same market', () => {
  it.each(domesticArticles)('domestic article $slug only links to domestic articles', (article) => {
    const haystack = [article.body, ...article.faq.flatMap((f) => [f.question, f.answer])].join('\n')
    const linkedSlugs = extractArticleLinks(haystack)
    const crossMarket = linkedSlugs.filter((slug) => slugToMarket.get(slug) === 'overseas')
    expect(crossMarket).toEqual([])
  })

  it.each(overseasArticles)('overseas article $slug only links to overseas articles', (article) => {
    const haystack = [article.body, ...article.faq.flatMap((f) => [f.question, f.answer])].join('\n')
    const linkedSlugs = extractArticleLinks(haystack)
    const crossMarket = linkedSlugs.filter((slug) => slugToMarket.get(slug) === 'domestic')
    expect(crossMarket).toEqual([])
  })
})

describe('market isolation: relatedSlugs / brokerSlugs stay within the same market', () => {
  it.each(allArticles)('article $slug relatedSlugs are all same-market', (article) => {
    const market = marketOf(article)
    const crossMarket = (article.relatedSlugs ?? []).filter((slug) => {
      const relatedMarket = slugToMarket.get(slug)
      return relatedMarket !== undefined && relatedMarket !== market
    })
    expect(crossMarket).toEqual([])
  })

  it.each(allArticles)('article $slug brokerSlugs are all same-market', (article) => {
    const market = marketOf(article)
    const crossMarket = article.brokerSlugs.filter((slug) => {
      const broker = slugToBroker.get(slug)
      return broker !== undefined && (broker.market ?? 'overseas') !== market
    })
    expect(crossMarket).toEqual([])
  })
})

describe('market isolation: overseas-slugs.json matches allArticles', () => {
  it('contains exactly the overseas article slugs, sorted', () => {
    const expected = overseasArticles.map((a) => a.slug).sort()
    expect([...(overseasSlugsJson as string[])].sort()).toEqual(expected)
  })
})
