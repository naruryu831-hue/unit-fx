import { xm } from './brokers/xm'
import { exness } from './brokers/exness'
import { titanfx } from './brokers/titanfx'
import { hfm } from './brokers/hfm'
import { bigboss } from './brokers/bigboss'
import { fxgt } from './brokers/fxgt'
import { axiory } from './brokers/axiory'
import type { Broker } from './brokers-types'

export const brokers: Broker[] = [
  xm,
  exness,
  titanfx,
  hfm,
  bigboss,
  fxgt,
  axiory,
]

export function getBrokerBySlug(slug: string): Broker | undefined {
  return brokers.find((b) => b.slug === slug)
}
