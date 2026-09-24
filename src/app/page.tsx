import Link from 'next/link'
import { articles } from '@/data/articles-index'
import { domesticBrokers, overseasBrokers } from '@/data/brokers-index'
import type { Article, ArticleCategory } from '@/data/articles-types'
import { ArticleList } from '@/components/fx/ArticleList'
import { FeaturedArticleCard } from '@/components/fx/FeaturedArticleCard'
import { PopularArticles } from '@/components/fx/PopularArticles'
import { CategoryBrowse } from '@/components/fx/CategoryBrowse'
import { RiskDisclaimer } from '@/components/fx/RiskDisclaimer'
import { SiteFooter } from '@/components/fx/SiteFooter'
import { ToolsPromo } from '@/components/fx/ToolsPromo'
import { getArticleBySlug } from '@/lib/get-article'
import { getBrokerLogoPath } from '@/lib/broker-logos'
import { getBrokerShortName } from '@/lib/broker-visual'
import { categoryLabels } from '@/lib/category-labels'
import { SITE_MARKET } from '@/lib/site-config'

const HUB_SLUG = SITE_MARKET === 'overseas' ? 'kaigai-fx-hikaku-hub' : 'kokunai-fx-hikaku-hub'
const MARKET_BROKERS = SITE_MARKET === 'overseas' ? overseasBrokers : domesticBrokers
const MARKET_ID = SITE_MARKET === 'overseas' ? 'kaigai' : 'kokunai'
const MARKET_TITLE = SITE_MARKET === 'overseas' ? '海外FX' : '国内FX'

const DOMESTIC_POPULAR_SLUGS = [
  'kokunai-fx-hikaku-hub',
  'kokunai-fx-shoshinsha-hajimekata',
  'kokunai-fx-zeikin-kakutei-shinkoku',
  'dmm-fx-review',
  'kokunai-fx-spread-hikaku',
]

const OVERSEAS_POPULAR_SLUGS = [
  'kaigai-fx-hikaku-hub',
  'xm-review',
  'kaigai-fx-hajimekata',
  'kaigai-fx-kakutei-shinkoku-yarikata',
  'exness-review',
]

const POPULAR_SLUGS = SITE_MARKET === 'overseas' ? OVERSEAS_POPULAR_SLUGS : DOMESTIC_POPULAR_SLUGS

const DOMESTIC_SECTIONS: { category: ArticleCategory; lead: string }[] = [
  { category: 'broker-review', lead: `金融庁登録の主要${domesticBrokers.length}社を、公表されている条件だけで整理` },
  { category: 'comparison', lead: '取引単位・スプレッドの読み方・アプリ・自動売買を観点別に比較' },
  { category: 'problem-solving', lead: '始め方・スワップなど、最初につまずくポイントを解消' },
  { category: 'account-opening', lead: '必要書類と申込手順を業者ごとに' },
  { category: 'tax', lead: '申告分離課税20.315%・損失繰越3年の実務' },
]

const OVERSEAS_SECTIONS: { category: ArticleCategory; lead: string }[] = [
  { category: 'broker-review', lead: '提携各社の特徴を、公表されている条件だけで整理' },
  { category: 'problem-solving', lead: '始める前の疑問・不安をひとつずつ解消' },
  { category: 'comparison', lead: 'スプレッド・口座タイプ・入金額など観点別に比較' },
  { category: 'tax', lead: '雑所得・総合課税の仕組みから申告手順まで' },
  { category: 'bonus-roundup', lead: '各社ボーナスの条件と受け取り方' },
  { category: 'account-opening', lead: '登録画面の項目に沿った口座開設手順' },
]

const MARKET_SECTIONS = SITE_MARKET === 'overseas' ? OVERSEAS_SECTIONS : DOMESTIC_SECTIONS

function SectionHeading({ category, lead }: { category: ArticleCategory; lead: string }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-xl font-black text-navy-900 md:text-2xl">
        <span className="h-6 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
        {categoryLabels[category]}
      </h3>
      <p className="mt-1 text-xs text-slate-500 md:text-sm">{lead}</p>
    </div>
  )
}

