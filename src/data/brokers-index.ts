import { xm } from './brokers/xm'
import type { Broker } from './brokers-types'

export const brokers: Broker[] = [xm]

export function getBrokerBySlug(slug: string): Broker | undefined {
  return brokers.find((b) => b.slug === slug)
}
