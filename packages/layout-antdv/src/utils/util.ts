import type { Text } from '../props'
import { isFunction } from 'lodash-es'

export function getRealTitle(t: Text) {
  if (isFunction(t))
    return t()

  return t
}