function MarketBlock({
  id,
  title,
  lead,
  sections,
  items,
}: {
  id: string
  title: string
  lead: string
  sections: { category: ArticleCategory; lead: string }[]
  items: Article[]
}) {
  return (
    <section id={id} className="scroll-mt-20 space-y-10">
      <div className="border-b-2 border-navy-900 pb-3">
        <h2 className="flex items-center justify-between text-2xl font-black text-navy-900 md:text-3xl">
          {title}
          <Link prefetch={false} href={`/${id}`} className="text-sm font-bold text-navy-800 hover:underline">
            すべて見る →
          </Link>
        </h2>
        <p className="mt-1 text-sm text-slate-500">{lead}</p>
      </div>
      {sections.map(({ category, lead: sectionLead }) => {
        const list = items.filter((article) => article.category === category)
        if (list.length === 0) return null
        return (
          <div key={category} className="space-y-5">
            <SectionHeading category={category} lead={sectionLead} />
            <ArticleList articles={list} />
          </div>
        )
      })}
    </section>
  )
}

function LogoStrip({ brokers, label }: { brokers: typeof domesticBrokers; label: string }) {
  return (
    <ul className="flex flex-wrap items-center gap-2" aria-label={label}>
      {brokers.map((broker) => {
        const logo = getBrokerLogoPath(broker.slug)
        return (
          <li
            key={broker.slug}
            className="grid h-11 min-w-24 place-items-center rounded-lg bg-white/95 px-3"
            title={broker.name}
          >
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt={broker.name} className="max-h-7 max-w-24 object-contain" />
            ) : (
              <span className="whitespace-nowrap text-xs font-black text-navy-900">
                {getBrokerShortName(broker.name)}
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default function Home() {
  const hub = getArticleBySlug(HUB_SLUG)
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
            {MARKET_TITLE}
            {MARKET_BROKERS.length}社 ・ 記事{articles.length}本
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
            FX業者を、
            <br className="md:hidden" />
            <span className="text-gold-400">事実だけ</span>で比べる。
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            取引単位・スプレッドの読み方・レバレッジ・税金。{MARKET_TITLE}を、公式サイトで確認できる条件だけを集め、断定的な利益表現を使わずに整理しています。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link prefetch={false}
              href={`/articles/${HUB_SLUG}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 px-6 py-3.5 text-sm font-black text-navy-950 shadow-[0_2px_0_#b8891f] transition-transform hover:-translate-y-px"
            >
              {MARKET_TITLE} 比較ランキング <span aria-hidden="true">→</span>
            </Link>
            <Link prefetch={false}
              href="/tools"
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              証拠金・税金の計算ツール
            </Link>
          </div>
          <div className="mt-10 space-y-3">
            <LogoStrip brokers={MARKET_BROKERS} label={`掲載中の${MARKET_TITLE}業者`} />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-6 px-5 pt-8">
        <RiskDisclaimer compact market={SITE_MARKET} />
        {hub && (
          <FeaturedArticleCard
            article={hub}
            brokers={MARKET_BROKERS}
            badge={MARKET_TITLE}
            lead={
              SITE_MARKET === 'overseas'
                ? `海外${MARKET_BROKERS.length}社をレバレッジ・最低入金額・日本語対応で横並び比較`
                : `金融庁登録${MARKET_BROKERS.length}社を、最低取引単位・通貨ペア数・ツールで横並び比較`
            }
          />
        )}
        <ToolsPromo market={SITE_MARKET} />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 pt-12 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-20">
          <MarketBlock
            id={MARKET_ID}
            title={MARKET_TITLE}
            lead={
              SITE_MARKET === 'overseas'
                ? '高レバレッジ・ゼロカット・総合課税。金融庁未登録の海外業者'
                : '金融庁登録業者。レバレッジ25倍・追証あり・申告分離課税20.315%'
            }
            sections={MARKET_SECTIONS}
            items={articles}
          />
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
