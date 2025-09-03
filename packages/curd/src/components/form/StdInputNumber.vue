<script setup lang="ts">
import type { InputNumberConfig } from '../../types'
import { InputNumber } from 'ant-design-vue'

defineProps<{
  props?: Omit<InputNumberConfig, 'placeholder'>
  placeholder?: string
  disabled?: boolean
}>()

const value = defineModel<InputNumberConfig['value']>('value')
</script>

<template>
  <InputNumber
    v-model:value="value"
    :disabled
    :placeholder
    v-bind="props"
  />
</template>
