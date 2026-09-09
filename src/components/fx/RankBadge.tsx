const TOP_RANK_STYLES: Record<number, string> = {
  1: 'bg-gradient-to-b from-gold-400 to-gold-600 text-navy-950 ring-gold-400/60',
  2: 'bg-gradient-to-b from-slate-200 to-slate-400 text-navy-950 ring-slate-300/60',
  3: 'bg-gradient-to-b from-amber-600 to-amber-800 text-white ring-amber-600/50',
}

export function RankBadge({ index }: { index: number }) {
  const colorClass = TOP_RANK_STYLES[index] ?? 'bg-navy-900 text-white ring-navy-900/30'

  return (
    <span
      className={`inline-flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-full font-black shadow-sm ring-4 ${colorClass}`}
    >
      <span className="text-xl leading-none">{index}</span>
      <span className="mt-0.5 text-[10px] leading-none">位</span>
    </span>
  )
}
