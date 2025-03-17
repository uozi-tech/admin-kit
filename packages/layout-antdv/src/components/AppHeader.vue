<script setup lang="ts">
import { MenuUnfoldOutlined } from '@ant-design/icons-vue'

const emit = defineEmits(['clickUnFold'])
</script>

<template>
  <div class="app-header">
    <div class="tool">
      <MenuUnfoldOutlined @click="emit('clickUnFold')" />
    </div>

    <div class="flex w-full items-center justify-end">
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

<style scoped lang="less">
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

.tool {
  position: absolute;
  left: 20px;
  @media (min-width: 600px) {
    display: none;
  }
}

.dark {
  .app-header {
    box-shadow: 1px 1px 0 0 #404040;

    a {
      color: #fafafa;
    }
  }
}
</style>
