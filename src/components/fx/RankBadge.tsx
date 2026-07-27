export function RankBadge({ index }: { index: number }) {
  const label = String(index).padStart(2, '0')

  return (
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white font-bold text-sm">
      {label}
    </span>
  )
}
