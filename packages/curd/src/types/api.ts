export interface CurdApi {
  getList: (params?: Record<string, any>) => Promise<any>
  getItem: (id: string | number, params?: Record<string, any>) => Promise<any>
  createItem: (data: Record<string, any>) => Promise<any>
  updateItem: (id: string | number, data: Record<string, any>) => Promise<any>
  deleteItem: (id: string | number, params?: Record<string, any>) => Promise<any>
  restoreItem: (id: string | number, params?: Record<string, any>) => Promise<any>
  [key: string]: (...args: any[]) => Promise<any>
}
