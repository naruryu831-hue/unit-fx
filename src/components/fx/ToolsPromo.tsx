import Link from 'next/link'
import type { BrokerMarket } from '@/data/brokers-types'

const TOOLS = [
  { href: '/tools#margin', label: '必要証拠金・ロスカット計算', desc: '通貨量とレバレッジから必要証拠金と維持率を試算' },
  { href: '/tools#pips', label: 'pips損益計算', desc: '値幅と取引数量から損益額を円で確認' },
  { href: '/tools#tax', label: 'FX税金シミュレーター', desc: '国内(申告分離)と海外(総合課税)の税額を比較' },
]

export function ToolsPromo({ market = 'overseas' }: { market?: BrokerMarket }) {
  return (
    <section
      aria-label="計算ツール"
      className="rounded-2xl border border-navy-100 bg-gradient-to-br from-navy-50 to-white p-6"
    >
      <h2 className="flex items-center gap-2 text-lg font-black text-navy-900">
        <span className="h-5 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
        無料の計算ツールで試算する
      </h2>
      <p className="mt-1 text-xs text-slate-500">
        {market === 'domestic'
          ? 'レバレッジ25倍・申告分離課税の国内FX条件で計算できます。'
          : '高レバレッジ・総合課税の海外FX条件でも計算できます。'}
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {TOOLS.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              className="block h-full rounded-xl border border-line bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-navy-900 hover:shadow-card-hover"
            >
              <span className="block text-sm font-black text-navy-900">{tool.label}</span>
              <span className="mt-1 block text-xs leading-relaxed text-slate-500">{tool.desc}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
