<script setup lang="ts">
import type { Component } from 'vue'
import type { TimeT } from '../../types'
import { DatePicker } from 'antdv-next'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import { computed } from 'vue'
import { Format } from '../../constants'
import { isUsingTimestamp } from './helper'

const p = defineProps<{
  props?: Record<string, any> & TimeT
  placeholder?: string | number
  disabled?: boolean
  type: 'date' | 'datetime' | 'week' | 'month' | 'quarter' | 'year' | 'decade'
}>()

const AntDatePicker = DatePicker as unknown as Component

dayjs.extend(weekday)
dayjs.extend(localeData)

const value = defineModel<any>('value')

const usingTimestamp = isUsingTimestamp(p.props)

const computedValue = computed<any>({
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
  <AntDatePicker
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
