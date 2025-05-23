import type { AxiosRequestConfig } from 'axios'
import { http } from './http'

export interface BaseCurdApi<T = any, P = any> {
  getList: (params?: Record<string, any>, config?: AxiosRequestConfig) => Promise<{ data: T[], pagination: P }>
  getItem: (id: string | number, params?: Record<string, any>, config?: AxiosRequestConfig) => Promise<T>
  createItem: (data: Record<string, any>, config?: AxiosRequestConfig) => Promise<T>
  updateItem: (id: string | number, data: Record<string, any>, config?: AxiosRequestConfig) => Promise<T>
  deleteItem: (id: string | number, params?: Record<string, any>, config?: AxiosRequestConfig) => Promise<any>
  restoreItem: (id: string | number, params?: Record<string, any>, config?: AxiosRequestConfig) => Promise<any>
  batchSave: (ids: (number | string)[], data: Record<string, any>, config?: AxiosRequestConfig) => Promise<any>
  getUrl: () => string
}

export type CurdApi<
  T = any,
  P = any,
> = BaseCurdApi<T, P>

export function useCurdApi<
  T = any,
  P = any,
  M = object,
>(url: string | (() => string), moreApis = {} as M) {
  const getUrl = () => {
    if (typeof url === 'function') {
      return url()
    }
    return url
  }

  const getList = async (params?: Record<string, any>, config?: AxiosRequestConfig) => {
    try {
      const res = await http.get<{
        data: T[]
        pagination: P
      }>(getUrl(), { params, ...config })

      return Promise.resolve(res)
    }
    catch (err) {
      return Promise.reject(err)
    }
  }

  const getItem = async (id: string | number, params?: Record<string, any>, config?: AxiosRequestConfig) => {
    try {
      const res = await http.get<T>(`${getUrl()}/${id}`, { params, ...config })
      return Promise.resolve(res)
    }
    catch (err) {
      return Promise.reject(err)
    }
  }

  const createItem = async (data: Record<string, any>, config?: AxiosRequestConfig) => {
    try {
      const res = await http.post<T>(getUrl(), data, config)
      return Promise.resolve(res)
    }
    catch (err) {
      return Promise.reject(err)
    }
  }

  const updateItem = async (id: string | number, data: Record<string, any>, config?: AxiosRequestConfig) => {
    try {
      const res = await http.post<T>(`${getUrl()}/${id}`, data, config)
      return Promise.resolve(res)
    }
    catch (err) {
      return Promise.reject(err)
    }
  }

  const deleteItem = async (id: string | number, params?: Record<string, any>, config?: AxiosRequestConfig) => {
    try {
      const res = await http.delete(`${getUrl()}/${id}`, { params, ...config })
      return Promise.resolve(res)
    }
    catch (err) {
      return Promise.reject(err)
    }
  }

  const restoreItem = async (id: string | number, params?: Record<string, any>, config?: AxiosRequestConfig) => {
    try {
      const res = await http.patch<T>(`${getUrl()}/${id}`, {}, { params, ...config })
      return Promise.resolve(res)
    }
    catch (err) {
      return Promise.reject(err)
    }
  }

  const batchSave = async (ids: (number | string)[], data: Record<string, any>, config?: AxiosRequestConfig) => {
    try {
      const res = await http.put<any>(getUrl(), { ids, data }, config)
      return Promise.resolve(res)
    }
    catch (err) {
      return Promise.reject(err)
    }
  }

  return {
    getList,
    getItem,
    createItem,
    updateItem,
    deleteItem,
    restoreItem,
    batchSave,
    getUrl,
    ...moreApis,
  }
}

export function extendCurdApi<
  T,
  M extends object = object,
>(baseCurd: CurdApi<T, any>, newApis: M) {
  return Object.assign(baseCurd, newApis)
}
