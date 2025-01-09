<script setup lang="ts">
import type { CascaderConfig } from '../../types'
import { Cascader } from 'ant-design-vue'

defineProps<{ props?: CascaderConfig & { placeholder?: string | number } }>()

const value = defineModel('value')
</script>

<template>
  <Cascader
    v-model:value="value as any"
    :get-popup-container="(triggerNode: any) => triggerNode.parentNode"
    v-bind="props"
  />
</template>

<style scoped lang="less">

</style>
