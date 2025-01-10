import type { AxiosInterceptorOptions, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { HttpFn } from './types'
import { get } from 'lodash-es'
import { createRequestInstance, service } from './axios'

type PaginationKey = 'total' | 'current_page' | 'per_page' | 'total_page'
type PaginationMap = {
  [key in PaginationKey]?: string | (string | number)[]
}
let paginationMap: PaginationMap = {}

export class Curd<D> {
  private readonly url: string
  private readonly http: HttpFn

  constructor(
    url: string,
    config?: {
      http?: HttpFn
    },
  ) {
    this.url = url
    this.http = config?.http ?? createRequestInstance(service)
  }

  async getList(params?: Record<string, any>) {
    try {
      const res = await this.http({ url: this.url, method: 'GET', params })
      const pagination: { pageSize?: number, current?: number, total?: number, totalPage?: number } = {}
      for (const key in paginationMap) {
        if (paginationMap[key as PaginationKey])
          pagination[key as PaginationKey] = get(res?.data, paginationMap[key as PaginationKey] ?? `pagination.${key}`)
      }

      return Promise.resolve({ data: res.data as D[], pagination })
    }
    catch (err) {
      return Promise.reject(err)
    }
  }

  async getDetail(id: string | number, params?: Record<string, any>) {
    try {
      const res = await this.http({ url: `${this.url}/${id}`, method: 'GET', params })
      return Promise.resolve(res as D)
    }
    catch (err) {
      return Promise.reject(err)
    }
  }

  async update(id: string | number, data: Record<string, any>) {
    try {
      const res = await this.http({ url: `${this.url}/${id}`, method: 'POST', data })
      return Promise.resolve(res as D)
    }
    catch (err) {
      return Promise.reject(err)
    }
  }

  async create(data: Record<string, any>) {
    try {
      const res = await this.http({ url: this.url, method: 'POST', data })
      return Promise.resolve(res as D)
    }
    catch (err) {
      return Promise.reject(err)
    }
  }

  async delete(id: string | number, params?: Record<string, any>) {
    try {
      const res = await this.http({ url: `${this.url}/${id}`, method: 'DELETE', params })
      return Promise.resolve(res as D)
    }
    catch (err) {
      return Promise.reject(err)
    }
  }

  async restore(id: string | number, params?: Record<string, any>) {
    try {
      const res = await this.http({ url: `${this.url}/${id}`, method: 'PATCH', params })
      return Promise.resolve(res as D)
    }
    catch (err) {
      return Promise.reject(err)
    }
  }

  static setPaginationFieldsMap(map: PaginationMap) {
    paginationMap = map
  }

  static setRequestInterceptor(
    onFulfilled?: (value: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>,
    onRejected?: (error: any) => any,
    options?: AxiosInterceptorOptions,
  ) {
    service.interceptors.request.use(onFulfilled, onRejected, options)
  }

  static setResponseInterceptor(
    onFulfilled?: (value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>,
    onRejected?: (error: any) => any,
    options?: AxiosInterceptorOptions,
  ) {
    service.interceptors.response.use(onFulfilled, onRejected, options)
  }
}
