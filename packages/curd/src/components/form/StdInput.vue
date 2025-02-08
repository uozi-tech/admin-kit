<script setup lang="ts">
import type { InputConfig } from '../../types'
import { Input } from 'ant-design-vue'

defineProps<{ props?: InputConfig & { placeholder?: string | number } }>()
const value = defineModel<InputConfig['value']>('value')
</script>

<template>
  <Input
    v-model:value="value"
    v-bind="props"
  />
</template>
