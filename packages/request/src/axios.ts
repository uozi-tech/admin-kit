import type {
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios'
import axios from 'axios'

const axiosConfig: AxiosRequestConfig = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
}

function createService() {
  return axios.create(axiosConfig)
}

export const service = createService()

export function setOverrideConfig(config: AxiosRequestConfig) {
  Object.assign(axiosConfig, config)
  Object.assign(service.defaults, config)
}

export function createRequestInstance(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    return service(config)
  }
}

export * from 'axios'
