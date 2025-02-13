import type { AxiosRequestConfig } from 'axios'
import { service } from './axios'

export const http = {
  get<T = any>(url: string, config: AxiosRequestConfig = {}) {
    return service<any, T>(url, {
      method: config.method || 'get',
      ...config,
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
