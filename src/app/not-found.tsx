import Link from 'next/link'
import { SiteFooter } from '@/components/fx/SiteFooter'
import { SITE_MARKET } from '@/lib/site-config'

const NOT_FOUND_LINKS =
  SITE_MARKET === 'overseas'
    ? [
        { href: '/kaigai', label: '海外FXの記事一覧' },
        { href: '/tools', label: 'FX計算ツール' },
      ]
    : [
        { href: '/kokunai', label: '国内FXの記事一覧' },
        { href: '/tools', label: 'FX計算ツール' },
      ]

export default function NotFound() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-5 py-20 text-center">
        <p className="text-sm font-black tracking-widest text-gold-600">404</p>
        <h1 className="mt-3 text-2xl font-black text-navy-900 md:text-4xl">ページが見つかりません</h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          URLが変更されたか、記事が削除された可能性があります。以下から目的のページをお探しください。
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          {NOT_FOUND_LINKS.map((l) => (
            <li key={l.href}>
              <Link prefetch={false}
                href={l.href}
                className="block rounded-xl border border-line bg-white px-4 py-3 text-sm font-bold text-navy-900 shadow-card hover:border-navy-900"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  )
}
