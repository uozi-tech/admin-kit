<script setup lang="ts">
import type { PanelMode } from 'ant-design-vue/es/vc-picker/interface'
import type { DatePickerConfig, MonthPickerConfig, WeekPickerConfig } from '../../types'
import { DatePicker } from 'ant-design-vue'
import { Format } from '../../constants'

defineProps<{ props?: (DatePickerConfig | WeekPickerConfig | MonthPickerConfig) & { placeholder?: string | number }, type: PanelMode | 'datetime' }>()

const value = defineModel('value')
</script>

<template>
  <DatePicker
    v-model:value="value as any"
    :picker="type === 'datetime' ? undefined : type as any"
    :format="Format[type]"
    :value-format="Format[type]"
    :show-time="type === 'datetime'"
    :get-popup-container="(triggerNode: any) => triggerNode.parentNode"
    v-bind="props as any"
  />
</template>

<style scoped lang="less">

</style>
