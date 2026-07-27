import type { Broker } from '@/data/brokers-types'

export function validateBroker(broker: Broker): string[] {
  const errors: string[] = []
  if (!broker.slug) errors.push('slug is required')
  if (!broker.name) errors.push('name is required')
  if (!broker.officialUrl.startsWith('http')) errors.push('officialUrl must be a valid URL')
  if (broker.minAgeYears < 18) errors.push('minAgeYears must be 18 or above')
  return errors
}
