<script setup lang="ts">
import type { CheckboxGroupProps } from 'antdv-next'
import type { CheckboxGroupConfig } from '../../types'
import { CheckboxGroup } from 'antdv-next'

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
