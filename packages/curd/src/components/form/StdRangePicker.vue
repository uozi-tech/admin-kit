<script setup lang="ts">
import type { TimeT } from '../../types'
import type { Component } from 'vue'
import { DateRangePicker } from 'antdv-next'
import dayjs from 'dayjs'
import { computed } from 'vue'

import { Format } from '../../constants'
import { isUsingTimestamp } from './helper'

const AntDateRangePicker = DateRangePicker as unknown as Component

const p = defineProps<{
  props?: Record<string, any> & TimeT
  placeholder?: string | number
  type: 'date' | 'datetime' | 'week' | 'month' | 'quarter' | 'year' | 'decade'
  disabled?: boolean
}>()

const value = defineModel<any>('value')

const usingTimestamp = isUsingTimestamp(p.props)

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
