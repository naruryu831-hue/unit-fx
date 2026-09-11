import { xm } from './brokers/xm'
import { exness } from './brokers/exness'
import { titanfx } from './brokers/titanfx'
import { hfm } from './brokers/hfm'
import { bigboss } from './brokers/bigboss'
import { fxgt } from './brokers/fxgt'
import { axiory } from './brokers/axiory'
import { dmmFx } from './brokers/dmm-fx'
import { gmoClick } from './brokers/gmo-click'
import { sbiFxtrade } from './brokers/sbi-fxtrade'
import { gaitame } from './brokers/gaitame'
import { minnaFx } from './brokers/minna-fx'
import { matsuiFx } from './brokers/matsui-fx'
import { hiroseLionfx } from './brokers/hirose-lionfx'
import { gmoGaika } from './brokers/gmo-gaika'
import { fxtf } from './brokers/fxtf'
import { jfx } from './brokers/jfx'
import { lightFx } from './brokers/light-fx'
import type { Broker, BrokerMarket } from './brokers-types'
import { SITE_MARKET } from '@/lib/site-config'

export const allBrokers: Broker[] = [
  xm,
  exness,
  titanfx,
  hfm,
  bigboss,
  fxgt,
  axiory,
  dmmFx,
  gmoClick,
  sbiFxtrade,
  gaitame,
  minnaFx,
  matsuiFx,
  hiroseLionfx,
  gmoGaika,
  fxtf,
  jfx,
  lightFx,
]

export function getBrokerMarket(broker: Broker): BrokerMarket {
  return broker.market ?? 'overseas'
}

export function getBrokersByMarket(market: BrokerMarket): Broker[] {
  return allBrokers.filter((b) => getBrokerMarket(b) === market)
}

/** SITE_MARKET でフィルタ済みの業者一覧。 */
export const brokers: Broker[] = getBrokersByMarket(SITE_MARKET)

/**
 * フィルタ済み brokers から検索する。別市場の業者スラッグを渡すと undefined になり、
 * 呼び出し側（getBrokersForArticle 等）でビルド時に throw させて市場をまたいだ参照漏れを検出する。
 */
export function getBrokerBySlug(slug: string): Broker | undefined {
  return brokers.find((b) => b.slug === slug)
}

export const overseasBrokers = getBrokersByMarket('overseas')
export const domesticBrokers = getBrokersByMarket('domestic')
