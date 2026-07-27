const TOP_RANK_STYLES: Record<number, string> = {
  1: 'bg-amber-400 text-slate-900',
  2: 'bg-slate-300 text-slate-900',
  3: 'bg-amber-700 text-white',
}

export function RankBadge({ index }: { index: number }) {
  const colorClass = TOP_RANK_STYLES[index] ?? 'bg-slate-900 text-white'

  return (
    <span
      className={`inline-flex h-14 w-14 flex-col items-center justify-center rounded-full font-bold ${colorClass}`}
    >
      <span className="text-lg leading-none">{index}</span>
      <span className="mt-0.5 text-[10px] leading-none">位</span>
    </span>
  )
}
