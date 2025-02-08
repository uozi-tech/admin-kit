<script setup lang="ts">
import type { RadioGroupConfig } from '~curd/types'
import { RadioGroup } from 'ant-design-vue'

defineProps<{ props?: RadioGroupConfig }>()

const value = defineModel<RadioGroupConfig['value']>('value')
</script>

<template>
  <RadioGroup
    v-model:value="value"
    v-bind="props"
  />
</template>

<style scoped lang="less">

</style>
