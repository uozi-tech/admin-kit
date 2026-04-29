<script setup lang="ts">
import type { TextareaConfig } from '../../types'
import { TextArea } from 'antdv-next'

defineProps<{
  props?: Omit<TextareaConfig, 'placeholder'>
  placeholder?: string | number
  disabled?: boolean
}>()
const value = defineModel<TextareaConfig['value']>('value')
</script>

<template>
  <TextArea
    v-model:value="value"
    :placeholder="placeholder?.toString()"
    :disabled
    v-bind="props"
  />
</template>
