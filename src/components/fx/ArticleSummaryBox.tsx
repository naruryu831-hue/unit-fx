export function ArticleSummaryBox({
  brokerName,
  points,
}: {
  brokerName: string
  points: string[]
}) {
  return (
    <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-6">
      <p className="text-sm font-bold text-indigo-700">3行でわかる{brokerName}</p>
      <ul className="mt-3 space-y-2">
        {points.map((point, i) => (
          <li key={point} className="flex gap-2 text-sm font-bold text-slate-800">
            <span className="shrink-0 text-indigo-600">{i + 1}.</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
