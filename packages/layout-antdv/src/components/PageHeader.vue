<script setup lang="ts">
import type { MouseEventHandler } from 'ant-design-vue/es/_util/EventInterface'
import { PageHeader } from 'ant-design-vue'

defineProps<{
  pageTitle: string
  back?: MouseEventHandler
}>()
</script>

<template>
  <PageHeader
    class="p-0"
    :title="pageTitle"
    @back="back"
  >
    <slot />
    <slot name="extra" />
  </PageHeader>
</template>

<style scoped>

</style>
