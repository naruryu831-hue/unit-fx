import { articles } from '@/data/articles-index'
import { ArticleList } from '@/components/fx/ArticleList'

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">UNIT-FX</h1>
      <p>海外FX業者の比較・レビュー情報をお届けします。</p>
      <ArticleList articles={articles} />
    </main>
  )
}
