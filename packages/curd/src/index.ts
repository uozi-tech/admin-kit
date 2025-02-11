import { merge } from 'ant-design-vue/es/theme/util/statistic'
import { type App, type ObjectPlugin, reactive } from 'vue'

export * from './components'
export * from './composables'
export * from './constants'
export * from './renderers'
export * from './types'
export * from './utils'

export interface PaginationMap {
  total: string // 总数字段
  current: string // 当前页字段
  pageSize: string // 每页条数字段
  totalPages: string // 总页数字段
}

export interface ResponseFormatFn {
  (response: any): {
    data: any[] // 列表数据
    pagination: { // 分页信息
      total: number
      current: number
      pageSize: number
      totalPages: number
    }
  }
}

export interface RequestFormatFn {
  (params: Record<string, any>): Record<string, any>
}

// app.use(curdConfigProvider)
export interface CurdConfigT {
  listApi?: {
    paginationMap: PaginationMap

    responseFormat?: ResponseFormatFn
    requestFormat?: RequestFormatFn
  }
}

export const defaultConfig = {
  listApi: {
    paginationMap: {
      total: 'total',
      current: 'current',
      pageSize: 'pageSize',
      totalPages: 'totalPages',
    },
  },
}

export const CURD_CONFIG_KEY = 'curdConfig'

// app.use(createCurdConfig(config))
export function createCurdConfig(config: Partial<CurdConfigT>): ObjectPlugin {
  return {
    install(app: App) {
      app.provide(CURD_CONFIG_KEY, reactive(
        merge(defaultConfig, config),
      ))
    },
  }
}
