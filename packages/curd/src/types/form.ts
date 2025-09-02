import type { ColProps, FormItemProps } from 'ant-design-vue'
import type { DefineComponent, VNode } from 'vue'
import type { JSX } from 'vue/jsx-runtime'
import type {
  AutoCompleteConfig,
  CascaderConfig,
  CheckboxGroupConfig,
  DatePickerConfig,
  InputConfig,
  InputNumberConfig,
  MonthPickerConfig,
  PasswordConfig,
  RadioGroupConfig,
  RangePickerConfig,
  RateConfig,
  SelectConfig,
  SelectorConfig,
  SliderConfig,
  SwitchConfig,
  TextareaConfig,
  TimePickerConfig,
  UploadConfig,
  WeekPickerConfig,
} from './formItem'
import type { StdTableColumn } from './index'

export type FormItemType
  = 'input'
    | 'password'
    | 'inputNumber'
    | 'select'
    | 'autoComplete'
    | 'selector'
    | 'date'
    | 'datetime'
    | 'year'
    | 'month'
    | 'week'
    | 'time'
    | 'textarea'
    | 'radioGroup'
    | 'checkboxGroup'
    | 'switch'
    | 'rate'
    | 'slider'
    | 'upload'
    | 'cascader'
    | 'transfer'
    | 'dateRange'
    | 'datetimeRange'
    | 'yearRange'
    | 'monthRange'
    | 'weekRange'
    | 'timeRange'
    | ((formData: any, column: StdTableColumn, config: Record<any, any>, mode: 'edit' | 'add') => VNode | JSX.Element)
    | JSX.Element
    | DefineComponent<any, any, any>

export interface StdFormConfig extends Record<any, any> {
  type: FormItemType
  defaultValue?: any
  valueKey?: string
  col?: ColProps
  showInForm?: boolean | ((context: { formData: Record<string, any> }) => boolean)

  password?: PasswordConfig
  input?: InputConfig
  inputNumber?: InputNumberConfig
  textarea?: TextareaConfig
  select?: SelectConfig
  autoComplete?: AutoCompleteConfig
  selector?: SelectorConfig
  cascader?: CascaderConfig
  date?: DatePickerConfig
  datetime?: DatePickerConfig
  year?: DatePickerConfig
  week?: WeekPickerConfig
  month?: MonthPickerConfig
  time?: TimePickerConfig
  dateRange?: RangePickerConfig
  datetimeRange?: RangePickerConfig
  yearRange?: RangePickerConfig
  monthRange?: RangePickerConfig
  weekRange?: RangePickerConfig
  timeRange?: RangePickerConfig
  radioGroup?: RadioGroupConfig
  checkboxGroup?: CheckboxGroupConfig
  rate?: RateConfig
  slider?: SliderConfig
  switch?: SwitchConfig
  transfer?: TimePickerConfig
  upload?: UploadConfig
  customComponent?: Record<string | number | symbol, any>

  // 字段联动配置
  dependencies?: string[] // 依赖的字段名称数组
  onChange?: (value: any, formData: Record<string, any>, dependencies: Record<string, any>) => void // 联动处理函数

  formItem?: Omit<FormItemProps, 'required'> | {
    name?: string | string[]
    label?: string | (() => string)
    hiddenLabelInEdit?: boolean
    hiddenLabelInSearch?: boolean
    hiddenLabelInDetail?: boolean
    required?: boolean | ((context: { formData: Record<string, any> }) => boolean)
  }
}
