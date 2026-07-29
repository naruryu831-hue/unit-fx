import type { Broker } from '@/data/brokers-types'
import { getBrokerSignupLink } from '@/lib/affiliates'
import { CtaButton } from './CtaButton'

export function BrokerCtaBanner({ broker }: { broker: Broker }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
      <p className="text-sm font-bold text-slate-700">{broker.bonusSummary}</p>
      <CtaButton href={broker.linkCaution ? null : getBrokerSignupLink(broker.slug)}>
        無料で口座開設する（{broker.name}公式サイト）
      </CtaButton>
    </div>
  )
}
