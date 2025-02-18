import type { I18nOptions } from 'vue-i18n'

/**
 * The pagination map
 * @description The map of the pagination data
 */
export interface PaginationMap {
  total: string // 总数字段
  current: string // 当前页字段
  pageSize: string // 每页条数字段
  totalPages: string // 总页数字段
}

/**
 * The pagination data
 * @description The data of the pagination
 */
export interface PaginationData {
  total: number
  current: number
  pageSize: number
  totalPages: number
}

/**
 * The response data
 * @description The data of the response
 */
export interface ResponseData {
  data: any[]
  pagination: PaginationData
}

/**
 * The response format function
 * @description The function is used to format the response data
 */
export interface ResponseFormatFn {
  (response: any): ResponseData
}

/**
 * The request format function
 * @description The function is used to format the request parameters
 */
export interface RequestFormatFn {
  (params: Record<string, any>): Record<string, any>
}

/**
 * The i18n language
 * @description The Languages built-in in the curd
 */
export type I18nLanguage = 'zh-CN' | 'zh-HK' | 'zh-TW' | 'en-US'

/**
 * The i18n token
 * @description The token used in the curd i18n
 */
export type I18nToken =
  | 'total'
  | 'list'
  | 'item(s)'
  | 'view'
  | 'edit'
  | 'delete'
  | 'restore'
  | 'deletePermanently'
  | 'reset'
  | 'close'
  | 'ok'
  | 'selectorTitle'
  | 'generate'
  | 'save'
  | 'add'
  | 'trash'
  | 'backToList'
  | 'exportExcel'
  | 'formValidateError'
  | 'deleteConfirm'
  | 'restoreConfirm'
  | 'deletePermanentlyConfirm'
  | 'savedSuccessfully'
  | 'deletedSuccessfully'
  | 'restoredSuccessfully'
  | 'selectAll'

export type I18nLanguageObject = Partial<Record<I18nToken, string>>

// app.use(curdConfigProvider)
export interface CurdConfigT {
  listApi?: {
    /**
     * The path to the pagination data in the response
     * @default '$.pagination'
     * @description `$.` is the root of the response data
     * @example
     * ```json
     * {
     *  paginationPath: '$.pagination',
     * }
     * ```
     */
    paginationPath: string

    /**
     * The mapping of the pagination data in the response
     * @default {
     *  total: 'total',
     *  current: 'current',
     *  pageSize: 'pageSize',
     *  totalPages: 'totalPages',
     * }
     */
    paginationMap: PaginationMap

    /**
     * The response format function
     * @description The function is used to format the response data
     * @example
     * ```ts
     * const responseFormat = (response: any) => {
     *  return {
     *    data: response.data,
     *    pagination: response.pagination,
     *  }
     * }
     */
    responseFormat?: ResponseFormatFn

    /**
     * The request format function
     * @description The function is used to format the request parameters
     * @example
     * ```ts
     * const requestFormat = (params: Record<string, any>) => {
     *  return {
     *    ...params,
     *  }
     * }
     */
    requestFormat?: RequestFormatFn
  }

  /**
   * The i18n options
   * @description The options for the i18n same as the vue-i18n options
   * @example
   * ```ts
   * const i18nOptions = {
   *  locale: 'zh-CN',
   *  fallbackLocale: 'en-US',
   *  messages: {
   *    'zh-CN': {
   *      ...I18nLanguageObject,
   *    },
   *    'zh-HK': {
   *      ...I18nLanguageObject,
   *    },
   *    'zh-TW': {
   *      ...I18nLanguageObject,
   *    },
   *  },
   * }
   */
  i18n?: I18nOptions<{
    message: I18nLanguageObject
  }>
}
