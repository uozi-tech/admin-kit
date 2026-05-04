<script setup lang="ts">
import type { Component } from 'vue'
import type { TimeT } from '../../types'
import { DateRangePicker } from 'antdv-next'
import dayjs from 'dayjs'
import { computed } from 'vue'

import { Format } from '../../constants'
import { isUsingTimestamp } from './helper'

const p = defineProps<{
  props?: Record<string, any> & TimeT
  placeholder?: string | number
  type: 'date' | 'datetime' | 'week' | 'month' | 'quarter' | 'year' | 'decade'
  disabled?: boolean
}>()

const AntDateRangePicker = DateRangePicker as unknown as Component

const value = defineModel<any>('value')

const usingTimestamp = isUsingTimestamp(p.props)
const resolvedFormat = computed(() => p.props?.format ?? Format[p.type])
const resolvedShowTime = computed(() => p.props?.showTime ?? (p.type === 'datetime'))
const resolvedValueFormat = computed(() => {
  if (usingTimestamp) {
    return undefined
  }
  return p.props?.valueFormat ?? resolvedFormat.value
})
const pickerProps = computed(() => {
  const {
    value: _value,
    format: _format,
    valueFormat: _valueFormat,
    showTime: _showTime,
    ...rest
  } = (p.props ?? {}) as Record<string, any>

  return {
    ...rest,
    value: computedValue.value,
  }
})

const computedValue = computed<any>({
  get() {
    if (!value.value)
      return undefined
    if (usingTimestamp) {
      return value.value.map((v: any) => dayjs.unix(Number(v)))
    }
    return value.value as [string, string]
  },
  set(v: any) {
    if (usingTimestamp) {
      value.value = v?.map((v: any, index: number) =>
        index === 1
          ? dayjs(v).endOf('day').unix() // Set to 23:59:59 for end date
          : dayjs(v).startOf('day').unix(), // Set to 00:00:00 for start date
      ) ?? []
    }
    else {
      value.value = v
    }
  },
})
</script>

<template>
  <AntDateRangePicker
    :format="resolvedFormat"
    :value-format="resolvedValueFormat"
    :show-time="resolvedShowTime"
    :get-popup-container="(triggerNode: any) => triggerNode.parentNode"
    :disabled
    :placeholder
    v-bind="pickerProps"
    @update:value="v => computedValue = v"
  />
</template>
