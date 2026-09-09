import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteFooter } from '@/components/fx/SiteFooter'

export const metadata: Metadata = {
  title: '運営者情報・編集方針 | UNIT-FX',
  description:
    'UNIT-FXの運営者情報、編集方針、記事の作成・更新ルール、広告掲載に関する方針、免責事項をまとめたページです。',
  alternates: { canonical: '/about' },
}

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: 'UNIT-FXとは',
    body: [
      'UNIT-FXは、国内FX業者と海外FX業者の取引条件を「公式サイトで確認できる事実」だけで整理する比較サイトです。取引単位、スプレッドの表示方式、レバレッジ、口座開設の手順、税金の扱いといった、口座を開く前に知っておくべき情報を業者ごとに揃えて掲載しています。',
      '運営者は個人で、金融商品取引業者ではありません。本サイトは特定の金融商品の売買を勧誘するものではなく、投資助言を行うものでもありません。',
    ],
  },
  {
    title: '編集方針',
    body: [
      '数値（レバレッジ、最低取引単位、通貨ペア数、登録番号など）は各社の公式サイト・約款・会社概要ページを一次情報として確認し、確認できなかった項目は「公式サイト参照」と明記します。他サイトの数値を転記して断定することはしません。',
      '「必ず儲かる」「絶対安全」といった断定的な利益表現は使いません。各記事にはリスクに関する注意書きを掲載しています。',
      '海外FX業者については、日本の金融庁に登録されていない業者であることを毎回明示します。国内FX業者については、金融商品取引業の登録番号を掲載します。',
      'ランキングの順位は金融的な優劣を採点したものではなく、掲載基準（初心者が最初の1社として選びやすいか、利用実績が多いとされるか）を記事内で明示したうえで編集部が並べたものです。',
    ],
  },
  {
    title: '記事の更新',
    body: [
      '各社の取引条件やキャンペーンは変更されることがあります。比較表には最終確認日を表示し、変更に気づいた時点で更新します。掲載内容と公式サイトの内容が異なる場合は、公式サイトの最新情報を優先してください。',
    ],
  },
  {
    title: '広告掲載について',
    body: [
      '本サイトはアフィリエイト広告を利用しています。記事内のリンクを経由して口座開設などが行われた場合、運営者が業者から成果報酬を受け取ることがあります。',
      '報酬の有無や金額によって、記事の評価や掲載順位を変えることはありません。提携していない業者も、比較に必要と判断すれば同じ基準で掲載します。',
    ],
  },
  {
    title: '免責事項',
    body: [
      'FX取引はレバレッジにより、預けた資金（元本）を超える損失が生じる可能性があります。国内FXでは追加証拠金（追証）が発生することがあります。',
      '本サイトの情報は執筆・更新時点のものであり、正確性・完全性を保証するものではありません。本サイトの情報を利用したことによって生じた損害について、運営者は責任を負いません。投資判断はご自身の責任で行ってください。',
      '税金に関する記述は一般的な取り扱いをまとめたものです。個別の申告については税務署または税理士にご確認ください。',
    ],
  },
  {
    title: 'お問い合わせ',
    body: [
      '掲載内容の誤りや更新のご指摘は、サイト運営者宛てにご連絡ください。訂正が必要と判断した場合は速やかに記事を更新します。',
    ],
  },
]

export default function AboutPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl space-y-8 px-5 py-8">
        <nav aria-label="パンくずリスト" className="text-xs text-slate-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-navy-900">
                トップ
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-bold text-navy-800">運営者情報・編集方針</li>
          </ol>
        </nav>
        <header>
          <h1 className="text-2xl font-black leading-tight text-navy-900 md:text-4xl">
            運営者情報・編集方針
          </h1>
        </header>
        <div className="space-y-8 rounded-2xl border border-line bg-white p-5 shadow-card md:p-10">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="border-l-4 border-gold-500 bg-navy-50 py-2 pl-4 text-lg font-black text-navy-900">
                {section.title}
              </h2>
              <div className="mt-4 space-y-3 text-[15px] leading-8 text-slate-700">
                {section.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
