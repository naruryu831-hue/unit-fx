import Link from 'next/link'

const NAV = [
  { href: '/articles/kaigai-fx-hikaku-hub', label: '比較ランキング' },
  { href: '/articles/kaigai-fx-hajimekata', label: '始め方' },
  { href: '/articles/kaigai-fx-kouza-bonus-matome', label: 'ボーナス' },
  { href: '/articles/kaigai-fx-kakutei-shinkoku-yarikata', label: '税金' },
]

export function SiteLogo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="UNIT-FX トップへ">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold-500 text-sm font-black text-navy-950">
        U
      </span>
      <span
        className={`text-lg font-black tracking-tight ${light ? 'text-white' : 'text-navy-900'}`}
      >
        UNIT<span className="text-gold-500">-</span>FX
      </span>
    </Link>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <SiteLogo />
        <nav aria-label="主要ナビゲーション" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm font-bold text-slate-600 transition-colors hover:bg-navy-50 hover:text-navy-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/articles/kaigai-fx-hikaku-hub"
          className="rounded-lg bg-navy-900 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-navy-800 md:text-sm"
        >
          業者を比較する
        </Link>
      </div>
    </header>
  )
}
