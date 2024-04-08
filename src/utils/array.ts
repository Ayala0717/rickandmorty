import { isDefined } from './helpers'

export function isEmptyArray<T>(array: T[]) {
  if (!array) return true
  return isDefined(array) && Array.isArray(array) && array.length === 0
}
