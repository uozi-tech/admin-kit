import type { AxiosRequestConfig } from 'axios'
import type { RequestConfig } from './config'
import { service } from './axios'

// `T` is whatever the response interceptor registered via useAxios resolves
// with (usually the response body). axios >= 1.19 types the call result as a
// conditional type keyed on an internal `unique symbol`, which cannot be
// emitted in declarations, so pin the return type to `Promise<T>` here.
function request<T>(url: string, config: AxiosRequestConfig): Promise<T> {
  return service<any, T>(url, config) as Promise<T>
}

export const http = {
  get<T = any>(url: string, config: RequestConfig = {}) {
    return request<T>(url, { method: 'get', ...config })
  },
  post<T = any>(url: string, data: any = undefined, config: AxiosRequestConfig = {}) {
    return request<T>(url, {
      method: config.method || 'post',
      data,
      ...config,
    })
  },
  put<T = any>(url: string, data: any = undefined, config: AxiosRequestConfig = {}) {
    return request<T>(url, {
      method: config.method || 'put',
      data,
      ...config,
    })
  },
  delete<T = any>(url: string, config: AxiosRequestConfig = {}) {
    return request<T>(url, {
      method: config.method || 'delete',
      ...config,
    })
  },
  patch<T = any>(url: string, data: any = undefined, config: AxiosRequestConfig = {}) {
    return request<T>(url, {
      method: config.method || 'patch',
      data,
      ...config,
    })
  },
}
