export function isFunction(value: any): value is Function {
  return typeof value === 'function'
}

export function isPlainObject(value: any): value is Object {
  return Object.prototype.toString.call(value) === '[object Object]'
}