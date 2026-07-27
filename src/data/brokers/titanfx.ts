import type { Broker } from '../brokers-types'

export const titanfx: Broker = {
  slug: 'titanfx',
  name: 'TitanFX（タイタンFX）',
  officialUrl: 'https://titanfx.jp/',
  minAgeYears: 18,
  maxLeverage:
    '最大2,000倍（口座タイプにより異なり、Zeroマイクロ口座が最大2,000倍、Zeroスタンダード/ブレード口座は最大1,000倍。詳細・適用条件は公式サイト参照）',
  minDeposit: '公式サイト参照',
  bonusSummary:
    '公式サイトでは口座開設ボーナス・入金ボーナスは提供なしと明記されており、紹介プログラム等の特典が案内されている（詳細は公式サイト参照）。',
  japaneseSupport: true,
  founded: 2014,
  summary:
    'TitanFX（タイタンFX）は2014年設立の海外FX業者で、日本語での問い合わせサポートを提供している。口座開設は18歳以上が対象で、口座タイプごとにスプレッドやレバレッジ条件が異なる。',
}
