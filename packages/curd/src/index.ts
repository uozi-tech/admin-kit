import type { I18nOptions } from 'vue-i18n'
import type { CurdConfigT } from './types'
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

export const defaultConfig: Required<CurdConfigT> = {
  listApi: {
    paginationPath: '$.pagination',
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
  time: {
    timestamp: false,
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
