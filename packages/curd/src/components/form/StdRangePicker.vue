<script setup lang="ts">
import type { PanelMode } from 'ant-design-vue/es/vc-picker/interface'
import type { RangePickerConfig } from '../../types'
import { RangePicker } from 'ant-design-vue'
import { Format } from '../../constants'

defineProps<{ props?: RangePickerConfig & { placeholder?: string | number }, type: PanelMode | 'datetime' }>()

const value = defineModel('value')
</script>

<template>
  <RangePicker
    v-model:value="value as any"
    :format="Format[type]"
    :value-format="Format[type]"
    :show-time="type === 'datetime'"
    :get-popup-container="(triggerNode: any) => triggerNode.parentNode"
    v-bind="props as any"
  />
</template>

<style scoped lang="less">

</style>
