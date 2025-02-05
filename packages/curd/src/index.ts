import { merge } from 'ant-design-vue/es/theme/util/statistic'
import { type ObjectPlugin, reactive } from 'vue'

export * from './components'
export * from './composables'
export * from './constants'
export * from './renderers'
export * from './types'

// app.use(curdConfigProvider)
export interface CurdConfigT {
  api: {
    paginationMap: {
      total: string
      current: string
      pageSize: string
      totalPage: string
    }
  }
}

export const defaultConfig = {
  api: {
    paginationMap: {
      total: 'total',
      current: 'current',
      pageSize: 'pageSize',
      totalPage: 'totalPage',
    },
  },
}

export const CURD_CONFIG_KEY = 'curdConfig'
export const curdConfigProvider: ObjectPlugin = {
  install(app, ...options: Partial<CurdConfigT>[]) {
    app.provide(CURD_CONFIG_KEY, reactive(
      merge(defaultConfig, ...options),
    ))
  },
}
