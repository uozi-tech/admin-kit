import { get } from 'lodash-es'
import { http } from './http'

type PaginationKeyT = 'total' | 'current' | 'pageSize' | 'totalPage'
type PaginationKeyMapT = {
  [key in PaginationKeyT]?: string
}

const globalPaginationKeyMap: PaginationKeyMapT = {
  total: 'total',
  current: 'current_page',
  pageSize: 'per_page',
  totalPage: 'total_page',
}

interface UseCurdOptions {
  paginationKeyMap?: PaginationKeyMapT
}

export type PaginationT = Record<keyof PaginationKeyT, number | string>

export interface CurdApi<T> {
  getList: (params?: Record<string, any>) => Promise<{ data: T[], pagination: PaginationT }>
  getItem: (id: string | number, params?: Record<string, any>) => Promise<T>
  createItem: (data: Record<string, any>) => Promise<T>
  updateItem: (id: string | number, data: Record<string, any>) => Promise<T>
  deleteItem: (id: string | number, params?: Record<string, any>) => Promise<any>
  restoreItem: (id: string | number, params?: Record<string, any>) => Promise<any>
}

export function useCurdApi<T>(url: string, options: UseCurdOptions = { paginationKeyMap: globalPaginationKeyMap }): CurdApi<T> {
  const paginationKeyMap = options?.paginationKeyMap || globalPaginationKeyMap
  const getList = async (params?: Record<string, any>) => {
    try {
      const res = await http.get<{
        data: T[]
        pagination: Record<string, number | string>
      }>(url, { params })
      const pagination = {} as PaginationT
      for (const key in paginationKeyMap) {
        if (paginationKeyMap[key])
          pagination[key] = get(res?.data, paginationKeyMap[key])
      }

      return Promise.resolve({ data: res.data, pagination })
    }
    catch (err) {
      return Promise.reject(err)
    }
  }

  const getItem = async (id: string | number, params?: Record<string, any>) => {
    try {
      const res = await http.get<T>(`${url}/${id}`, { params })
      return Promise.resolve(res)
    }
    catch (err) {
      return Promise.reject(err)
    }
  }

  const createItem = async (data: Record<string, any>) => {
    try {
      const res = await http.post<T>(url, data)
      return Promise.resolve(res)
    }
    catch (err) {
      return Promise.reject(err)
    }
  }

  const updateItem = async (id: string | number, data: Record<string, any>) => {
    try {
      const res = await http.patch<T>(`${url}/${id}`, data)
      return Promise.resolve(res)
    }
    catch (err) {
      return Promise.reject(err)
    }
  }

  const deleteItem = async (id: string | number, params?: Record<string, any>) => {
    try {
      const res = await http.delete(`${url}/${id}`, { params })
      return Promise.resolve(res)
    }
    catch (err) {
      return Promise.reject(err)
    }
  }

  const restoreItem = async (id: string | number, params?: Record<string, any>) => {
    try {
      const res = await http.patch<T>(`${url}/${id}`, {}, { params })
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
  }
}

export function extendCurdApi<T>(
  baseCurd: CurdApi<T>,
  newApis: Record<string, (...args: any[]) => Promise<any>>,
) {
  return Object.assign(baseCurd, newApis)
}
