<script setup lang="ts">
import type { Component } from 'vue'
import type { TimeT } from '../../types'
import { DatePicker } from 'antdv-next'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import { cloneDeep, isEqual } from 'lodash-es'
import { computed, shallowRef, watch } from 'vue'
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
const resolvedFormat = computed(() => p.props?.format ?? Format[p.type])
const resolvedValueFormat = computed(() => {
  if (usingTimestamp) {
    return undefined
  }
  return p.props?.valueFormat ?? resolvedFormat.value
})
const stableShowTime = shallowRef<any>(p.type === 'datetime' ? true : undefined)
const resolvedShowTime = computed(() => stableShowTime.value)
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

watch(() => p.props?.showTime, (newValue, oldValue) => {
  const fallbackValue = p.type === 'datetime'
    ? true
    : undefined
  const nextValue = newValue ?? fallbackValue
  const shouldReuseStableRef = isEqual(stableShowTime.value, nextValue)

  if (!shouldReuseStableRef) {
    stableShowTime.value = typeof nextValue === 'object' && nextValue !== null
      ? cloneDeep(nextValue)
      : nextValue
  }
}, { immediate: true })

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
