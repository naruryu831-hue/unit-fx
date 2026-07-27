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
  const safeValue = Math.max(0, value)
  const percentage = max > 0 ? Math.min(100, (safeValue / max) * 100) : 0

  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span>{displayValue}</span>
      </div>
      <div className="bg-slate-100 rounded-full h-2 mt-1">
        <div
          data-testid="spec-bar-fill"
          className="bg-indigo-600 rounded-full h-2"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
