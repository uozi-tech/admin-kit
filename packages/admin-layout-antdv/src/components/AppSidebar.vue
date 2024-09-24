<template>
  <a-layout-sider
      class="z-11 bg-base!"
      :collapsed="collapsed"
      @collapse="handleCollapse"
      collapsible
  >
    <!-- 可自定义 Logo 区域 -->
    <div class="logo">
      <slot name="logo">
        <h1>{{ title }}</h1>
      </slot>
    </div>

    <a-menu
        :default-selected-keys="[selectedKey]"
        mode="inline"
        @select="handleSelect"
    >
      <!-- 动态生成菜单项 -->
      <a-menu-item v-for="item in menuItems" :key="item.key" :icon="item.icon">
        <a :href="item.path">{{ item.label }}</a>
      </a-menu-item>
    </a-menu>

    <!-- 自定义的侧边栏内容 -->
    <slot />
  </a-layout-sider>
</template>

<script setup>
import {ref} from "vue";
import {throttle} from "lodash-es";

const props = defineProps({
  title: {
    type: String,
    default: 'Admin Dashboard',
  },
  menuItems: {
    type: Array,
    default: () => [],
  },
  selectedKey: {
    type: String,
    default: '',
  },
  theme: {
    type: String,
    default: 'dark',
  },
});

const emit = defineEmits(['selectMenuItem', 'collapseSidebar']);
const collapsed = ref(false);

addEventListener('resize', throttle(() => {
  collapsed.value = shouldCollapse()
}, 50))

function getClientWidth() {
  return document.body.clientWidth
}

function shouldCollapse() {
  return getClientWidth() < 1280
}

function handleSelect({ key }) {
  emit('selectMenuItem', key);
}

function handleCollapse(val) {
  collapsed.value = val;
  emit('collapseSidebar', val);
}
</script>

<style scoped>
.logo {
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px;
}
</style>