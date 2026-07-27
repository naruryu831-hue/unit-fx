import type { Broker } from '../brokers-types'

export const threetrader: Broker = {
  slug: 'threetrader',
  name: 'ThreeTrader（スリートレーダー）',
  officialUrl: 'https://www.threetrader.com/',
  minAgeYears: 18,
  maxLeverage: '1:1000（FX主要通貨・金属が対象。通貨ペア等により異なる）',
  minDeposit:
    '100 USD相当（PURE Spread口座・RAW Zero口座とも公式FAQに記載。国内銀行振込は1,000円から可能）',
  bonusSummary: '公式サイト参照',
  japaneseSupport: true,
  founded: 2021,
  summary:
    'ThreeTraderはバヌアツ金融サービス委員会（VFSC）のライセンスを保有する海外FX業者で、最大レバレッジ1:1000のトレーディング環境と日本語によるチャット・メールサポートを提供している。RAW ZeroとPURE Spreadの2種類の口座タイプを用意しており、公式サイトでは各種手数料・スプレッド条件が確認できる。',
}
