import type { App, ObjectPlugin } from 'vue'
import type { I18nOptions } from 'vue-i18n'
import type { CurdConfigT } from './types'
import { merge } from 'lodash-es'
import { reactive } from 'vue'
import { createI18n } from 'vue-i18n'
import { DEFAULT_DATE_FORMAT, DEFAULT_DATE_TIME_FORMAT, DEFAULT_MONTH_FORMAT, DEFAULT_TIME_FORMAT, DEFAULT_WEEK_FORMAT, DEFAULT_YEAR_FORMAT, setGlobalDateFormats } from './constants/format'
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
      params: {
        current: 'current',
        pageSize: 'pageSize',
      },
      response: {
        current: 'current',
        pageSize: 'pageSize',
        total: 'total',
        totalPages: 'totalPages',
      },
    },
  },
  i18n: {
    legacy: false,
    locale: 'zh-CN',
    fallbackLocale: 'en-US',
    messages: {
      'zh-CN': zhCN,
      'zh-HK': zhHK,
      'zh-TW': zhTW,
      'en-US': enUS,
    },
  },
  dateFormat: {
    date: DEFAULT_DATE_FORMAT,
    datetime: DEFAULT_DATE_TIME_FORMAT,
    time: DEFAULT_TIME_FORMAT,
    year: DEFAULT_YEAR_FORMAT,
    month: DEFAULT_MONTH_FORMAT,
    week: DEFAULT_WEEK_FORMAT,
  },
  time: {
    timestamp: false,
  },
  selector: {
    omitZeroString: true,
  },
  search: {
    showSearchBtn: false,
    hideResetBtn: true,
  },
  deleteConfirmConfig: {
    mode: 'popconfirm',
    valueKey: 'id',
  },
}

export const CURD_CONFIG_KEY = Symbol('curdConfig')

// app.use(createCurdConfig(config))
export function createCurdConfig(config: Partial<CurdConfigT>): ObjectPlugin {
  return {
    install(app: App) {
      const mergedConfig = merge({}, defaultConfig, config)

      // 应用全局日期格式配置
      if (mergedConfig.dateFormat) {
        setGlobalDateFormats(mergedConfig.dateFormat)
      }

      const i18n = createI18n(mergedConfig.i18n as I18nOptions)
      app.use(i18n)
      app.provide(CURD_CONFIG_KEY, reactive(mergedConfig))
    },
  }
}

// app.use(createCosyCurd(config))
export function createCosyCurd(config: Partial<CurdConfigT> = {}): ObjectPlugin {
  return createCurdConfig({
    listApi: {
      paginationMap: {
        params: {
          current: 'page',
          pageSize: 'page_size',
        },
        response: {
          total: 'total',
          current: 'current_page',
          pageSize: 'per_page',
          totalPages: 'total_pages',
        },
      },
    },
    ...config,
  })
}

// app.use(createCosyProCurd(config))
export function createCosyProCurd(config: Partial<CurdConfigT> = {}): ObjectPlugin {
  return createCurdConfig({
    listApi: {
      paginationMap: {
        params: {
          current: 'page',
          pageSize: 'page_size',
        },
        response: {
          total: 'total',
          current: 'current_page',
          pageSize: 'per_page',
          totalPages: 'total_pages',
        },
      },
    },
    time: {
      timestamp: true,
    },
    selector: {
      omitZeroString: true,
    },
    ...config,
  })
}
