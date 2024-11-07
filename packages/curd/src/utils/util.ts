import {StdTableColumn} from "../types";

export function isFunction(value: any): value is Function {
  return typeof value === 'function'
}

export function isPlainObject(value: any): value is Object {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function getColumnKey(column: StdTableColumn) {
  if (column.key) {
    return column.key
  }
  if (Array.isArray(column.dataIndex)) {
    return column.dataIndex.join('.')
  }
  return column.dataIndex
}

export function getRealContent(content: string | (() => string)) {
  if(isFunction(content)) {
    return content()
  }
  return content
}