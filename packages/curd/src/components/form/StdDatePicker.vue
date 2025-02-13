<script setup lang="ts">
import type { PanelMode } from 'ant-design-vue/es/vc-picker/interface'
import type { DatePickerConfig, MonthPickerConfig, WeekPickerConfig } from '../../types'
import { DatePicker } from 'ant-design-vue'
import dayjs from 'dayjs'
import { computed } from 'vue'
import { Format } from '../../constants'

defineProps<{ props?: (DatePickerConfig | WeekPickerConfig | MonthPickerConfig) & { placeholder?: string | number }, type: PanelMode | 'datetime' }>()

const value = defineModel<DatePickerConfig['value'] | WeekPickerConfig['value'] | MonthPickerConfig['value'] | number | string>('value')

const computedValue = computed(() => {
  return value.value ? dayjs.unix(Number(value.value)) : undefined
})

function handleChange(v: string) {
  value.value = dayjs(v).unix()
}
</script>

<template>
  <DatePicker
    :value="computedValue"
    :picker="type === 'datetime' ? undefined : type as any"
    :format="Format[type]"
    :value-format="Format[type]"
    :show-time="type === 'datetime'"
    :get-popup-container="(triggerNode: any) => triggerNode.parentNode"
    v-bind="props as any"
    @change="(_, dateString) => handleChange(dateString)"
  />
</template>

<style scoped lang="less">

</style>
