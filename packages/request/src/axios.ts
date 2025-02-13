import type {
  AxiosRequestConfig,
} from 'axios'
import axios from 'axios'
import { config, setRequestConfig } from './config'

function createService() {
  return axios.create(config)
}

export const service = createService()

/**
 * @deprecated use createRequestConfig instead
 */
export function setOverrideConfig(userConfig: AxiosRequestConfig) {
  const c = setRequestConfig(userConfig)
  Object.assign(service.defaults, c)
}

export * from 'axios'
