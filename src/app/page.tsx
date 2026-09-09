import Link from 'next/link'
import { articles } from '@/data/articles-index'
import { brokers } from '@/data/brokers-index'
import type { ArticleCategory } from '@/data/articles-types'
import { ArticleList } from '@/components/fx/ArticleList'
import { FeaturedArticleCard } from '@/components/fx/FeaturedArticleCard'
import { PopularArticles } from '@/components/fx/PopularArticles'
import { CategoryBrowse } from '@/components/fx/CategoryBrowse'
import { RiskDisclaimer } from '@/components/fx/RiskDisclaimer'
import { SiteFooter } from '@/components/fx/SiteFooter'
import { getArticleBySlug } from '@/lib/get-article'
import { getBrokerLogoPath } from '@/lib/broker-logos'
import { getBrokerShortName } from '@/lib/broker-visual'
import { categoryLabels } from '@/lib/category-labels'

const HUB_SLUG = 'kaigai-fx-hikaku-hub'
const POPULAR_SLUGS = [
  'kaigai-fx-hikaku-hub',
  'xm-review',
  'exness-review',
  'kaigai-fx-hajimekata',
  'kaigai-fx-kakutei-shinkoku-yarikata',
]

const SECTIONS: { category: ArticleCategory; lead: string }[] = [
  { category: 'broker-review', lead: '提携各社の特徴を、公表されている条件だけで整理' },
  { category: 'problem-solving', lead: '始める前の疑問・不安をひとつずつ解消' },
  { category: 'comparison', lead: 'スプレッド・口座タイプ・入金額など観点別に比較' },
  { category: 'tax', lead: '雑所得・総合課税の仕組みから申告手順まで' },
  { category: 'bonus-roundup', lead: '各社ボーナスの条件と受け取り方' },
  { category: 'account-opening', lead: '登録画面の項目に沿った口座開設手順' },
]

function SectionHeading({ category, lead }: { category: ArticleCategory; lead: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="flex items-center gap-2 text-xl font-black text-navy-900 md:text-2xl">
          <span className="h-6 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
          {categoryLabels[category]}
        </h2>
        <p className="mt-1 text-xs text-slate-500 md:text-sm">{lead}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const hubArticle = getArticleBySlug(HUB_SLUG)
  const popularArticles = POPULAR_SLUGS.map((slug) => getArticleBySlug(slug)).filter(
    (article): article is NonNullable<typeof article> => article !== undefined
  )

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 px-5 pb-14 pt-16 text-white md:pb-20 md:pt-24">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div
          className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold text-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden="true" />
            提携{brokers.length}社 ・ 記事{articles.length}本
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
            海外FX業者を、
            <br className="md:hidden" />
            <span className="text-gold-400">事実だけ</span>で比べる。
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            レバレッジ・最低入金額・日本語サポート・税金。公式サイトで確認できる条件だけを集め、断定的な利益表現を使わずに海外FX業者を整理しています。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/articles/${HUB_SLUG}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 px-6 py-3.5 text-sm font-black text-navy-950 shadow-[0_2px_0_#b8891f] transition-transform hover:-translate-y-px"
            >
              比較ランキングを見る <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/articles/kaigai-fx-hajimekata"
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              初心者向け：始め方5ステップ
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap items-center gap-2" aria-label="掲載業者">
            {brokers.map((broker) => {
              const logo = getBrokerLogoPath(broker.slug)
              return (
                <li
                  key={broker.slug}
                  className="grid h-11 w-24 place-items-center rounded-lg bg-white/95 px-2"
                  title={broker.name}
                >
                  {logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={logo} alt={broker.name} className="max-h-7 max-w-full object-contain" />
                  ) : (
                    <span className="text-xs font-black text-navy-900">
                      {getBrokerShortName(broker.name)}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-6 px-5 pt-8">
        <RiskDisclaimer compact />
        {hubArticle && <FeaturedArticleCard article={hubArticle} />}
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 pt-12 lg:grid-cols-[1fr_320px]">
        <div className="space-y-14">
          {SECTIONS.map(({ category, lead }) => {
            const items = articles.filter((article) => article.category === category)
            if (items.length === 0) return null
            return (
              <section key={category} className="space-y-5">
                <SectionHeading category={category} lead={lead} />
                <ArticleList articles={items} />
              </section>
            )
          })}
        </div>
        <aside className="space-y-6 lg:sticky lg:top-20 lg:h-fit">
          <PopularArticles articles={popularArticles} />
          <CategoryBrowse articles={articles} />
        </aside>
      </div>

      <SiteFooter />
    </main>
  )
}
