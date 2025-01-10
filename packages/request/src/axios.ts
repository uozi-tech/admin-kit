import type {
  AxiosInstance,
  AxiosInterceptorOptions,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'

const defaultConfig: AxiosRequestConfig = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
}

function createService() {
  return axios.create(defaultConfig)
}

export function createRequestInstance(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    return service(config)
  }
}

export const service = createService()

// 记录已注册的拦截器
const registeredRequestInterceptors = new Set<string>()
const registeredResponseInterceptors = new Set<string>()

export function useAxios() {
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

export * from 'axios'
