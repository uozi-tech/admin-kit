import type {
  TableProps,
} from 'ant-design-vue'

import type { StdTableColumn } from './index'

export interface StdTableProps extends Pick<
  StdCurdProps,
  'tableProps' |
  'columns' |
  'api' |
  'disableEdit' |
  'disableSearch' |
  'disableDelete' |
  'customQueryParams' |
  'overwriteParams' |
  'disableRouterQuery' |
  'tableProps' |
  'rowSelectionType' |
  'disableTrash'
> {
  refreshConfig?: {
    // 刷新时间戳
    timestamp: number
    // 是否重置查询参数
    reset?: boolean
  }
  onlyQuery?: boolean
  isTrash?: boolean
}

export interface CustomRenderArgs<T = any, U = any> {
  column: StdTableColumn
  record: T
  text: U
  value?: any
  index?: number
  renderIndex?: number
  export?: boolean
}

export interface StdCurdProps {
  columns: StdTableColumn[]
  rowKey?: string
  rowSelectionType?: 'checkbox' | 'radio'
  scrollX?: number | string
  scrollY?: number | string
  title?: string | (() => string)
  api: any
  tableProps?: TableProps
  customQueryParams?: Record<string, any>
  overwriteParams?: Record<string, any>
  modalWidth?: string | number
  disableRouterQuery?: boolean
  disableSearch?: boolean
  disableAdd?: boolean
  disableEdit?: boolean
  disableDelete?: boolean
  disableExport?: boolean
  disableTrash?: boolean
}
