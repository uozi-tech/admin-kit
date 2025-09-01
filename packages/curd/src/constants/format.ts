export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'
export const DEFAULT_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const DEFAULT_TIME_FORMAT = 'HH:mm:ss'
export const DEFAULT_YEAR_FORMAT = 'YYYY'
export const DEFAULT_MONTH_FORMAT = 'YYYY-MM'
export const DEFAULT_WEEK_FORMAT = 'YYYY-wo'

// 保持向后兼容性
export const DATE_FORMAT = DEFAULT_DATE_FORMAT
export const DATE_TIME_FORMAT = DEFAULT_DATE_TIME_FORMAT
export const TIME_FORMAT = DEFAULT_TIME_FORMAT
export const YEAR_FORMAT = DEFAULT_YEAR_FORMAT
export const MONTH_FORMAT = DEFAULT_MONTH_FORMAT
export const WEEK_FORMAT = DEFAULT_WEEK_FORMAT

// 全局日期格式配置
let globalDateFormats = {
  date: DEFAULT_DATE_FORMAT,
  datetime: DEFAULT_DATE_TIME_FORMAT,
  time: DEFAULT_TIME_FORMAT,
  year: DEFAULT_YEAR_FORMAT,
  month: DEFAULT_MONTH_FORMAT,
  week: DEFAULT_WEEK_FORMAT,
}

// 更新全局日期格式
export function setGlobalDateFormats(formats: Partial<typeof globalDateFormats>) {
  globalDateFormats = { ...globalDateFormats, ...formats }
}

// 获取全局日期格式
export function getGlobalDateFormats() {
  return { ...globalDateFormats }
}

// 获取特定类型的日期格式
export function getDateFormat(type: keyof typeof globalDateFormats) {
  return globalDateFormats[type]
}

// 动态Format对象，会使用全局配置
export const Format = new Proxy({} as Record<string, string>, {
  get(_target, prop) {
    return globalDateFormats[prop as keyof typeof globalDateFormats]
  }
})
