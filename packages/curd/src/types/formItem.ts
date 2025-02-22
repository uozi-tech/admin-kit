import type {
  CheckboxGroupProps,
  DatePickerProps,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  RateProps,
  SelectProps,
  SliderProps,
  SwitchProps,
  TableProps,
  TimePickerProps,
  TransferProps,
  UploadProps,
} from 'ant-design-vue'
import type { CascaderProps } from 'ant-design-vue/es/cascader'
import type { MonthPickerProps, RangePickerProps, WeekPickerProps } from 'ant-design-vue/es/date-picker'
import type { CurdApi } from './api'
import type { StdTableColumn } from './index'

export interface PlaceholderT { placeholder?: number | string | (() => string) | [string, string] }

export interface TimeT {
  timestamp?: boolean
}

// 使用联合类型并移除 placeholder
export type InputConfig = Omit<InputProps, 'placeholder'> & PlaceholderT

export type InputNumberConfig = Omit<InputNumberProps, 'placeholder'> & PlaceholderT

export type PasswordConfig = Omit<InputProps, 'placeholder'> & PlaceholderT & {
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
  }

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
  overwriteParams?: Record<string, any>
  labelRender?: (row: any) => string
} & PlaceholderT

export type CascaderConfig = Omit<CascaderProps, 'placeholder'> & PlaceholderT

export type DatePickerConfig = Omit<DatePickerProps, 'placeholder'> & PlaceholderT & TimeT

export type RangePickerConfig = Omit<RangePickerProps, 'placeholder'> & PlaceholderT & TimeT

export type WeekPickerConfig = Omit<WeekPickerProps, 'placeholder'> & PlaceholderT

export type MonthPickerConfig = Omit<MonthPickerProps, 'placeholder'> & PlaceholderT

export type TimePickerConfig = Omit<TimePickerProps, 'placeholder'> & PlaceholderT

export type RadioGroupConfig = RadioGroupProps

export type CheckboxGroupConfig = CheckboxGroupProps

export type RateConfig = RateProps

export type SliderConfig = SliderProps

export type SwitchConfig = SwitchProps

export type TransferConfig = Omit<TransferProps, 'placeholder'> & PlaceholderT

export type UploadConfig = Omit<UploadProps, 'placeholder'> & PlaceholderT
