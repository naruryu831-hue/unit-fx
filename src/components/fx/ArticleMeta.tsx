import Link from 'next/link'
import { SITE_LOGO_LETTER, SITE_MARKET, SITE_NAME, formatJaDate } from '@/lib/site-config'

export function ArticleMeta({ updatedAt }: { updatedAt: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
      <span>
        最終更新日: <time dateTime={updatedAt}>{formatJaDate(updatedAt)}</time>
      </span>
      <span>
        執筆:{' '}
        <Link prefetch={false} href="/about" className="font-bold text-navy-800 hover:underline">
          {SITE_NAME}編集部
        </Link>
      </span>
      <span>本ページはプロモーションを含みます</span>
    </div>
  )
}

export function AuthorBox() {
  return (
    <section
      aria-label="この記事について"
      className="flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-card"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-500 text-lg font-black text-navy-950">
        {SITE_LOGO_LETTER}
      </span>
      <div className="text-sm">
        <p className="font-black text-navy-900">{SITE_NAME}編集部</p>
        <p className="mt-1 leading-relaxed text-slate-600">
          {SITE_MARKET === 'overseas' ? '海外FX' : '国内FX'}
          の取引条件を、各社の公式サイト・約款を一次情報として確認し、断定的な利益表現を使わずに整理しています。数値は最終確認日時点のもので、変更に気づき次第更新します。
        </p>
        <Link prefetch={false} href="/about" className="mt-2 inline-block font-bold text-navy-800 hover:underline">
          編集方針・運営者情報を見る →
        </Link>
      </div>
    </section>
  )
}
