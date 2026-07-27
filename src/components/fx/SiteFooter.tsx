export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 py-10 px-6">
      <h2 className="text-white font-bold text-lg mb-4">UNIT-FXについて</h2>
      <div className="text-sm leading-relaxed space-y-3 max-w-3xl">
        <p>
          本サイトはアフィリエイト広告を利用しています。掲載する情報や紹介する海外FX業者のリンクを経由して申し込みが行われた場合、運営者が業者から成果報酬を受け取ることがあります。
        </p>
        <p>
          本サイトで紹介する海外FX業者の多くは、日本の金融庁に登録されていない海外業者です。投資判断は自己責任で行ってください。
        </p>
        <p>
          記載内容は執筆時点の情報であり、最新の情報は必ず公式サイトでご確認ください。
        </p>
        <p>© {year} UNIT-FX</p>
      </div>
    </footer>
  )
}
