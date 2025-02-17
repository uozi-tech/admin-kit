import type { StdFormConfig, StdTableColumn } from '../types'
import { getRealContent } from './util'

export function getPlaceholder(column: StdTableColumn, config?: StdFormConfig) {
  const type = (config?.type ?? '') as string
  // if (!config || config?.[type]?.placeholder) {
  //   if (isFunction(config?.[type]?.placeholder)) {
  //     config[type].placeholder = config[type].placeholder()
  //   }
  //   return
  // }

  // if (!config?.[type])
  //   config[type] = {}

  // config[type].placeholder = getRealContent(config.formItem?.name ?? column.title ?? column.dataIndex as string)

  return getRealContent(config?.[type]?.placeholder ?? config?.formItem?.name ?? column.title ?? column.dataIndex as string)
}
