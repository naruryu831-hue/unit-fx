import type { Broker } from '../brokers-types'

export const hfm: Broker = {
  slug: 'hfm',
  name: 'HFM(HotForex)',
  officialUrl: 'https://www.hfm.com/int/en/',
  minAgeYears: 18,
  maxLeverage: '公式サイト参照',
  minDeposit: '公式サイト参照',
  bonusSummary: '公式サイト参照',
  japaneseSupport: true,
  founded: 2010,
  summary:
    'HFM（旧HotForex）は2010年に設立された海外FX・CFDブローカーで、複数の金融ライセンス下でFX・貴金属・株価指数などのオンライン取引サービスを提供している。口座開設は18歳以上が対象で、日本語のライブチャット・メールサポートも用意されている。',
}
