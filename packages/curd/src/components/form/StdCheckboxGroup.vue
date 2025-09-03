<script setup lang="ts">
import type { CheckboxGroupProps } from 'ant-design-vue'
import type { CheckboxGroupConfig } from '../../types'
import { CheckboxGroup } from 'ant-design-vue'

defineProps<{
  props?: CheckboxGroupConfig
  disabled?: boolean
}>()

const value = defineModel<CheckboxGroupProps['value']>('value')
</script>

<template>
  <CheckboxGroup
    v-model:value="value"
    :disabled="disabled"
    v-bind="props"
  />
</template>
