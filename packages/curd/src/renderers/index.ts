import type { CustomRenderArgs } from '../types/props'
import { get } from 'lodash-es'

export * from './date'
export * from './hiddenText'
export * from './mask'
export * from './media'

export function actualFieldRender(actualFieldName: string) {
  return (props: CustomRenderArgs) => {
    return get(props.record, actualFieldName) ?? '/'
  }
}
