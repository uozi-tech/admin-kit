import type { StdTableColumn } from '../types'

export function isFunction(value: any): value is Function {
  return typeof value === 'function'
}

export function isPlainObject(value: any): value is object {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function getColumnKey(column: StdTableColumn) {
  if (column.key)
    return column.key

  if (Array.isArray(column.dataIndex))
    return column.dataIndex.join('.')

  return column.dataIndex
}

export function getRealContent(content?: string | (() => string)) {
  if (isFunction(content)) {
    return content()
  }

  return content ?? ''
}

export function getEditLabel(c: StdTableColumn, mode: 'Edit' | 'Detail' | 'Search' = 'Edit') {
  if (c.edit?.formItem?.[`hiddenLabelIn${mode}`]) {
    return
  }

  return getRealContent(c.edit?.formItem?.label ?? c.title)
}

export function getSearchLabel(c: StdTableColumn) {
  if (typeof c.search === 'boolean') {
    return getEditLabel(c, 'Search')
  }

  if (c.search?.formItem?.hiddenLabelInSearch) {
    return
  }

  return getRealContent(c.search?.formItem?.label ?? c.title)
}

export function getPopupContainer(triggerNode: HTMLElement | null) {
  return triggerNode?.parentElement ?? document.body
}
