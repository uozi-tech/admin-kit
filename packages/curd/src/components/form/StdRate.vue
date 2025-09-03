<script setup lang="ts">
import type { RateConfig } from '../../types'
import { Rate } from 'ant-design-vue'

defineProps<{
  props?: Omit<RateConfig, 'placeholder'>
  placeholder?: string | number
  disabled?: boolean
}>()

const value = defineModel<RateConfig['value']>('value')
</script>

<template>
  <Rate
    v-model:value="value"
    :disabled
    :placeholder
    v-bind="props"
  />
</template>
