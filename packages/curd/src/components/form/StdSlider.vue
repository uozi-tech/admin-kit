<script setup lang="ts">
import type { SliderConfig } from '../../types'
import { Slider } from 'antdv-next'
import { computed } from 'vue'

defineProps <{
  props?: Omit<SliderConfig, 'value'>
  placeholder?: string | number
  disabled?: boolean
}>()

const value = defineModel<number | number[] | null>('value')

const computedValue = computed<number | number[] | undefined>({
  get: () => value.value ?? undefined,
  set: val => value.value = val ?? null,
})
</script>

<template>
  <div style="padding: 0 6px">
    <Slider
      v-model:value="computedValue"
      :placeholder
      :disabled
      v-bind="props"
    />
  </div>
</template>
