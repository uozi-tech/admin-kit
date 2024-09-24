<template>
  <div class="app-footer">
    <slot /> <!-- 自定义插槽内容 -->
    <slot name="footer-content">
      © 2024 Admin Dashboard <!-- 默认版权内容 -->
    </slot>
  </div>
</template>

<style scoped>
.app-footer {
  text-align: center;
  padding: 12px;
}
</style>