import type {
  CheckboxProps,
  DatePickerProps,
  InputNumberProps,
  InputProps,
  RadioProps,
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
import type { MonthPickerProps, WeekPickerProps } from 'ant-design-vue/es/date-picker'
import type { StdTableColumn } from './index'

export interface PlaceholderT { placeholder?: number | string | (() => string) }

// 使用联合类型并移除 placeholder
export type InputConfig = Omit<InputProps, 'placeholder'> & PlaceholderT

export type InputNumberConfig = Omit<InputNumberProps, 'placeholder'> & PlaceholderT

export type PasswordConfig = Omit<InputProps, 'placeholder'> & PlaceholderT & { generate?: boolean }

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
  rowKey?: string
  displayKey?: string
  selectionType?: 'radio' | 'checkbox'
  api: any // 获取列表数据的api
  columns: StdTableColumn[]
  tips?: string
  disabled?: boolean
  hideInputContainer?: boolean
  modalWidth?: number | string
} & PlaceholderT

export type CascaderConfig = Omit<CascaderProps, 'placeholder'> & PlaceholderT

export type DatePickerConfig = Omit<DatePickerProps, 'placeholder'> & PlaceholderT

export type WeekPickerConfig = Omit<WeekPickerProps, 'placeholder'> & PlaceholderT

export type MonthPickerConfig = Omit<MonthPickerProps, 'placeholder'> & PlaceholderT

export type TimePickerConfig = Omit<TimePickerProps, 'placeholder'> & PlaceholderT

export type RangePickerConfig = Omit<DatePickerProps, 'placeholder'> & PlaceholderT

export type RadioConfig = Omit<RadioProps, 'placeholder'> & PlaceholderT

export type CheckboxConfig = Omit<CheckboxProps, 'placeholder'> & PlaceholderT

export type RateConfig = Omit<RateProps, 'placeholder'> & PlaceholderT

export type SliderConfig = Omit<SliderProps, 'placeholder'> & PlaceholderT

export type SwitchConfig = Omit<SwitchProps, 'placeholder'> & PlaceholderT

export type TransferConfig = Omit<TransferProps, 'placeholder'> & PlaceholderT

export type UploadConfig = Omit<UploadProps, 'placeholder'> & PlaceholderT
