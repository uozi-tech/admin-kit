import type { I18nOptions } from 'vue-i18n'
import { merge } from 'ant-design-vue/es/theme/util/statistic'
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

export const defaultConfig = {
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

export const CURD_CONFIG_KEY = 'curdConfig'

// app.use(createCurdConfig(config))
export function createCurdConfig(config: Partial<CurdConfigT>): ObjectPlugin {
  return {
    install(app: App) {
      const i18n = createI18n({
        legacy: false,
        locale: config.i18n?.locale || defaultConfig.i18n.locale,
        fallbackLocale: config.i18n?.fallbackLocale || defaultConfig.i18n.fallbackLocale,
        messages: {
          ...defaultConfig.i18n.messages,
          ...config.i18n?.messages,
        },
      })
      app.use(i18n)
      app.provide(CURD_CONFIG_KEY, reactive(
        merge(defaultConfig, config),
      ))
    },
  }
}

// 导出切换语言的函数
export function setLocale(locale: string) {
  const i18n = getCurrentInstance()?.appContext.config.globalProperties.$i18n
  if (i18n) {
    i18n.locale.value = locale
  }
}
