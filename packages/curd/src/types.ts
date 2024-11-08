import {
  CheckboxProps,
  DatePickerProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  RadioProps,
  RateProps,
  SelectProps,
  SliderProps,
  SwitchProps,
  TableColumnType,
  TableProps,
  TimePickerProps,
  TransferProps,
  UploadProps,
} from 'ant-design-vue'
import { ComponentInstance, VNode } from 'vue'
import {
  MonthPickerProps,
  WeekPickerProps,
} from 'ant-design-vue/es/date-picker'
import { JSX } from 'vue/jsx-runtime'
import { CascaderProps } from 'ant-design-vue/es/cascader'

export type FormControllerType = 'input'
  | 'inputNumber'
  | 'select'
  | 'date'
  | 'datetime'
  | 'year'
  | 'month'
  | 'week'
  | 'time'
  | 'number'
  | 'textarea'
  | 'radio'
  | 'checkbox'
  | 'switch'
  | 'rate'
  | 'slider'
  | 'upload'
  | 'cascader'
  | 'transfer'
  | 'dateRange'
  | 'datetimeRange'
  | 'dateTimeRange'
  | 'yearRange'
  | 'monthRange'
  | 'weekRange'
  | 'timeRange'
  | ((column: StdTableColumn) => VNode | JSX.Element)
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  | ComponentInstance<unknown>

export type FormItemType = {
  type: FormControllerType
  input?: InputProps
  inputNumber?: InputNumberProps
  select?: SelectProps & { valueKey?: string }
  cascader?: CascaderProps
  datePicker?: DatePickerProps
  week?: WeekPickerProps
  month?: MonthPickerProps
  time?: TimePickerProps
  radio?: RadioProps
  checkbox?: CheckboxProps
  rate?: RateProps
  slider?: SliderProps
  switch?: SwitchProps
  transfer?: TransferProps
  upload?: UploadProps

  formItem?: FormItemProps & {
    name?: string | (() => string)
  }
}

export interface StdTableColumn extends Omit<TableColumnType, 'customRender'> {
  title: string | (() => string)
  dataIndex: string | string[]
  customHeaderRender?: (data: {
    column: StdTableColumn
    title: string
  }) => VNode | JSX.Element
  search?: boolean | FormItemType
  edit?: FormItemType
  customRender?: ((data: CustomRenderOptions) => VNode | JSX.Element)
  hiddenInTable?: boolean
  hiddenInEdit?: boolean
  hiddenInAdd?: boolean
  hiddenInDetail?: boolean
  hiddenInExport?: boolean
}

export type ExportColumn = Required<StdTableColumn> & { checked: boolean }

export interface StdTableProps extends Omit<TableProps, 'columns'> {
  columns: StdTableColumn[]
  rowKey?: string
  rowSelectionType?: 'checkbox' | 'radio'
  scrollX?: number | string
  scrollY?: number | string
}

export interface CustomRenderOptions {
  column: StdTableColumn
  record: Record<string, any>
  text: any
  value?: any
  index?: number
  renderIndex?: number
  export?: boolean
}

export interface StdCurdProps extends
  Pick<StdTableProps, 'columns'>,
  Partial<
    Pick<StdTableProps, 'rowKey' | 'rowSelectionType' | 'pagination' | 'scrollX' | 'scrollY'>
  > {
  title?: string | (() => string)
  api: {
    getList: (params?: Record<string, any>) => Promise<any>
    getDetail: (id: string | number, params?: Record<string, any>) => Promise<any>
    create: (data: Record<string, any>) => Promise<any>
    update: (id: string | number, data: Record<string, any>) => Promise<any>
    delete: (id: string | number, params?: Record<string, any>) => Promise<any>
    restore: (id: string | number, params?: Record<string, any>) => Promise<any>
  }
  tableConfig?: TableProps
  customParams?: Record<string, any>
  listQueryParams?: Record<string, any>
  modalWidth?: string | number
  disableSearch?: boolean
  disableAdd?: boolean
  disableEdit?: boolean
  disableDelete?: boolean
  disableExport?: boolean
  disableTrash?: boolean
}

export type StdTableHeaderScope = {
  title: string
  column: any
}

export type StdTableBodyScope = {
  text: any
  value: any
  record: Record<string, any>
  index: number
  column: any
}

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}
