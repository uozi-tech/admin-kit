import type { StdFormConfig, StdTableColumn } from '../types'
import { isFunction } from './util'

export function placeholder(column: StdTableColumn, config?: StdFormConfig) {
  const type = (config?.type ?? '') as string
  if (!config || config?.[type]?.placeholder) {
    if (isFunction(config?.[type]?.placeholder)) {
      config[type].placeholder = config[type].placeholder()
    }
    return
  }

  if (!config?.[type])
    config[type] = {}

  config[type].placeholder = column.dataIndex as string ?? config.formItem?.name
}
