import type { TableColumnType } from 'ant-design-vue'
import type { VNode } from 'vue'
import type { JSX } from 'vue/jsx-runtime'
import type { StdFormConfig } from './form'
import type { CustomRenderArgs } from './props'

export interface StdTableHeaderScope {
  title: string
  column: any
}

export interface StdTableBodyScope {
  text: any
  value: any
  record: Record<string, any>
  index: number
  column: any
}

type CustomHeaderRenderFn = (data: StdTableHeaderScope) => VNode | JSX.Element
type CustomRenderFn<T> = ((props: CustomRenderArgs<T>) => VNode | VNode[] | JSX.Element | JSX.Element[] | string | string[])

export interface StdTableColumn<T = any> extends Omit<TableColumnType, 'customRender'> {
  title: string | (() => string)
  dataIndex: string | string[]
  customHeaderRender?: CustomHeaderRenderFn
  pure?: boolean
  search?: boolean | Partial<StdFormConfig>
  edit?: StdFormConfig
  customRender?: CustomRenderFn<T>
  hiddenInTable?: boolean
  hiddenInEdit?: boolean
  hiddenInAdd?: boolean
  hiddenInDetail?: boolean
  hiddenInExport?: boolean
}

export type ExportColumn = Required<StdTableColumn> & { checked: boolean }
