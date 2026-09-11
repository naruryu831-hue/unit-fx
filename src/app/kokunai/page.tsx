import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { articles } from '@/data/articles-index'
import { domesticBrokers } from '@/data/brokers-index'
import { MarketIndex } from '@/components/fx/MarketIndex'
import { SITE_MARKET, SITE_NAME } from '@/lib/site-config'

export function generateMetadata(): Metadata {
  // overseas ビルドでは notFound になるページなので、国内FXの文言を静的出力に残さない。
  if (SITE_MARKET !== 'domestic') {
    return {}
  }
  return {
    title: `国内FX 記事一覧（業者比較・始め方・税金） | ${SITE_NAME}`,
    description:
      '金融庁登録の国内FX主要業者の比較、口座開設手順、初心者向けの始め方、申告分離課税の税金まで。国内FXに関する記事の一覧です。',
    alternates: { canonical: '/kokunai' },
  }
}

export default function KokunaiPage() {
  if (SITE_MARKET !== 'domestic') {
    notFound()
  }

  return (
    <MarketIndex
      market="domestic"
      title="国内FX"
      lead="金融庁に登録された国内FX業者の記事一覧です。レバレッジ25倍・追証あり・申告分離課税20.315%という国内の制度を前提に、業者比較から口座開設、税金までを整理しています。"
      articles={articles}
      brokers={domesticBrokers}
      hubSlug="kokunai-fx-hikaku-hub"
    />
  )
}
