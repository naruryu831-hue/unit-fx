const PALETTE = [
  'bg-indigo-600',
  'bg-emerald-600',
  'bg-amber-600',
  'bg-rose-600',
  'bg-sky-600',
  'bg-violet-600',
  'bg-teal-600',
  'bg-orange-600',
]

export function getBrokerInitials(name: string): string {
  const clean = name.replace(/[（(].*?[）)]/g, '').trim()
  const words = clean.split(/[\s-]+/).filter(Boolean)

  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }

  return clean.slice(0, 2).toUpperCase()
}

export function getBrokerColor(slug: string): string {
  let hash = 0
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) % PALETTE.length
  }
  return PALETTE[Math.abs(hash) % PALETTE.length]
}
