<script setup lang="ts">
import type { SliderConfig } from '../../types'
import { Slider } from 'ant-design-vue'

defineProps<{ props?: SliderConfig & { placeholder?: string | number } }>()

const value = defineModel<number>('value')
</script>

<template>
  <div style="padding: 0 6px">
    <Slider
      v-model:value="value"
      v-bind="props"
    />
  </div>
</template>

<style scoped lang="less">

</style>
