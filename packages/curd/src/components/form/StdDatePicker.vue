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
import { isUingTimestamp } from './helper'

const props = defineProps<{ props?: (DatePickerConfig | WeekPickerConfig | MonthPickerConfig) & { placeholder?: string | number } & TimeT, type: PanelMode | 'datetime' }>()
dayjs.extend(weekday)
dayjs.extend(localeData)

const value = defineModel<DatePickerConfig['value'] | WeekPickerConfig['value'] | MonthPickerConfig['value'] | number | string>('value')

const usingTimestamp = isUingTimestamp(props.props)

const computedValue = computed<string | Dayjs | undefined>({
  get() {
    if (usingTimestamp) {
      return dayjs.unix(Number(value.value))
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
    v-bind="{
      ...props,
      value: computedValue,
    }"
    @update:value="v => computedValue = v"
  />
</template>

<style scoped lang="less">

</style>
