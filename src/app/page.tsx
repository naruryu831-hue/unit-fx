import { articles } from '@/data/articles-index'
import { brokers } from '@/data/brokers-index'
import { ArticleList } from '@/components/fx/ArticleList'
import { BrokerRankingList } from '@/components/fx/BrokerRankingList'
import { RiskDisclaimer } from '@/components/fx/RiskDisclaimer'
import { SiteFooter } from '@/components/fx/SiteFooter'

export default function Home() {
  return (
    <main>
      <section className="bg-slate-900 text-white py-16 px-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold">UNIT-FX</h1>
          <p className="text-lg text-slate-200">
            海外FX業者の情報を中立的な視点で整理してお届けします。
          </p>
          <RiskDisclaimer />
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-6 p-6">
        <h2 className="text-2xl font-bold text-slate-900">掲載業者一覧</h2>
        <BrokerRankingList brokers={brokers} />
      </section>

      <section className="mx-auto max-w-3xl space-y-6 p-6">
        <h2 className="text-2xl font-bold text-slate-900">特集記事</h2>
        <ArticleList articles={articles} />
      </section>

      <SiteFooter />
    </main>
  )
}
