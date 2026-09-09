export function ArticleSummaryBox({
  brokerName,
  points,
}: {
  brokerName: string
  points: string[]
}) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-gradient-to-br from-navy-50 to-white p-5 md:p-6">
      <p className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-3 py-1 text-xs font-black text-white">
        <span className="text-gold-400" aria-hidden="true">
          ✓
        </span>
        3行でわかる{brokerName}
      </p>
      <ul className="mt-4 space-y-3">
        {points.map((point, i) => (
          <li key={point} className="flex gap-3 text-sm font-bold leading-relaxed text-navy-900">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-500 text-xs font-black text-navy-950">
              {i + 1}
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
