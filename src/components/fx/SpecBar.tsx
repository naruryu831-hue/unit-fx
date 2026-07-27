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
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span>{displayValue}</span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-slate-100">
        {isUnknown ? (
          <div
            data-testid="spec-bar-unknown"
            className="h-2 rounded-full border border-dashed border-slate-300"
          />
        ) : (
          <div
            data-testid="spec-bar-fill"
            className={`h-2 rounded-full ${isUnlimited ? 'bg-emerald-500' : 'bg-indigo-600'}`}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  )
}
