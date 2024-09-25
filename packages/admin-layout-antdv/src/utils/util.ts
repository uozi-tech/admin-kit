import { isFunction } from 'lodash-es'
import { Title } from '../props.ts'

export function getRealTitle(t: Title) {
  if (isFunction(t))
    return t()

  return t
}
