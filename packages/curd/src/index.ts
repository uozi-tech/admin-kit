import { merge } from 'ant-design-vue/es/theme/util/statistic'
import { type App, type ObjectPlugin, reactive } from 'vue'

export * from './components'
export * from './composables'
export * from './constants'
export * from './renderers'
export * from './types'

// app.use(curdConfigProvider)
export interface CurdConfigT {
  listApi?: {
    paginationMap: {
      total: string
      current: string
      pageSize: string
      totalPages: string
    }

    responseFormat?: (response: any) => {
      data: any[]
      pagination: {
        total: number
        current: number
        pageSize: number
        totalPages: number
      }
    }
    requestFormat?: (params: Record<string, any>) => Record<string, any>
  }
}

export const defaultConfig = {
  listApi: {
    paginationMap: {
      total: 'total',
      current: 'current_page',
      pageSize: 'per_page',
      totalPages: 'total_pages',
    },
  },
}

export const CURD_CONFIG_KEY = 'curdConfig'

// app.use(createCurdConfig(config))
export function createCurdConfig(config: Partial<CurdConfigT>): ObjectPlugin {
  return {
    install(app: App) {
      app.provide(CURD_CONFIG_KEY, reactive(
        config,
      ))
    },
  }
}
