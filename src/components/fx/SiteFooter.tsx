import Link from 'next/link'
import { SiteLogo } from './SiteHeader'

const LINKS = [
  { href: '/articles/kaigai-fx-hikaku-hub', label: '海外FX比較ランキング' },
  { href: '/articles/kaigai-fx-hajimekata', label: '海外FXの始め方' },
  { href: '/articles/kaigai-fx-kouza-bonus-matome', label: '口座開設ボーナスまとめ' },
  { href: '/articles/kaigai-fx-kakutei-shinkoku-yarikata', label: '確定申告のやり方' },
  { href: '/articles/kaigai-fx-sagi-fuan', label: '海外FXは詐欺？' },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 bg-navy-950 px-6 py-12 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_260px]">
        <div>
          <SiteLogo light />
          <h2 className="mt-6 text-sm font-black text-white">UNIT-FXについて</h2>
          <div className="mt-3 max-w-3xl space-y-3 text-xs leading-relaxed text-slate-400">
            <p>
              本サイトはアフィリエイト広告を利用しています。掲載する情報や紹介する海外FX業者のリンクを経由して申し込みが行われた場合、運営者が業者から成果報酬を受け取ることがあります。
            </p>
            <p>
              本サイトで紹介する海外FX業者の多くは、日本の金融庁に登録されていない海外業者です。投資判断は自己責任で行ってください。
            </p>
            <p>記載内容は執筆時点の情報であり、最新の情報は必ず公式サイトでご確認ください。</p>
          </div>
        </div>
        <nav aria-label="フッターナビゲーション">
          <h2 className="text-sm font-black text-white">よく読まれるページ</h2>
          <ul className="mt-3 space-y-2">
            {LINKS.map((link) => (
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
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-xs text-slate-500">
        © {year} UNIT-FX
      </p>
    </footer>
  )
}
