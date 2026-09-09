import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getBrokersForArticle } from '@/lib/get-article'
import { ArticleView } from '@/components/fx/ArticleView'
import { articles } from '@/data/articles-index'
import { SITE_URL } from '@/lib/site-config'

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

function buildDescription(body: string): string {
  const firstParagraph = body.split('\n').find((line) => line.trim() !== '' && !line.startsWith('■')) ?? ''
  const text = firstParagraph.replace(/\s+/g, ' ').trim()
  return text.length > 118 ? `${text.slice(0, 118)}…` : text
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) {
    return {}
  }
  const marketLabel = article.market === 'domestic' ? '国内FX' : '海外FX'
  const title = `${article.title} | UNIT-FX ${marketLabel}比較`
  const description = buildDescription(article.body)
  const url = `${SITE_URL}/articles/${article.slug}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'UNIT-FX', type: 'article', locale: 'ja_JP' },
    twitter: { card: 'summary', title, description },
  }
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) {
    notFound()
  }
  const brokers = getBrokersForArticle(article)
  return <ArticleView article={article} brokers={brokers} />
}
