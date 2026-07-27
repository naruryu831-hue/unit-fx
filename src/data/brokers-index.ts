import { xm } from './brokers/xm'
import { exness } from './brokers/exness'
import { titanfx } from './brokers/titanfx'
import { hfm } from './brokers/hfm'
import { bigboss } from './brokers/bigboss'
import { gemforex } from './brokers/gemforex'
import { fxgt } from './brokers/fxgt'
import { axiory } from './brokers/axiory'
import { tradeview } from './brokers/tradeview'
import { threetrader } from './brokers/threetrader'
import { vantage } from './brokers/vantage'
import { landfx } from './brokers/landfx'
import type { Broker } from './brokers-types'

export const brokers: Broker[] = [
  xm,
  exness,
  titanfx,
  hfm,
  bigboss,
  gemforex,
  fxgt,
  axiory,
  tradeview,
  threetrader,
  vantage,
  landfx,
]

export function getBrokerBySlug(slug: string): Broker | undefined {
  return brokers.find((b) => b.slug === slug)
}
