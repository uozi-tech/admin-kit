<script setup lang="ts">
import type { InputNumberConfig } from '../../types'
import { InputNumber } from 'ant-design-vue'

defineProps<{ props?: Omit<InputNumberConfig, 'placeholder'> & { placeholder?: string } }>()

const value = defineModel<InputNumberConfig['value']>('value')
</script>

<template>
  <InputNumber
    v-model:value="value"
    v-bind="props"
  />
</template>

<style scoped lang="less">

</style>
