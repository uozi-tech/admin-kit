<script setup lang="ts">
defineProps({
  pageTitle: {
    type: String,
    default: 'Page Title',
  },
})
</script>

<template>
  <APageHeader
    class="p-0"
    :title="pageTitle"
  >
    <slot /> <!-- 可插入自定义内容 -->
    <template v-if="$slots.extra">
      <slot name="extra" /> <!-- 自定义 PageHeader 右侧的内容 -->
    </template>
  </APageHeader>
</template>
