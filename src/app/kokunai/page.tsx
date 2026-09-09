import type { Metadata } from 'next'
import { articles } from '@/data/articles-index'
import { domesticBrokers } from '@/data/brokers-index'
import { MarketIndex } from '@/components/fx/MarketIndex'

export const metadata: Metadata = {
  title: '国内FX 記事一覧（業者比較・始め方・税金） | UNIT-FX',
  description:
    '金融庁登録の国内FX主要業者の比較、口座開設手順、初心者向けの始め方、申告分離課税の税金まで。国内FXに関する記事の一覧です。',
  alternates: { canonical: '/kokunai' },
}

export default function KokunaiPage() {
  return (
    <MarketIndex
      market="domestic"
      title="国内FX"
      lead="金融庁に登録された国内FX業者の記事一覧です。レバレッジ25倍・追証あり・申告分離課税20.315%という国内の制度を前提に、業者比較から口座開設、税金までを整理しています。"
      articles={articles.filter((a) => a.market === 'domestic')}
      brokers={domesticBrokers}
      hubSlug="kokunai-fx-hikaku-hub"
    />
  )
}
