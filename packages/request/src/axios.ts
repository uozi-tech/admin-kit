import type {
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios'
import axios from 'axios'

const defaultConfig: AxiosRequestConfig = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
}

export function createService() {
  return axios.create(defaultConfig)
}

export function createRequestInstance(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    return service(config)
  }
}

export * from 'axios'
