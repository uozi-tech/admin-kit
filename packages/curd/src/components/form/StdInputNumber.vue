<script setup lang="ts">
import type { InputNumberConfig } from '../../types'
import { InputNumber } from 'antdv-next'

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
