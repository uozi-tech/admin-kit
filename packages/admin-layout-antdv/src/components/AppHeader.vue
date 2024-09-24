<template>
  <div class="app-header">
    <div></div>
    <ul class="flex gap-4 list-none">
      <!-- 默认的切换主题按钮 -->
      <li @click="toggleTheme">切换主题</li>
      <li @click="">切换语言</li>

      <!-- 自定义 Header 的插槽内容，默认会显示传入的 slot -->
      <template v-if="$slots.actions">
        <slot name="actions" />
      </template>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Admin Dashboard',
  },
});

const emit = defineEmits(['toggleTheme', 'changeLanguage']);

function toggleTheme() {
  emit('toggleTheme');
}

function changeLanguage(language) {
  emit('changeLanguage', language);
}
</script>

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