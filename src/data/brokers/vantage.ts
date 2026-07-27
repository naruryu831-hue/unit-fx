import type { Broker } from '../brokers-types'

export const vantage: Broker = {
  slug: 'vantage',
  name: 'Vantage (Vantage Markets)',
  officialUrl: 'https://www.vantagemarkets.com/',
  minAgeYears: 18,
  maxLeverage:
    '公式サイト参照(口座タイプにより異なり、最大2000:1、Premium Unlimited口座はレバレッジ無制限と案内されている情報あり)',
  minDeposit:
    '公式サイト参照(口座タイプにより異なり、Cent口座は少額から、Standard STPは50ドル、Premiumは500ドル前後という情報あり)',
  bonusSummary: '公式サイト参照',
  japaneseSupport: true,
  founded: 2009,
  summary:
    'Vantage(ヴァンテージ)は2009年設立の海外FX・CFDブローカーで、ASIC(オーストラリア)やFCA(英国)、VFSC(バヌアツ)など複数の金融当局からライセンスを取得したグループ企業が運営している。複数の口座タイプを提供しており、日本語でのサポート窓口も用意されている。',
}
