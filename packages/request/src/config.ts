import type { AxiosRequestConfig, Method } from 'axios'
import { merge } from 'lodash-es'

export type RequestConfig = AxiosRequestConfig & {
  curd?: {
    /** 是否在同一路径上自动取消前一个 GET 请求，默认 true */
    autoCancelPrevious?: boolean
    methods?: {
      getList?: Method
      getItem?: Method
      createItem?: Method
      updateItem?: Method
      deleteItem?: Method
      restoreItem?: Method
    }
  }
}

/**
 * @private
 * @description internal config
 */
export const config: RequestConfig = {
  curd: {
    methods: {
      getList: 'get',
      getItem: 'get',
      createItem: 'post',
      updateItem: 'put',
      deleteItem: 'delete',
      restoreItem: 'post',
    },
  },
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
}

/**
 * @description set request and curd api config
 */
export function setRequestConfig(userConfig: RequestConfig) {
  Object.assign(config, merge(config, userConfig))
  return config
}
