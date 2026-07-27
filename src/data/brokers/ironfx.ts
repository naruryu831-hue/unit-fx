import type { Broker } from '../brokers-types'

export const ironfx: Broker = {
  slug: 'ironfx',
  name: 'IronFX(アイアンFX)',
  officialUrl: 'https://www.ironfx.com/ja/',
  minAgeYears: 18,
  maxLeverage: '最大1000倍（口座タイプ・キャンペーンにより異なる場合あり。公式サイト参照）',
  minDeposit: '口座タイプにより異なる（公式サイト参照）',
  bonusSummary:
    '入金ボーナス（シェアリングボーナスなど）を実施。内容・条件は時期により変動するため詳細は公式サイトで要確認',
  japaneseSupport: true,
  founded: 2010,
  summary:
    'IronFXは2010年にキプロスで設立された海外FX・CFDブローカーで、CySEC・FCA・ASIC・FSCA等の金融ライセンスを保有するグループのもと運営されている。過去に日本市場からの撤退や海外での出金トラブルが報じられた経緯があり、現在は日本語サポート体制を整えて日本人向けサービスを再開しているが、口座開設前に運営実態や規約を公式サイトで十分確認することが望ましい。',
}
