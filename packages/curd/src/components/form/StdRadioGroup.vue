<script setup lang="ts">
import type { RadioGroupConfig } from '../../types'
import { RadioGroup } from 'antdv-next'

defineProps<{
  props?: RadioGroupConfig
  disabled?: boolean
}>()

const value = defineModel<RadioGroupConfig['value']>('value')
</script>

<template>
  <RadioGroup
    v-model:value="value"
    :disabled="disabled"
    v-bind="props"
  />
</template>
