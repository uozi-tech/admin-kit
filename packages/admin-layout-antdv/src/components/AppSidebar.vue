<script setup lang="ts">
import { ref } from 'vue'
import { throttle } from 'lodash-es'

defineProps({
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
})

const emit = defineEmits(['clickMenuItem', 'collapseSidebar'])
const collapsed = ref(false)

function getClientWidth() {
  return document.body.clientWidth
}

function shouldCollapse() {
  return getClientWidth() < 1280
}

addEventListener('resize', throttle(() => {
  collapsed.value = shouldCollapse()
}, 50))

function onMenuItemClick({ item }) {
  emit('selectMenuItem', item.path)
}

function handleCollapse(val) {
  collapsed.value = val
  emit('collapseSidebar', val)
}
</script>

<template>
  <ALayoutSider
    class="z-11 bg-base!"
    :collapsed="collapsed"
    collapsible
    @collapse="handleCollapse"
  >
    <!-- 可自定义 Logo 区域 -->
    <div class="logo">
      <slot name="logo">
        <h1>{{ title }}</h1>
      </slot>
    </div>

    <AMenu
      :default-selected-keys="[selectedKey]"
      mode="inline"
      :items="menuItems"
      @click="onMenuItemClick"
    >
      <!--      &lt;!&ndash; 动态生成菜单项 &ndash;&gt;-->
      <!--      <a-menu-item v-for="item in menuItems" :key="item.key" :icon="item.icon">-->
      <!--        <a :href="item.path">{{ item.label }}</a>-->
      <!--      </a-menu-item>-->
    </AMenu>

    <!-- 自定义的侧边栏内容 -->
    <slot />
  </ALayoutSider>
</template>

<style scoped>
.logo {
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px;
}
</style>
