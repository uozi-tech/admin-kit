<script setup lang="ts">
import type { CascaderConfig } from '../../types'
import { Cascader } from 'antdv-next'

defineProps<{
  props?: CascaderConfig
  placeholder?: string | number
  disabled?: boolean
}>()

const value = defineModel<CascaderConfig['value']>('value')
</script>

<template>
  <Cascader
    v-model:value="value as any"
    :get-popup-container="(triggerNode: any) => triggerNode.parentNode"
    :placeholder
    :disabled
    v-bind="props"
  />
</template>
