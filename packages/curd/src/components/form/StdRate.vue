<script setup lang="ts">
import type { RateConfig } from '../../types'
import { Rate } from 'ant-design-vue'

defineProps<{ props?: RateConfig & { placeholder?: string | number } }>()

const value = defineModel<RateConfig['value']>('value')
</script>

<template>
  <Rate
    v-model:value="value"
    v-bind="props"
  />
</template>
