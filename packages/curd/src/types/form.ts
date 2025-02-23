import type { FormItemProps } from 'ant-design-vue'
import type { DefineComponent, VNode } from 'vue'
import type { JSX } from 'vue/jsx-runtime'
import type {
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
  TimePickerConfig,
  UploadConfig,
  WeekPickerConfig,
} from './formItem'
import type { StdTableColumn } from './index'

export type FormItemType =
  'input'
  | 'password'
  | 'inputNumber'
  | 'select'
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
  | ((formData: any, column: StdTableColumn, config: Record<any, any>) => VNode | JSX.Element)
  | JSX.Element
  | DefineComponent<any, any, any>

export interface StdFormConfig extends Record<any, any> {
  type: FormItemType
  defaultValue?: any
  valueKey?: string

  password?: PasswordConfig
  input?: InputConfig
  inputNumber?: InputNumberConfig
  select?: SelectConfig
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

  formItem?: FormItemProps & {
    name?: string | string[]
    label?: string | (() => string)
    hiddenLabelInEdit?: boolean
    hiddenLabelInSearch?: boolean
    hiddenLabelInDetail?: boolean
  }
}
