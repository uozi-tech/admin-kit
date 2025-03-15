<script setup lang="ts">
import type { TextareaConfig } from '../../types'
import { Textarea } from 'ant-design-vue'

defineProps<{ props?: TextareaConfig & { placeholder?: string | number } }>()
const value = defineModel<TextareaConfig['value']>('value')
</script>

<template>
  <Textarea
    v-model:value="value"
    v-bind="props"
  />
</template>
