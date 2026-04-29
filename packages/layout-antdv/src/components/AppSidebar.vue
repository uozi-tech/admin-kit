<script setup lang="ts">
import type { SidebarItem, Text } from '../props'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@antdv-next/icons'
import { Drawer, LayoutSider } from 'antdv-next'
import { throttle } from 'lodash-es'
import { onMounted, onUnmounted, ref, useSlots } from 'vue'
import SidebarContent from './SidebarContent.vue'

withDefaults(defineProps<{
  logo?: string
  headerTitle?: Text
  items?: SidebarItem[]
}>(), {
  headerTitle: 'Admin Dashboard',
  items: () => [],
})

const emit = defineEmits<{
  selectMenuItem: [key: string]
  collapseSidebar: [collapsed: boolean]
}>()

const drawerVisible = defineModel<boolean>('drawerVisible', {
  default: false,
})

const slots = useSlots()

// 移动端隐藏侧边栏
const hideLayoutSidebar = ref(false)

// 折叠菜单
const collapsed = ref(false)

function _init() {
  collapsed.value = shouldCollapse()
  hideLayoutSidebar.value = getClientWidth() < 600
}

const init = throttle(_init, 50)

onMounted(init)

function getClientWidth() {
  return document.body.clientWidth
}

function shouldCollapse() {
  return getClientWidth() < 1280
}

addEventListener('resize', init)

function handleCollapse(val: boolean) {
  collapsed.value = val
  emit('collapseSidebar', val)
}

function toggleCollapse() {
  handleCollapse(!collapsed.value)
}

// 点击菜单
function handleMenuItemClick(key: string) {
  emit('selectMenuItem', key)
}

onUnmounted(() => {
  removeEventListener('resize', init)
})
</script>

<template>
  <div>
    <div class="drawer-sidebar">
      <Drawer
        v-model:open="drawerVisible"
        :closable="false"
        placement="left"
        size="256"
        @close="handleCollapse(false)"
      >
        <SidebarContent
          :logo="logo"
          :header-title="headerTitle"
          :items="items"
          @select-menu-item="handleMenuItemClick"
        >
          <template
            v-for="(_, key) in slots"
            :key="key"
            #[key]="slotProps"
          >
            <slot
              :name="key"
              v-bind="slotProps"
            />
          </template>
        </SidebarContent>
      </Drawer>
    </div>
    <LayoutSider
      v-if="!hideLayoutSidebar"
      class="app-sidebar z-11 bg-base! h-full"
      :collapsed="collapsed"
      collapsible
      :trigger="null"
      @collapse="handleCollapse"
    >
      <SidebarContent
        :logo="logo"
        :header-title="headerTitle"
        :items="items"
        :collapsed="collapsed"
        @select-menu-item="handleMenuItemClick"
      >
        <template
          v-for="(_, key) in slots"
          :key="key"
          #[key]="slotProps"
        >
          <slot
            :name="key"
            v-bind="slotProps"
          />
        </template>
      </SidebarContent>
      <button
        type="button"
        class="sidebar-collapse-trigger"
        :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="toggleCollapse"
      >
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
      </button>
    </LayoutSider>
  </div>
</template>

<style scoped lang="less">
.app-sidebar {
  display: flex;
  flex-direction: column;
  position: relative;
}

.logo {
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.ant-layout-sider-trigger) {
  color: inherit;
}

.sidebar-collapse-trigger {
  position: absolute;
  inset-inline-start: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-top: 1px solid #e8e8e8;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
}

.dark {
  .sidebar-collapse-trigger {
    border-top-color: #404040 !important;

    &:hover {
      background-color: rgba(255, 255, 255, 0.08);
    }
  }
}

:deep(.ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left) {
  border-right: 0 !important;
}

:deep(.ant-layout-sider) {
  &.ant-layout-sider-has-trigger {
    padding-bottom: 0;
  }

  box-shadow: 2px 0 8px rgba(29, 35, 41, 0.05);
}
</style>
