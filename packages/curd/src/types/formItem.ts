import type {
  CheckboxGroupProps,
  DatePickerProps,
  InputNumberProps,
  InputProps,
  ModalProps,
  RadioGroupProps,
  RateProps,
  SelectProps,
  SliderProps,
  SwitchProps,
  TableProps,
  TextAreaProps,
  TimePickerProps,
  TransferProps,
  UploadProps,
} from 'ant-design-vue'
import type { CascaderProps } from 'ant-design-vue/es/cascader'
import type { MonthPickerProps, RangePickerProps, WeekPickerProps } from 'ant-design-vue/es/date-picker'
import type { CurdApi } from './api'
import type { StdTableColumn } from './index'

export interface PlaceholderT { placeholder?: number | string | (() => string) | [string, string] }

interface BaseConfig {
  defaultValue?: any
  class?: string
  style?: string
}

export interface TimeT extends BaseConfig {
  timestamp?: boolean
}

// 使用联合类型并移除 placeholder
export type InputConfig = Omit<InputProps, 'placeholder'> & PlaceholderT & BaseConfig

export type InputNumberConfig = Omit<InputNumberProps, 'placeholder'> & PlaceholderT & BaseConfig

export type TextareaConfig = Omit<TextAreaProps, 'placeholder'> & PlaceholderT & BaseConfig

export type PasswordConfig = Omit<InputProps, 'placeholder'> & PlaceholderT & BaseConfig & {
  generate?: boolean
  maxLength?: number
}

export type SelectConfig = Omit<SelectProps, 'placeholder'> &
  PlaceholderT & {
    remote?: {
      valueKey: string
      labelKey: string
      api: (...args: any[]) => Promise<{ data: any[] }>
    }
    mask?: Record<string | number, any>
    valueKey?: string
  } & BaseConfig

export type SelectorConfig = {
  tableProps?: TableProps
  valueKey?: string
  displayKey?: string
  selectionType?: 'radio' | 'checkbox'
  getListApi: CurdApi['getList']
  columns: StdTableColumn[]
  tips?: string
  disabled?: boolean
  hideInputContainer?: boolean
  modalWidth?: number | string
  modalProps?: ModalProps
  overwriteParams?: Record<string, any>
  labelRender?: (row: any) => string
} & PlaceholderT & BaseConfig

export type CascaderConfig = Omit<CascaderProps, 'placeholder'> & PlaceholderT & BaseConfig

export type DatePickerConfig = Omit<DatePickerProps, 'placeholder'> & PlaceholderT & TimeT & BaseConfig

export type RangePickerConfig = Omit<RangePickerProps, 'placeholder'> & PlaceholderT & TimeT & BaseConfig

export type WeekPickerConfig = Omit<WeekPickerProps, 'placeholder'> & PlaceholderT & BaseConfig

export type MonthPickerConfig = Omit<MonthPickerProps, 'placeholder'> & PlaceholderT & BaseConfig

export type TimePickerConfig = Omit<TimePickerProps, 'placeholder'> & PlaceholderT & BaseConfig

export type RadioGroupConfig = RadioGroupProps & BaseConfig

export type CheckboxGroupConfig = CheckboxGroupProps & BaseConfig

export type RateConfig = RateProps & BaseConfig

export type SliderConfig = SliderProps & BaseConfig

export type SwitchConfig = SwitchProps & BaseConfig

export type TransferConfig = Omit<TransferProps, 'placeholder'> & PlaceholderT & BaseConfig

export type UploadConfig = Omit<UploadProps, 'placeholder'> & PlaceholderT & BaseConfig
