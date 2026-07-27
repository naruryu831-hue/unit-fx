import type { Broker } from '../brokers-types'

export const fxgt: Broker = {
  slug: 'fxgt',
  name: 'FXGT（FXGT.com）',
  officialUrl: 'https://fxgt.com/',
  minAgeYears: 18,
  maxLeverage: '最大1:5000（Optimus口座で一定の取引条件を満たした場合。通常口座は最大1:1000）',
  minDeposit:
    '口座タイプにより異なり最低5〜10ドル程度（Optimus口座は10ドル、その他口座は5ドル〜。日本円での銀行振込等は別途条件あり）',
  bonusSummary: '公式サイト参照',
  japaneseSupport: true,
  founded: 2019,
  summary:
    'FXGT（運営会社GT Global Ltd、セーシェル金融庁ライセンス）は2019年にサービスを開始した海外FX・暗号資産CFD業者で、複数の口座タイプと最大1:5000（条件付き）のレバレッジ、24時間対応の日本語サポートを提供している。',
}
