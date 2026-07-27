import type { Broker } from '../brokers-types'

export const bigboss: Broker = {
  slug: 'bigboss',
  name: 'BigBoss',
  officialUrl: 'https://www.bigboss-financial.com/',
  minAgeYears: 18,
  maxLeverage: '最大2222倍（口座タイプにより異なる。公式サイト参照）',
  minDeposit: '公式サイト参照',
  bonusSummary:
    '公式サイト参照（BigBoss Pointsプログラムや、独自コイン「BigBoss Coin(BBC)」建て入金時の10%クレジットボーナスなど複数のプロモーションを実施。時期により内容が変動するため詳細は公式サイトで要確認）',
  japaneseSupport: true,
  founded: 2013,
  summary:
    'BigBossはセントビンセント・グレナディーン諸島を拠点とする海外FX業者で、日本語でのサポートに対応している。海外FXであるため国内FXとは異なる規制・リスクがあり、利用にあたっては公式サイトで最新の条件を確認することが望ましい。',
}
