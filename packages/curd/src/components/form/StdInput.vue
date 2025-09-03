<script setup lang="ts">
import type { InputConfig } from '../../types'
import { Input } from 'ant-design-vue'

defineProps<{
  props?: Omit<InputConfig, 'placeholder'>
  placeholder?: string | number
  disabled?: boolean
}>()
const value = defineModel<InputConfig['value']>('value')
</script>

<template>
  <Input
    v-model:value="value"
    :disabled
    :placeholder
    v-bind="props"
  />
</template>
