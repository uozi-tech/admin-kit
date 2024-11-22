import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { get, merge } from 'lodash-es'

function createService() {
  const service = axios.create()

  service.interceptors.request.use(
    config => config,
    error => Promise.reject(error),
  )

  service.interceptors.response.use(
    response => {
      return response
    },
    error => {
      const status = get(error, 'response.status')
      switch (status) {
        case 400:
          error.message = 'Bad request'
          break
        case 401:
          error.message = 'Unauthorized'
          break
        case 403:
          error.message = 'Forbidden'
          break
        case 404:
          error.message = 'Not found'
          break
        case 408:
          error.message = 'Request timeout'
          break
        case 500:
          error.message = 'Server error'
          break
        case 501:
          error.message = 'Server understandable'
          break
        case 502:
          error.message = 'Bad gateway'
          break
        case 503:
          error.message = 'Server unavailable'
          break
        case 504:
          error.message = 'Gateway timeout'
          break
        case 505:
          error.message = 'HTTP version not supported'
          break
        default:
          error.message = status
          break
      }
      return Promise.reject(error)
    },
  )
  return service
}

export function createRequestInstance(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const defaultConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
      baseURL: '/api',
      data: {},
    }
    const mergeConfig = merge(defaultConfig, config)
    return service(mergeConfig)
  }
}

export const service = createService()
