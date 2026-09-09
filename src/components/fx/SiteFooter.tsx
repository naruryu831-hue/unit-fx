import Link from 'next/link'
import { SiteLogo } from './SiteHeader'

const COLUMNS: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: '国内FX',
    links: [
      { href: '/kokunai', label: '国内FX 記事一覧' },
      { href: '/articles/kokunai-fx-hikaku-hub', label: '国内FX比較ランキング' },
      { href: '/articles/kokunai-fx-shoshinsha-hajimekata', label: '国内FXの始め方' },
      { href: '/articles/kokunai-fx-spread-hikaku', label: 'スプレッドの見方' },
      { href: '/articles/kokunai-fx-zeikin-kakutei-shinkoku', label: '国内FXの税金と確定申告' },
    ],
  },
  {
    heading: '海外FX',
    links: [
      { href: '/kaigai', label: '海外FX 記事一覧' },
      { href: '/articles/kaigai-fx-hikaku-hub', label: '海外FX比較ランキング' },
      { href: '/articles/kaigai-fx-hajimekata', label: '海外FXの始め方' },
      { href: '/articles/kaigai-fx-kouza-bonus-matome', label: '口座開設ボーナスまとめ' },
      { href: '/articles/kaigai-fx-kakutei-shinkoku-yarikata', label: '確定申告のやり方' },
    ],
  },
  {
    heading: 'サイト情報',
    links: [
      { href: '/tools', label: 'FX計算ツール' },
      { href: '/about', label: '運営者情報・編集方針' },
      { href: '/articles/kokunai-vs-kaigai-fx-meritto-demeritto', label: '国内FXと海外FXの違い' },
      { href: '/articles/kaigai-fx-sagi-fuan', label: '海外FXは詐欺？' },
    ],
  },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 bg-navy-950 px-6 py-12 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <SiteLogo light />
          <h2 className="mt-6 text-sm font-black text-white">UNIT-FXについて</h2>
          <div className="mt-3 max-w-3xl space-y-3 text-xs leading-relaxed text-slate-400">
            <p>
              UNIT-FXは、国内FX（金融庁登録の第一種金融商品取引業者）と海外FXを、公式サイトで確認できる条件だけを使って比較する情報サイトです。
            </p>
            <p>
              本サイトはアフィリエイト広告を利用しています。掲載するリンクを経由して口座開設や申し込みが行われた場合、運営者が業者から成果報酬を受け取ることがあります。報酬の有無や金額が掲載順位・評価に影響しないよう、
              <Link href="/about" className="text-slate-300 underline hover:text-gold-400">
                編集方針
              </Link>
              を定めて運用しています。
            </p>
            <p>
              海外FX業者の多くは、日本の金融庁に登録されていない海外業者です。国内FXは追証が発生する場合があり、いずれも元本が保証される取引ではありません。投資判断はご自身の責任で行ってください。
            </p>
            <p>
              記載内容は執筆時点の情報であり、スプレッド・キャンペーン・取引条件は変更されることがあります。最新の情報は必ず各社の公式サイトでご確認ください。税務の取り扱いについては税務署または税理士にご確認ください。
            </p>
          </div>
        </div>
        <nav aria-label="フッターナビゲーション" className="grid gap-8 sm:grid-cols-3">
          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h2 className="text-sm font-black text-white">{column.heading}</h2>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-slate-300 transition-colors hover:text-gold-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-xs text-slate-500">
        © {year} UNIT-FX
      </p>
    </footer>
  )
}
