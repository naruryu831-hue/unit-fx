import { getBrokerShortName, getBrokerColor } from '@/lib/broker-visual'
import { getBrokerLogoPath } from '@/lib/broker-logos'

const SIZES = {
  md: { image: 'h-9', text: 'text-lg', bar: 'h-6' },
  lg: { image: 'h-12', text: 'text-2xl', bar: 'h-8' },
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
  const { image, text, bar } = SIZES[size]

  if (logoPath) {
    return (
      // next/image は画像ごとの寸法指定が必要だが、業者ロゴは縦横比がばらばらなため
      // 高さ固定・幅autoで比率を保てる img を使う。
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoPath}
        alt={`${name}のロゴ`}
        className={`${image} w-auto max-w-[170px] shrink-0 object-contain object-left`}
      />
    )
  }

  // 公式ロゴ画像が未設置の業者は、実ロゴと並べても浮かない横長のワードマークで表示する。
  return (
    <span className={`inline-flex shrink-0 items-center gap-2 ${image}`}>
      <span className={`w-1 rounded-full ${bar} ${getBrokerColor(slug)}`} />
      <span className={`font-bold tracking-tight text-slate-900 ${text}`}>
        {getBrokerShortName(name)}
      </span>
    </span>
  )
}
