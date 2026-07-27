import { articles } from '@/data/articles-index'
import { brokers } from '@/data/brokers-index'
import { ArticleList } from '@/components/fx/ArticleList'
import { BrokerRankingList } from '@/components/fx/BrokerRankingList'
import { FeaturedArticleCard } from '@/components/fx/FeaturedArticleCard'
import { PopularArticles } from '@/components/fx/PopularArticles'
import { CategoryBrowse } from '@/components/fx/CategoryBrowse'
import { RiskDisclaimer } from '@/components/fx/RiskDisclaimer'
import { SiteFooter } from '@/components/fx/SiteFooter'
import { getArticleBySlug } from '@/lib/get-article'

const HUB_SLUG = 'kaigai-fx-hikaku-hub'
const POPULAR_SLUGS = ['kaigai-fx-hikaku-hub', 'xm-review', 'exness-review', 'titanfx-review', 'mt4-mt5-guide']

export default function Home() {
  const hubArticle = getArticleBySlug(HUB_SLUG)
  const otherArticles = articles.filter((article) => article.slug !== HUB_SLUG)
  const popularArticles = POPULAR_SLUGS.map((slug) => getArticleBySlug(slug)).filter(
    (article): article is NonNullable<typeof article> => article !== undefined
  )

  return (
    <main>
      <section className="bg-slate-900 px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold">UNIT-FX</h1>
          <p className="text-lg text-slate-200">
            海外FX業者の情報を中立的な視点で整理してお届けします。
          </p>
          <RiskDisclaimer />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pt-6">
        {hubArticle && <FeaturedArticleCard article={hubArticle} />}
      </div>

      <section className="mx-auto max-w-6xl space-y-4 px-6 py-6">
        <h2 className="text-2xl font-bold text-slate-900">
          業者比較(日本人トレーダーの利用実績が多いとされる順)
        </h2>
        <BrokerRankingList brokers={brokers} />
      </section>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 pb-16 lg:grid-cols-[1fr_320px]">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">特集記事</h2>
          <ArticleList articles={otherArticles} />
        </section>
        <aside className="space-y-6">
          <PopularArticles articles={popularArticles} />
          <CategoryBrowse articles={articles} />
        </aside>
      </div>

      <SiteFooter />
    </main>
  )
}
