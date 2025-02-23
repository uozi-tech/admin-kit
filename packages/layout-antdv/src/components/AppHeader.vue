<script setup lang="ts">
</script>

<template>
  <div class="app-header">
    <div />
    <div class="flex items-center">
      <div class="flex items-center gap-4">
        <slot name="default" />
      </div>

      <!-- 自定义 Header 的插槽内容，默认会显示传入的 slot -->
      <template v-if="$slots.actions">
        <slot name="actions" />
      </template>
    </div>
  </div>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 24px;
}
.logo {
  font-size: 20px;
}
</style>
