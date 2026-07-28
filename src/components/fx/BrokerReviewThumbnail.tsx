import { getBrokerColor } from '@/lib/broker-visual'

export function BrokerReviewThumbnail({
  brokerName,
  slug,
  caption = '口コミ・評判',
}: {
  brokerName: string
  slug: string
  caption?: string
}) {
  const color = getBrokerColor(slug)

  return (
    <div
      className={`mb-3 flex h-24 w-full flex-col items-center justify-center rounded-lg px-3 text-center text-white ${color}`}
    >
      <p className="text-base font-bold leading-tight">{brokerName}</p>
      <p className="mt-1 text-xs font-bold tracking-wide text-white/90">{caption}</p>
    </div>
  )
}
