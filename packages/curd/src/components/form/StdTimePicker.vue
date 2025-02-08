<script setup lang="ts">
import type { TimePickerConfig } from '../../types'
import { TimePicker } from 'ant-design-vue'
import { Format } from '../../constants'

defineProps<{ props?: TimePickerConfig & { placeholder?: string | number } }>()

const value = defineModel<TimePickerConfig['value']>('value')
</script>

<template>
  <TimePicker
    v-model:value="value as any"
    :format="Format.time as any"
    :value-format="Format.time"
    :get-popup-container="(triggerNode: any) => triggerNode.parentNode"
    v-bind="props as any"
  />
</template>

<style scoped lang="less">

</style>
