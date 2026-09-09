import type { Metadata } from 'next'
import Link from 'next/link'
import { FxCalculators } from '@/components/fx/FxCalculators'
import { RiskDisclaimer } from '@/components/fx/RiskDisclaimer'
import { SiteFooter } from '@/components/fx/SiteFooter'

export const metadata: Metadata = {
  title: 'FX計算ツール（必要証拠金・pips損益・税金シミュレーター） | UNIT-FX',
  description:
    '必要証拠金とロスカット水準、pipsあたりの損益、国内FX（申告分離課税）と海外FX（総合課税）の税額を無料で試算できる計算ツールです。',
}

export default function ToolsPage() {
  return (
    <>
      <main className="mx-auto max-w-6xl space-y-8 px-5 py-8">
        <nav aria-label="パンくずリスト" className="text-xs text-slate-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-navy-900">
                トップ
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-bold text-navy-800">計算ツール</li>
          </ol>
        </nav>
        <header>
          <p className="inline-block rounded-md bg-navy-50 px-2 py-0.5 text-xs font-bold text-navy-800">
            無料ツール
          </p>
          <h1 className="mt-3 text-2xl font-black leading-tight text-navy-900 md:text-4xl">
            FX計算ツール：必要証拠金・pips損益・税金シミュレーター
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
            口座開設の前に「いくら必要か」「1pipsでいくら動くか」「税金はいくらか」を数字で確認できます。計算はブラウザ内で完結し、入力内容は送信されません。
          </p>
        </header>
        <RiskDisclaimer compact market="domestic" />
        <FxCalculators />
      </main>
      <SiteFooter />
    </>
  )
}
