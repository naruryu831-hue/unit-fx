import type { Broker } from '../brokers-types'

export const windsorBrokers: Broker = {
  slug: 'windsor-brokers',
  name: 'Windsor Brokers(ウィンザーブローカー)',
  officialUrl: 'https://windsorbrokers.com/',
  minAgeYears: 18,
  maxLeverage: '500倍（ダイナミックレバレッジ制、口座タイプ・銘柄により異なる）',
  minDeposit: '100米ドル相当（口座タイプにより異なる。詳細は公式サイト参照）',
  bonusSummary: '口座開設ボーナス・入金ボーナスあり（詳細・条件は公式サイト参照）',
  japaneseSupport: true,
  founded: 1988,
  summary:
    'Windsor Brokersは1988年から運営される老舗ブランドで、2021年頃から日本語サポート体制を整え日本人トレーダー向けの案内を行っている海外FX業者。',
}
