import type { Broker } from '../brokers-types'

export const gemforex: Broker = {
  slug: 'gemforex',
  name: 'GEMFOREX（ゲムフォレックス）',
  officialUrl: 'https://gemforex.io/',
  minAgeYears: 18,
  maxLeverage: '公式サイト参照',
  minDeposit: '公式サイト参照',
  bonusSummary: '公式サイト参照',
  japaneseSupport: true,
  founded: 2010,
  linkCaution: true,
  summary:
    'GEMFOREXは2010年に自動売買サービスGemTradeとして始まり、2014年に海外FXブランドとして展開されましたが、2023年5月にサービスを停止し、2024年1月には運営会社の破産手続きに伴い公式サイトも閉鎖されました。現在「公式」を名乗る複数のサイトが存在しますが、元の運営主体との関係や実態は確認できていません。',
}
