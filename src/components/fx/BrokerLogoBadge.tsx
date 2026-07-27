import { getBrokerInitials, getBrokerColor } from '@/lib/broker-visual'

export function BrokerLogoBadge({
  name,
  slug,
  size = 'md',
}: {
  name: string
  slug: string
  size?: 'md' | 'lg'
}) {
  const initials = getBrokerInitials(name)
  const color = getBrokerColor(slug)
  const sizeClass = size === 'lg' ? 'w-16 h-16 text-xl' : 'w-12 h-12 text-sm'

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${sizeClass} rounded-2xl ${color} font-bold text-white`}
    >
      {initials}
    </span>
  )
}
