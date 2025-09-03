<script setup lang="ts">
import type { SliderConfig } from '../../types'
import { Slider } from 'ant-design-vue'

defineProps <{
  props?: SliderConfig
  placeholder?: string | number
  disabled?: boolean
}>()

const value = defineModel<SliderConfig['value']>('value')
</script>

<template>
  <div style="padding: 0 6px">
    <Slider
      v-model:value="value"
      :placeholder
      :disabled
      v-bind="props"
    />
  </div>
</template>
