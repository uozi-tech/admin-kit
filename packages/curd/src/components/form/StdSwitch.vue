<script setup lang="ts">
import type { SwitchConfig } from '../../types'
import { Switch } from 'ant-design-vue'

defineProps<{ props?: SwitchConfig & { placeholder?: string | number } }>()

const checked = defineModel<SwitchConfig['checked']>('value')
</script>

<template>
  <!-- 加一层div是为了防止外部的 v-model 直接绑定到 Switch(会有 warning) -->
  <div>
    <Switch
      v-model:checked="checked"
      v-bind="props"
    />
  </div>
</template>

<style scoped lang="less">

</style>
