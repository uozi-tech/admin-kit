<script setup lang="ts">
import type { TextareaConfig } from '../../types'
import { Textarea } from 'ant-design-vue'

defineProps<{
  props?: Omit<TextareaConfig, 'placeholder'>
  placeholder?: string | number
  disabled?: boolean
}>()
const value = defineModel<TextareaConfig['value']>('value')
</script>

<template>
  <Textarea
    v-model:value="value"
    :placeholder
    :disabled
    v-bind="props"
  />
</template>
