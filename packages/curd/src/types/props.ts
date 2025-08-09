import type {
  DescriptionsProps,
  RowProps,
  TableProps,
} from 'ant-design-vue'

import type { TableRowSelection } from 'ant-design-vue/es/table/interface'
import type { VNode } from 'vue'
import type { JSX } from 'vue/jsx-runtime'
import type { CurdApi } from './api'
import type { DeleteConfirmConfig } from './config'
import type { StdTableColumn } from './index'

export interface StdTableProps extends Pick<
  StdCurdProps,
  'tableProps'
  | 'columns'
  | 'customQueryParams'
  | 'overwriteParams'
  | 'rowSelectionType'
  | 'rowSelection'
  | 'disableRouterQuery'
  | 'disableView'
  | 'disableEdit'
  | 'disableSearch'
  | 'disableDelete'
  | 'disableTrash'
  | 'rowDraggable'
  | 'rowDraggableOptions'
  | 'hideResetBtn'
  | 'showSearchBtn'
  | 'searchFormExtraRender'
  | 'deleteConfirmConfig'
> {
  getListApi: CurdApi['getList']
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
  detailProps?: DescriptionsProps
  formRowProps?: RowProps
  columns: StdTableColumn[]
  rowKey?: string
  rowSelectionType?: 'checkbox' | 'radio'
  rowSelection?: TableRowSelection
  scrollX?: number | string
  scrollY?: number | string
  title?: string | (() => string)
  api: CurdApi
  tableProps?: TableProps
  customQueryParams?: Record<string, any>
  overwriteParams?: Record<string, any>
  modalWidth?: string | number
  formClass?: string | string[] | Record<string, boolean>
  disableRouterQuery?: boolean
  disableSearch?: boolean
  disableAdd?: boolean
  disableView?: boolean
  disableEdit?: boolean
  disableDelete?: boolean
  disableExport?: boolean
  disableTrash?: boolean
  hideResetBtn?: boolean
  showSearchBtn?: boolean
  hideTitle?: boolean
  hideExtra?: boolean
  hideHeader?: boolean
  rowDraggable?: boolean
  rowDraggableOptions?: {
    onMove?: (oldRow: number[], newRow: number[]) => void
    onEnd?: (data: {
      target_id: number
      direction: number
      affected_ids: number[]
    }) => void
  }
  searchFormExtraRender?: (searchFormData: any, searchColumns: StdTableColumn[], stdTableConfig: Record<any, any>) => VNode | JSX.Element
  deleteConfirmConfig?: DeleteConfirmConfig

  beforeSave?: (data: Record<string, any>) => Promise<boolean> | boolean
}
