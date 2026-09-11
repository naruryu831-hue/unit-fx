import Link from 'next/link'
import { SITE_LOGO_LETTER, SITE_MARKET, SITE_NAME } from '@/lib/site-config'

const NAV =
  SITE_MARKET === 'overseas'
    ? [
        { href: '/kaigai', label: '海外FX' },
        { href: '/articles/kaigai-fx-hajimekata', label: '始め方' },
        { href: '/tools', label: '計算ツール' },
        { href: '/articles/kaigai-fx-kakutei-shinkoku-yarikata', label: '税金' },
      ]
    : [
        { href: '/kokunai', label: '国内FX' },
        { href: '/articles/kokunai-fx-shoshinsha-hajimekata', label: '始め方' },
        { href: '/tools', label: '計算ツール' },
        { href: '/articles/kokunai-fx-zeikin-kakutei-shinkoku', label: '税金' },
      ]

const HUB_HREF =
  SITE_MARKET === 'overseas' ? '/articles/kaigai-fx-hikaku-hub' : '/articles/kokunai-fx-hikaku-hub'

export function SiteLogo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label={`${SITE_NAME} トップへ`}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold-500 text-sm font-black text-navy-950">
        {SITE_LOGO_LETTER}
      </span>
      <span
        className={`text-lg font-black tracking-tight ${light ? 'text-white' : 'text-navy-900'}`}
      >
        {SITE_MARKET === 'overseas' ? (
          <>
            海外<span className="text-gold-500">FX</span>比較ラボ
          </>
        ) : (
          <>
            UNIT<span className="text-gold-500">-</span>FX
          </>
        )}
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
          href={HUB_HREF}
          className="rounded-lg bg-navy-900 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-navy-800 md:text-sm"
        >
          業者を比較する
        </Link>
      </div>
    </header>
  )
}
