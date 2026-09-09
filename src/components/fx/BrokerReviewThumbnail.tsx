import { getBrokerLogoPath } from '@/lib/broker-logos'
import { getBrokerShortName } from '@/lib/broker-visual'

export function BrokerReviewThumbnail({
  brokerName,
  slug,
  caption = '口コミ・評判',
}: {
  brokerName: string
  slug: string
  caption?: string
}) {
  const logoPath = getBrokerLogoPath(slug)

  return (
    <div className="relative mb-3 flex h-28 w-full items-center gap-4 overflow-hidden rounded-xl bg-gradient-to-br from-navy-950 to-navy-800 px-5 text-white">
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <span className="relative grid h-14 w-20 shrink-0 place-items-center rounded-lg bg-white px-2">
        {logoPath ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoPath} alt="" className="max-h-9 max-w-full object-contain" />
        ) : (
          <span className="text-sm font-black text-navy-900">{getBrokerShortName(brokerName)}</span>
        )}
      </span>
      <div className="relative min-w-0">
        <p className="line-clamp-2 text-base font-black leading-tight">{brokerName}</p>
        <p className="mt-1 text-xs font-bold tracking-wide text-gold-400">{caption}</p>
      </div>
    </div>
  )
}
