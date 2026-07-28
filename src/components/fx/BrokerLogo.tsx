import { getBrokerInitials, getBrokerColor } from '@/lib/broker-visual'
import { getBrokerLogoPath } from '@/lib/broker-logos'

const SIZES = {
  md: { box: 'h-12 w-12 text-sm', image: 'h-10' },
  lg: { box: 'h-16 w-16 text-xl', image: 'h-14' },
} as const

export function BrokerLogo({
  name,
  slug,
  size = 'md',
}: {
  name: string
  slug: string
  size?: keyof typeof SIZES
}) {
  const logoPath = getBrokerLogoPath(slug)
  const { box, image } = SIZES[size]

  if (logoPath) {
    return (
      // next/image は画像ごとの寸法指定が必要で、業者ロゴは縦横比がばらばらなため
      // ここでは高さ固定・幅auto で比率を保てる img を使う。
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoPath}
        alt={`${name}のロゴ`}
        className={`${image} w-auto max-w-[160px] shrink-0 object-contain`}
      />
    )
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl font-bold text-white ${box} ${getBrokerColor(slug)}`}
    >
      {getBrokerInitials(name)}
    </span>
  )
}
