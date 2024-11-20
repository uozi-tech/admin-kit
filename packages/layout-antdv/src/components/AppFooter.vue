<script setup lang="ts">
defineProps<{
  copyright?: string
}>()
</script>

<template>
  <div class="app-footer">
    <!-- 自定义插槽内容 -->
    <slot />
    <slot name="footer-content">
      <!-- 默认版权内容 -->
      {{ copyright }}
    </slot>
  </div>
</template>

<style scoped>
.app-footer {
  text-align: center;
  padding: 12px;
}
</style>
