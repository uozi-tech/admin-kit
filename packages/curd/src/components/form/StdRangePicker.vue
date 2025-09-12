<script setup lang="ts">
import type { PanelMode } from 'ant-design-vue/es/vc-picker/interface'
import type { Dayjs } from 'dayjs'
import type { RangePickerConfig, TimeT } from '../../types'
import { RangePicker } from 'ant-design-vue'
import dayjs from 'dayjs'
import { computed } from 'vue'

import { Format } from '../../constants'
import { isUsingTimestamp } from './helper'

const p = defineProps<{
  props?: RangePickerConfig & TimeT
  placeholder?: string | number
  type: PanelMode | 'datetime'
  disabled?: boolean
}>()

const value = defineModel<RangePickerConfig['value'] & [number, number] & [string, string]>('value')

const usingTimestamp = isUsingTimestamp(p.props)

const computedValue = computed<[string, string] | [Dayjs, Dayjs] | undefined>({
  get() {
    if (!value.value)
      return undefined
    if (usingTimestamp) {
      return value.value.map((v: any) => dayjs.unix(Number(v))) as [Dayjs, Dayjs]
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
  <RangePicker
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
