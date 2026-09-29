import type { KeyFact } from '@/data/articles-types'

/** 口座開設記事の冒頭に出す「この業者の口座開設のポイント」表。業者ごとの違いを一目で見せる。 */
export function ArticleKeyFacts({ brokerName, facts }: { brokerName: string; facts: KeyFact[] }) {
  return (
    <section
      aria-label={`${brokerName}の口座開設のポイント`}
      className="rounded-2xl border border-line bg-white p-5 md:p-6"
    >
      <h2 className="text-sm font-black text-navy-900">
        {brokerName}の口座開設のポイント（この業者ならではの点）
      </h2>
      <dl className="mt-3 divide-y divide-line text-sm">
        {facts.map((fact) => (
          <div key={fact.label} className="grid gap-1 py-2.5 sm:grid-cols-[9rem_1fr] sm:gap-4">
            <dt className="font-bold text-slate-500">{fact.label}</dt>
            <dd className="font-bold leading-relaxed text-navy-900">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
