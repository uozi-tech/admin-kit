<script setup lang="ts">
import type { MouseEventHandler } from 'ant-design-vue/es/_util/EventInterface'
import { PageHeader as AntPageHeader } from 'ant-design-vue'

defineProps<{
  pageTitle: string
  back?: MouseEventHandler
}>()
</script>

<template>
  <AntPageHeader
    class="p-0"
    :title="pageTitle"
    @back="back"
  >
    <slot />
    <slot name="extra" />
  </AntPageHeader>
</template>

<style scoped>

</style>
