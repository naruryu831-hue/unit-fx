import type { Broker } from '@/data/brokers-types'
import { getBrokerSignupLink, hasAffiliateLink } from '@/lib/affiliates'
import { CtaButton } from './CtaButton'
import { BrokerLogo } from './BrokerLogo'

export function BrokerCtaBanner({ broker }: { broker: Broker }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-950 to-navy-800 p-6 text-center text-white md:p-8">
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div className="relative flex flex-col items-center gap-4">
        <BrokerLogo name={broker.name} slug={broker.slug} />
        <p className="text-sm font-bold text-slate-200">{broker.bonusSummary}</p>
        {hasAffiliateLink(broker.slug) ? (
          <CtaButton href={broker.linkCaution ? null : getBrokerSignupLink(broker.slug)} size="lg">
            無料で口座開設する（{broker.name}公式サイト）
          </CtaButton>
        ) : (
          <CtaButton
            href={broker.linkCaution ? null : getBrokerSignupLink(broker.slug)}
            variant="text"
            sponsored={false}
          >
            公式サイトで確認する
          </CtaButton>
        )}
        <p className="text-[11px] text-slate-400">
          最低入金額 {broker.minDeposit} ・ 最大レバレッジ {broker.maxLeverage}
        </p>
      </div>
    </div>
  )
}
