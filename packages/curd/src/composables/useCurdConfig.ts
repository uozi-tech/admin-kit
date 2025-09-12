import type { CurdConfigT } from '../types'
import { inject } from 'vue'
import { DEFAULT_DATE_FORMAT, DEFAULT_DATE_TIME_FORMAT, DEFAULT_MONTH_FORMAT, DEFAULT_TIME_FORMAT, DEFAULT_WEEK_FORMAT, DEFAULT_YEAR_FORMAT } from '../constants/format'
import { enUS, zhCN, zhHK, zhTW } from '../locales'

export const DEFAULT_CONFIG: Required<CurdConfigT> = {
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
  modal: {
    width: 600,
  },
}

export const CURD_CONFIG_KEY = Symbol('curdConfig')

export function useCurdConfig() {
  return inject<Required<CurdConfigT>>(CURD_CONFIG_KEY, DEFAULT_CONFIG as Required<CurdConfigT>)
}

/**
 * 用于在 ConfigProvider 内部安全地获取父级配置
 * 如果没有父级配置则返回默认配置
 */
export function useParentCurdConfig() {
  try {
    return inject<Required<CurdConfigT>>(CURD_CONFIG_KEY, DEFAULT_CONFIG as Required<CurdConfigT>)
  }
  catch {
    return DEFAULT_CONFIG as Required<CurdConfigT>
  }
}

export default useCurdConfig
