import { AxiosRequestConfig, AxiosResponse } from 'axios'

export type HttpFn = <T, D>(config: AxiosRequestConfig) => Promise<AxiosResponse<T, D>>

export type ApiType = 'getList' | 'getDetail' | 'update' | 'create' | 'delete' | 'restore'

export type PaginationType = {
  total: number
  total_pages: number
  per_page: number
  current_page: number
}

export interface ResponseDataWithPagination<T> {
  data: T[]
  pagination: PaginationType
}
