export interface CurdApi<T = any, P = any> {
  getList: (params?: Record<string, any>, config?: Record<string, any>) => Promise<{ data: T[], pagination: P }>
  getItem: (id: string | number, params?: Record<string, any>, config?: Record<string, any>) => Promise<T>
  createItem: (data: Record<string, any>, config?: Record<string, any>) => Promise<T>
  updateItem: (id: string | number, data: Record<string, any>, config?: Record<string, any>) => Promise<T>
  deleteItem: (id: string | number, params?: Record<string, any>, config?: Record<string, any>) => Promise<any>
  restoreItem: (id: string | number, params?: Record<string, any>, config?: Record<string, any>) => Promise<any>
  batchSave: (ids: (number | string)[], data: Record<string, any>, config?: Record<string, any>) => Promise<any>
}
