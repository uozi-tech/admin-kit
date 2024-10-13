<script setup lang="ts">
defineProps({
  pageTitle: {
    type: String,
  },
})
</script>

<template>
  <APageHeader
    class="p-0"
    :title="pageTitle"
  >
    <slot />
    <slot name="extra" />
  </APageHeader>
</template>
