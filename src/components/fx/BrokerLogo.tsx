import { getBrokerShortName, getBrokerColor } from '@/lib/broker-visual'
import { getBrokerLogoPath } from '@/lib/broker-logos'

const SIZES = {
  md: { frame: 'h-12 w-28 px-2', image: 'max-h-8', text: 'text-base' },
  lg: { frame: 'h-16 w-36 px-3', image: 'max-h-11', text: 'text-xl' },
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
  const { frame, image, text } = SIZES[size]

  // 業者ごとにロゴの形（正方形のアイコン／横長のワードマーク）が異なるため、
  // 共通の枠に収めて中央寄せすることで一覧に並べたときの見た目を揃える。
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white ${frame}`}
    >
      {logoPath ? (
        // next/image は画像ごとの寸法指定が必要だが、業者ロゴは縦横比がばらばらなため
        // 枠内で比率を保てる img を使う。
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoPath}
          alt={`${name}のロゴ`}
          className={`${image} max-w-full object-contain`}
        />
      ) : (
        <span className="inline-flex items-center gap-1.5">
          <span className={`h-5 w-1 rounded-full ${getBrokerColor(slug)}`} />
          <span className={`font-bold tracking-tight text-slate-900 ${text}`}>
            {getBrokerShortName(name)}
          </span>
        </span>
      )}
    </span>
  )
}
