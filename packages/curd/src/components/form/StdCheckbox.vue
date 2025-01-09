<script setup lang="ts">
import type { CheckboxConfig } from '../../types'
import { Checkbox } from 'ant-design-vue'

defineProps<{ props?: CheckboxConfig & { placeholder?: string | number } }>()

const value = defineModel('value')
</script>

<template>
  <Checkbox
    v-model:value="value"
    v-bind="props"
  />
</template>

<style scoped lang="less">

</style>
