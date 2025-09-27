import type { AxiosRequestConfig } from 'axios'
import type { RequestConfig } from './config'
import { service } from './axios'

// 仅用于 GET：同一路径仅保留最新请求（无 signal 时自动注入 AbortController）
const inflightGetControllers = new Map<string, AbortController>()

export const http = {
  get<T = any>(url: string, config: RequestConfig = {}) {
    const key = url
    let ctrl: AbortController | undefined

    if (!config.signal && config?.curd?.autoCancelPrevious !== false) {
      inflightGetControllers.get(key)?.abort()
      ctrl = new AbortController()
      inflightGetControllers.set(key, ctrl)
      config = { ...config, signal: ctrl.signal }
    }

    return service<any, T>(url, { method: 'get', ...config }).finally(() => {
      if (ctrl && inflightGetControllers.get(key) === ctrl)
        inflightGetControllers.delete(key)
    })
  },
  post<T = any>(url: string, data: any = undefined, config: AxiosRequestConfig = {}) {
    return service<any, T>(url, {
      method: config.method || 'post',
      data,
      ...config,
    })
  },
  put<T = any>(url: string, data: any = undefined, config: AxiosRequestConfig = {}) {
    return service<any, T>(url, {
      method: config.method || 'put',
      data,
      ...config,
    })
  },
  delete<T = any>(url: string, config: AxiosRequestConfig = {}) {
    return service<any, T>(url, {
      method: config.method || 'delete',
      ...config,
    })
  },
  patch<T = any>(url: string, data: any = undefined, config: AxiosRequestConfig = {}) {
    return service<any, T>(url, {
      method: config.method || 'patch',
      data,
      ...config,
    })
  },
}
