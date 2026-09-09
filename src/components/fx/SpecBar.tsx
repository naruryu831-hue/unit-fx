export function SpecBar({
  label,
  value,
  max,
  displayValue,
}: {
  label: string
  value: number
  max: number
  displayValue: string
}) {
  const isUnknown = Number.isNaN(value)
  const isUnlimited = value === Infinity
  const percentage = isUnknown
    ? 0
    : isUnlimited
      ? 100
      : max > 0
        ? Math.min(100, (Math.max(0, value) / max) * 100)
        : 0

  return (
    <div>
      <div className="flex items-start justify-between gap-3 text-xs">
        <span className="shrink-0 font-bold text-slate-500">{label}</span>
        <span className="tnum min-w-0 text-right font-black leading-snug text-navy-900">
          {displayValue}
        </span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-navy-50">
        {isUnknown ? (
          <div
            data-testid="spec-bar-unknown"
            className="h-2 rounded-full border border-dashed border-slate-300"
          />
        ) : (
          <div
            data-testid="spec-bar-fill"
            className={`h-2 rounded-full bg-gradient-to-r ${
              isUnlimited ? 'from-emerald-400 to-emerald-600' : 'from-navy-700 to-navy-900'
            }`}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  )
}
