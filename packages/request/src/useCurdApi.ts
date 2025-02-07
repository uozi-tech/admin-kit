import { http } from './http'

export type CurdApi<T = any, P = any> = {
  getList: (params?: Record<string, any>) => Promise<{ data: T[], pagination: P }>
  getItem: (id: string | number, params?: Record<string, any>) => Promise<T>
  createItem: (data: Record<string, any>) => Promise<T>
  updateItem: (id: string | number, data: Record<string, any>) => Promise<T>
  deleteItem: (id: string | number, params?: Record<string, any>) => Promise<any>
  restoreItem: (id: string | number, params?: Record<string, any>) => Promise<any>
} & MoreApis

export interface MoreApis {
  [key: string]: (...args: any[]) => Promise<any>
}

export function useCurdApi<T = any, P = any>(url: string, moreApis?: MoreApis): CurdApi<T, P> {
  const getList = async (params?: Record<string, any>) => {
    try {
      const res = await http.get<{
        data: T[]
        pagination: P
      }>(url, { params })

      return Promise.resolve(res)
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
      const res = await http.post<T>(`${url}/${id}`, data)
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
    ...moreApis,
  }
}

export function extendCurdApi<T>(
  baseCurd: CurdApi<T>,
  newApis: MoreApis,
) {
  return Object.assign(baseCurd, newApis)
}
