<script setup lang="ts">
import type { RateConfig } from '../../types'
import { Rate } from 'ant-design-vue'

defineProps<{ props?: RateConfig & { placeholder?: string | number } }>()

const value = defineModel<number>('value')
</script>

<template>
  <Rate
    v-model:value="value"
    v-bind="props"
  />
</template>

<style scoped lang="less">

</style>
