import type { AxiosInterceptorOptions, InternalAxiosRequestConfig } from 'axios'
import { createService, overrideConfig } from './axios'

const service = createService()

// 记录已注册的拦截器
const registeredRequestInterceptors = new Set<string>()
const registeredResponseInterceptors = new Set<string>()

export function useAxios() {
  Object.assign(service.defaults, overrideConfig)

  return {
    service,
    setRequestInterceptor(
      onFulfilled: (value: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>,
      onRejected?: (error: any) => any | null,
      options?: AxiosInterceptorOptions,
    ) {
      const id = onFulfilled.toString() + onRejected?.toString() + JSON.stringify(options)
      if (registeredRequestInterceptors.has(id))
        return

      service.interceptors.request.use(onFulfilled, onRejected, options)
      registeredRequestInterceptors.add(id)
    },
    setResponseInterceptor(
      onFulfilled: (value: any) => any | Promise<any>,
      onRejected?: (error: any) => any | null,
      options?: AxiosInterceptorOptions,
    ) {
      const id = onFulfilled.toString() + onRejected?.toString() + JSON.stringify(options)
      if (registeredResponseInterceptors.has(id))
        return

      service.interceptors.response.use(onFulfilled, onRejected, options)
      registeredResponseInterceptors.add(id)
    },
  }
}
