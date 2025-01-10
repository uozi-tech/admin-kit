<script setup lang="ts">
import type { SwitchConfig } from '../../types'
import { Switch } from 'ant-design-vue'

defineProps<{ props?: SwitchConfig & { placeholder?: string | number } }>()

const value = defineModel('value')
</script>

<template>
  <Switch
    v-model:value="value"
    v-bind="props"
  />
</template>

<style scoped lang="less">

</style>
