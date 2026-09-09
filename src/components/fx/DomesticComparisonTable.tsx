import type { Broker } from '@/data/brokers-types'
import { getBrokerLink } from '@/lib/affiliates'
import { CtaButton } from './CtaButton'

export function DomesticComparisonTable({ brokers }: { brokers: Broker[] }) {
  return (
    <section aria-label="国内FX業者比較表">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-black text-navy-900">
        <span className="h-5 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
        掲載業者の比較表
      </h2>
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[860px] border-collapse text-sm">
          <thead>
            <tr className="bg-navy-900 text-left text-xs text-white">
              <th className="p-3 font-bold">業者名</th>
              <th className="p-3 font-bold">最低取引単位</th>
              <th className="p-3 font-bold">通貨ペア数</th>
              <th className="p-3 font-bold">レバレッジ</th>
              <th className="p-3 font-bold">取引ツール</th>
              <th className="p-3 font-bold">登録番号</th>
              <th className="p-3 font-bold">公式サイト</th>
            </tr>
          </thead>
          <tbody>
            {brokers.map((broker, i) => (
              <tr
                key={broker.slug}
                className={`border-b border-line align-top ${i % 2 === 1 ? 'bg-paper' : 'bg-white'}`}
              >
                <td className="p-3 font-black text-navy-900">
                  {broker.name}
                  {broker.company && (
                    <span className="mt-0.5 block text-[11px] font-normal text-slate-500">
                      {broker.company}
                    </span>
                  )}
                </td>
                <td className="p-3 font-bold text-navy-900">{broker.minTradeUnit ?? '公式サイト参照'}</td>
                <td className="p-3">{broker.currencyPairs ?? '公式サイト参照'}</td>
                <td className="p-3 text-xs">{broker.maxLeverage}</td>
                <td className="p-3 text-xs">{broker.tools ?? '公式サイト参照'}</td>
                <td className="p-3 text-xs text-slate-600">{broker.registration ?? '公式サイト参照'}</td>
                <td className="p-3">
                  <CtaButton href={broker.linkCaution ? null : getBrokerLink(broker.slug)} size="sm">
                    公式サイト
                  </CtaButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
        ※ 数値は各社公式サイトの公表情報をもとに編集部が整理したものです（最終確認日: 2026年9月）。取引条件は変更されることがあるため、口座開設前に必ず公式サイトでご確認ください。
      </p>
    </section>
  )
}
