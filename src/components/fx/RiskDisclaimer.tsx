import type { BrokerMarket } from '@/data/brokers-types'

const ITEMS: Record<BrokerMarket, string[]> = {
  overseas: [
    'FX取引はレバレッジにより、預けた資金(元本)を超える損失が生じる可能性があります。',
    '本サイトで紹介する海外FX業者の多くは、日本の金融庁に登録されていない海外業者です。',
    '本サイトは利益を保証するものではなく、断定的な利益表現は一切行っていません。投資判断はご自身の責任で行ってください。',
  ],
  domestic: [
    'FX取引はレバレッジにより、預けた資金(元本)を超える損失が生じる可能性があります。相場急変時には追加証拠金（追証）が発生することがあります。',
    '本サイトで紹介する国内FX業者は、金融商品取引法に基づき金融庁（財務局）に登録された業者です。取引条件は変更されることがあるため、最新情報は各社公式サイトでご確認ください。',
    '本サイトは利益を保証するものではなく、断定的な利益表現は一切行っていません。投資判断はご自身の責任で行ってください。',
  ],
}

export function RiskDisclaimer({
  compact = false,
  market = 'overseas',
}: {
  compact?: boolean
  market?: BrokerMarket
}) {
  return (
    <aside
      role="note"
      aria-label="リスク・注意事項"
      className={`rounded-xl border border-gold-500/40 bg-gold-50 text-amber-950 ${
        compact ? 'p-3 text-xs' : 'p-4 text-sm'
      }`}
    >
      <p className="flex items-center gap-1.5 font-black">
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4 text-gold-600">
          <path d="M10 2l8 14H2L10 2zm-1 5v4h2V7H9zm0 5v2h2v-2H9z" />
        </svg>
        リスク・注意事項
      </p>
      <p className="mt-1.5 font-bold leading-relaxed">
        ※当サイトはアフィリエイト広告を利用しています。リンク経由で口座開設が行われた場合、運営者が広告主から成果報酬を受け取ることがあります。
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
        {ITEMS[market].map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
    </aside>
  )
}
