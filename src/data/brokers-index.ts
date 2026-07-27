import { xm } from './brokers/xm'
import { exness } from './brokers/exness'
import { titanfx } from './brokers/titanfx'
import { hfm } from './brokers/hfm'
import { bigboss } from './brokers/bigboss'
import { fxgt } from './brokers/fxgt'
import { axiory } from './brokers/axiory'
import { tradeview } from './brokers/tradeview'
import { threetrader } from './brokers/threetrader'
import { vantage } from './brokers/vantage'
import { landfx } from './brokers/landfx'
import { icMarkets } from './brokers/ic-markets'
import { fbs } from './brokers/fbs'
import { miltonMarkets } from './brokers/milton-markets'
import { ironfx } from './brokers/ironfx'
import { tradersTrust } from './brokers/traders-trust'
import { dooPrime } from './brokers/doo-prime'
import { puPrime } from './brokers/pu-prime'
import { windsorBrokers } from './brokers/windsor-brokers'
import { vtMarkets } from './brokers/vt-markets'
import type { Broker } from './brokers-types'

export const brokers: Broker[] = [
  xm,
  exness,
  titanfx,
  hfm,
  bigboss,
  fxgt,
  axiory,
  tradeview,
  threetrader,
  vantage,
  landfx,
  icMarkets,
  fbs,
  miltonMarkets,
  ironfx,
  tradersTrust,
  dooPrime,
  puPrime,
  windsorBrokers,
  vtMarkets,
]

export function getBrokerBySlug(slug: string): Broker | undefined {
  return brokers.find((b) => b.slug === slug)
}
