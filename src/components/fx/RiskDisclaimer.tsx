export function RiskDisclaimer() {
  return (
    <aside
      role="note"
      aria-label="リスク・注意事項"
      className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"
    >
      <p className="font-bold">リスク・注意事項</p>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>FX取引はレバレッジにより、預けた資金(元本)を超える損失が生じる可能性があります。</li>
        <li>本サイトで紹介する海外FX業者の多くは、日本の金融庁に登録されていない海外業者です。</li>
        <li>
          本サイトは利益を保証するものではなく、断定的な利益表現は一切行っていません。投資判断はご自身の責任で行ってください。
        </li>
      </ul>
    </aside>
  )
}
