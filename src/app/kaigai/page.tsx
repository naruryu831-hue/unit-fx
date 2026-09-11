import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { articles } from '@/data/articles-index'
import { overseasBrokers } from '@/data/brokers-index'
import { MarketIndex } from '@/components/fx/MarketIndex'
import { SITE_MARKET, SITE_NAME } from '@/lib/site-config'

export function generateMetadata(): Metadata {
  // domestic ビルドでは notFound になるページなので、海外FXの文言を静的出力に一切残さない。
  if (SITE_MARKET !== 'overseas') {
    return {}
  }
  return {
    title: `海外FX 記事一覧（業者比較・ボーナス・税金） | ${SITE_NAME}`,
    description:
      '海外FX業者の比較、口座開設手順、ボーナスの条件、出金・入金方法、総合課税の税金まで。海外FXに関する記事の一覧です。',
    alternates: { canonical: '/kaigai' },
  }
}

export default function KaigaiPage() {
  if (SITE_MARKET !== 'overseas') {
    notFound()
  }

  return (
    <MarketIndex
      market="overseas"
      title="海外FX"
      lead="日本の金融庁に登録されていない海外FX業者の記事一覧です。高レバレッジ・ゼロカット・総合課税という海外の条件を前提に、業者比較からボーナス、出金、税金までを整理しています。"
      articles={articles}
      brokers={overseasBrokers}
      hubSlug="kaigai-fx-hikaku-hub"
    />
  )
}
