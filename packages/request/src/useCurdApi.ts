import { http } from './http'

export type ApiMethod<TParams = any, TResponse = any> = (
  ...args: TParams[]
) => Promise<TResponse>

export type MoreApis = Record<string, ApiMethod>

export interface BaseCurdApi<T = any, P = any> {
  getList: (params?: Record<string, any>) => Promise<{ data: T[], pagination: P }>
  getItem: (id: string | number, params?: Record<string, any>) => Promise<T>
  createItem: (data: Record<string, any>) => Promise<T>
  updateItem: (id: string | number, data: Record<string, any>) => Promise<T>
  deleteItem: (id: string | number, params?: Record<string, any>) => Promise<any>
  restoreItem: (id: string | number, params?: Record<string, any>) => Promise<any>
}

export type CurdApi<
  T = any,
  P = any,
  M extends MoreApis = MoreApis,
> = BaseCurdApi<T, P> & M

export function useCurdApi<
  T = any,
  P = any,
  M extends MoreApis = MoreApis,
>(url: string, moreApis?: M): CurdApi<T, P, M> {
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
  } as CurdApi<T, P, M>
}

export function extendCurdApi<
  T,
  M extends MoreApis,
  N extends MoreApis,
>(baseCurd: CurdApi<T, any, M>, newApis: N): CurdApi<T, any, M & N> {
  return Object.assign(baseCurd, newApis)
}
