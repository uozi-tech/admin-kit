import type { I18nOptions } from 'vue-i18n'
import { merge } from 'lodash-es'
import { type App, type ObjectPlugin, reactive } from 'vue'
import { createI18n } from 'vue-i18n'
import { enUS, zhCN, zhHK, zhTW } from './locales'

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
  i18n?: I18nOptions
}

export const defaultConfig: Required<CurdConfigT> = {
  listApi: {
    paginationMap: {
      total: 'total',
      current: 'current',
      pageSize: 'pageSize',
      totalPages: 'totalPages',
    },
  },
  i18n: {
    locale: 'zh-CN',
    fallbackLocale: 'en-US',
    messages: {
      'zh-CN': zhCN,
      'zh-HK': zhHK,
      'zh-TW': zhTW,
      'en-US': enUS,
    },
  },
}

export const CURD_CONFIG_KEY = Symbol('curdConfig')

// app.use(createCurdConfig(config))
export function createCurdConfig(config: Partial<CurdConfigT>): ObjectPlugin {
  return {
    install(app: App) {
      const mergedConfig = merge({}, defaultConfig, config)
      const i18n = createI18n(mergedConfig.i18n as I18nOptions)
      app.use(i18n)
      app.provide(CURD_CONFIG_KEY, reactive(mergedConfig))
    },
  }
}
