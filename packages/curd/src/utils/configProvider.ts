import type { App, ObjectPlugin } from 'vue'
import type { I18nOptions } from 'vue-i18n'
import type { CurdConfigT } from '../types'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import relativeTime from 'dayjs/plugin/relativeTime'
import weekday from 'dayjs/plugin/weekday'
import { merge } from 'lodash-es'
import { reactive } from 'vue'
import { createI18n } from 'vue-i18n'
import { CURD_CONFIG_KEY, DEFAULT_CONFIG } from '../composables'
import { setGlobalDateFormats } from '../constants'

// app.use(createCurdConfig(config))
export function createCurdConfig(config: Partial<CurdConfigT>, initDayjs = true) {
  if (initDayjs) {
    dayjs.extend(weekday)
    dayjs.extend(localeData)
    dayjs.extend(relativeTime)
  }

  return {
    install(app: App) {
      const mergedConfig = merge({}, DEFAULT_CONFIG, config)

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

/**
 * 创建 Cosy CURD 配置
 * 用于快速创建适合 Cosy 框架的配置
 */
export function createCosyConfig(config: Partial<CurdConfigT> = {}): ObjectPlugin {
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

/**
 * 创建 Cosy Pro CURD 配置
 * 用于快速创建适合 Cosy Pro 框架的配置
 */
export function createCosyProConfig(config: Partial<CurdConfigT> = {}) {
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

/**
 * 兼容旧版本
 */
export function createCosyProCurd(config: Partial<CurdConfigT> = {}): ObjectPlugin {
  return createCosyProConfig(config)
}

/**
 * 合并多个配置对象
 * 用于组合不同的配置预设
 */
export function mergeConfigs(...configs: Partial<CurdConfigT>[]): Partial<CurdConfigT> {
  return configs.reduce((result, config) => merge(result, config), {})
}
