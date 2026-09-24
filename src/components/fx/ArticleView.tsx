import Link from 'next/link'
import type { Article } from '@/data/articles-types'
import type { Broker } from '@/data/brokers-types'
import { RiskDisclaimer } from './RiskDisclaimer'
import { ComparisonTable } from './ComparisonTable'
import { DomesticComparisonTable } from './DomesticComparisonTable'
import { BrokerRankingList } from './BrokerRankingList'
import { DomesticRankingList } from './DomesticRankingList'
import { BrokerCtaBanner } from './BrokerCtaBanner'
import { ArticleSummaryBox } from './ArticleSummaryBox'
import { BrokerLogo } from './BrokerLogo'
import { FaqSection } from './FaqSection'
import { RelatedArticles } from './RelatedArticles'
import { TableOfContents } from './TableOfContents'
import { ArticleBody } from './ArticleBody'
import { SiteFooter } from './SiteFooter'
import { ToolsPromo } from './ToolsPromo'
import { ArticleMeta, AuthorBox } from './ArticleMeta'
import { JsonLd } from './JsonLd'
import { getRelatedArticles } from '@/lib/get-article'
import { extractHeadings } from '@/lib/parse-body'
import { categoryLabels } from '@/lib/category-labels'
import { DEFAULT_UPDATED_AT, SITE_NAME, SITE_URL } from '@/lib/site-config'

/** 検索意図が『どれを選ぶか』の記事は、結論の比較表を本文より先に見せる。 */
const CTA_FIRST_CATEGORIES = new Set<Article['category']>(['comparison', 'bonus-roundup'])

export function ArticleView({ article, brokers }: { article: Article; brokers: Broker[] }) {
  const headings = extractHeadings(article.body)
  const isHub = article.category === 'hub'
  const isSingleBrokerReview = article.category === 'broker-review' && article.brokerSlugs.length === 1
  const singleBroker = brokers.length === 1 ? brokers[0] : null
  const isTwoBrokerCta = !isHub && brokers.length === 2
  const showComparisonBeforeBody =
    !isHub && CTA_FIRST_CATEGORIES.has(article.category) && brokers.length >= 3
  const showComparisonAfterBody = !isHub && brokers.length > 0 && !showComparisonBeforeBody
  const market = article.market ?? 'overseas'
  const isDomestic = market === 'domestic'
  const marketLabel = isDomestic ? '国内FX' : '海外FX'
  const marketHref = isDomestic ? '/kokunai' : '/kaigai'
  const updatedAt = article.updatedAt ?? DEFAULT_UPDATED_AT
  const url = `${SITE_URL}/articles/${article.slug}`

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'トップ', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: marketLabel, item: `${SITE_URL}${marketHref}` },
      { '@type': 'ListItem', position: 3, name: article.title, item: url },
    ],
  }
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    url,
    mainEntityOfPage: url,
    datePublished: updatedAt,
    dateModified: updatedAt,
    inLanguage: 'ja',
    author: { '@type': 'Organization', name: `${SITE_NAME}編集部`, url: `${SITE_URL}/about` },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    articleSection: categoryLabels[article.category],
    about: brokers.map((b) => ({ '@type': 'Organization', name: b.name, url: b.officialUrl })),
  }
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: brokers.map((broker, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: { '@type': 'Organization', name: broker.name, url: broker.officialUrl },
    })),
  }
  const brokerOrganizationLd = singleBroker
    ? {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: singleBroker.name,
        url: singleBroker.officialUrl,
        description: singleBroker.summary,
      }
    : null

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={articleLd} />
      {isHub && <JsonLd data={itemListLd} />}
      {isSingleBrokerReview && brokerOrganizationLd && <JsonLd data={brokerOrganizationLd} />}
      <article className="mx-auto max-w-6xl space-y-8 px-5 py-8">
        <nav aria-label="パンくずリスト" className="text-xs text-slate-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link prefetch={false} href="/" className="hover:text-navy-900">
                トップ
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link prefetch={false} href={marketHref} className="hover:text-navy-900">
                {marketLabel}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-bold text-navy-800">{categoryLabels[article.category]}</li>
          </ol>
        </nav>

        {singleBroker ? (
          <header className="flex flex-col gap-5 rounded-2xl border border-line bg-white p-6 shadow-card sm:flex-row sm:items-center">
            <BrokerLogo name={singleBroker.name} slug={singleBroker.slug} size="lg" />
            <div className="space-y-2">
              <p className="inline-block rounded-md bg-navy-50 px-2 py-0.5 text-xs font-bold text-navy-800">
                {marketLabel} ・ {categoryLabels[article.category]} ・ {singleBroker.name}
              </p>
              <h1 className="text-2xl font-black leading-tight text-navy-900 md:text-3xl">
                {article.title}
              </h1>
              <ArticleMeta updatedAt={updatedAt} />
            </div>
          </header>
        ) : (
          <header className="space-y-3">
            <p className="inline-block rounded-md bg-navy-50 px-2 py-0.5 text-xs font-bold text-navy-800">
              {marketLabel} ・ {categoryLabels[article.category]}
            </p>
            <h1 className="text-2xl font-black leading-tight text-navy-900 md:text-4xl">
              {article.title}
            </h1>
            <ArticleMeta updatedAt={updatedAt} />
          </header>
        )}

        {isHub && (
          <div className="space-y-5">
            <RiskDisclaimer market={market} />
            {isDomestic ? (
              <DomesticRankingList brokers={brokers} />
            ) : (
              <BrokerRankingList brokers={brokers} />
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
          <div className="min-w-0 space-y-8">
            <div className="space-y-8 rounded-2xl border border-line bg-white p-5 shadow-card md:p-10">
              {!isHub && <RiskDisclaimer compact market={market} />}
              {singleBroker && article.summaryPoints && (
                <ArticleSummaryBox brokerName={singleBroker.name} points={article.summaryPoints} />
              )}
              {singleBroker && <BrokerCtaBanner broker={singleBroker} />}
              {isTwoBrokerCta && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {brokers.map((broker) => (
                    <BrokerCtaBanner key={broker.slug} broker={broker} />
                  ))}
                </div>
              )}
              {showComparisonBeforeBody &&
                (isDomestic ? (
                  <DomesticComparisonTable brokers={brokers} />
                ) : (
                  <ComparisonTable brokers={brokers} />
                ))}
              <ArticleBody body={article.body} />
              {showComparisonAfterBody &&
                (isDomestic ? (
                  <DomesticComparisonTable brokers={brokers} />
                ) : (
                  <ComparisonTable brokers={brokers} />
                ))}
              {singleBroker && <BrokerCtaBanner broker={singleBroker} />}
              <FaqSection items={article.faq} />
            </div>
            <AuthorBox />
            <ToolsPromo market={market} />
            <RelatedArticles articles={getRelatedArticles(article)} />
          </div>
          <aside className="lg:sticky lg:top-20 lg:h-fit">
            <TableOfContents items={headings} />
          </aside>
        </div>
      </article>
      <SiteFooter />
    </>
  )
}
