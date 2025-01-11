import type { AxiosRequestConfig } from 'axios'
import { service } from './useAxios'

export const http = {
  get<T = any>(url: string, config: AxiosRequestConfig = {}) {
    return service.get<any, T>(url, config)
  },
  post<T = any>(url: string, data: any = undefined, config: AxiosRequestConfig = {}) {
    return service.post<any, T>(url, data, config)
  },
  put<T = any>(url: string, data: any = undefined, config: AxiosRequestConfig = {}) {
    return service.put<any, T>(url, data, config)
  },
  delete<T = any>(url: string, config: AxiosRequestConfig = {}) {
    return service.delete<any, T>(url, config)
  },
  patch<T = any>(url: string, data: any = undefined, config: AxiosRequestConfig = {}) {
    return service.patch<any, T>(url, data, config)
  },
}
