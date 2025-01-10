<script setup lang="ts">
import { PageHeader } from 'ant-design-vue'

defineProps({
  pageTitle: {
    type: String,
  },
})
</script>

<template>
  <PageHeader
    class="p-0"
    :title="pageTitle"
  >
    <slot />
    <slot name="extra" />
  </PageHeader>
</template>
