import axios, {
  type AxiosInstance,
  AxiosInterceptorOptions,
  type AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios'
import { merge } from 'lodash-es'

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
    const mergeConfig = merge(defaultConfig, config)
    return service(mergeConfig)
  }
}

export const service = createService()

export const useAxios = () => {
  return {
    service,
    setRequestInterceptor(
      onFulfilled: (value: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>,
      onRejected?: (error: any) => any | null,
      options?: AxiosInterceptorOptions,
    ) {
      service.interceptors.request.use(onFulfilled, onRejected, options)
    },
    setResponseInterceptor(
      onFulfilled: (value: any) => any | Promise<any>,
      onRejected?: (error: any) => any | null,
      options?: AxiosInterceptorOptions,
    ) {
      service.interceptors.response.use(onFulfilled, onRejected, options)
    },
  }
}
