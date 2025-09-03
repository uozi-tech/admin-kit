<script setup lang="ts">
import type { PanelMode } from 'ant-design-vue/es/vc-picker/interface'
import type { Dayjs } from 'dayjs'
import type { DatePickerConfig, MonthPickerConfig, TimeT, WeekPickerConfig } from '../../types'
import { DatePicker } from 'ant-design-vue'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import { computed } from 'vue'
import { Format } from '../../constants'
import { isUsingTimestamp } from './helper'

const p = defineProps<{
  props?: (DatePickerConfig | WeekPickerConfig | MonthPickerConfig) & TimeT
  placeholder?: string | number
  disabled?: boolean
  type: PanelMode | 'datetime'
}>()
dayjs.extend(weekday)
dayjs.extend(localeData)

const value = defineModel<DatePickerConfig['value'] | WeekPickerConfig['value'] | MonthPickerConfig['value'] | number | string>('value')

const usingTimestamp = isUsingTimestamp(p.props)

const computedValue = computed<string | Dayjs | undefined>({
  get() {
    if (usingTimestamp) {
      return value.value ? dayjs.unix(Number(value.value)) : undefined
    }
    else {
      return value.value?.toString()
    }
  },
  set(v: any) {
    if (usingTimestamp) {
      value.value = dayjs(v).unix()
    }
    else {
      value.value = v
    }
  },
})
</script>

<template>
  <DatePicker
    :picker="type === 'datetime' ? undefined : type as any"
    :format="Format[type]"
    :value-format="Format[type]"
    :show-time="type === 'datetime'"
    :get-popup-container="(triggerNode: any) => triggerNode.parentNode"
    :disabled
    :placeholder
    v-bind="{
      ...props as any,
      value: computedValue,
    }"
    @update:value="v => computedValue = v"
  />
</template>
