<script setup lang="ts">
import type { SidebarItem, Text } from '../props'
import { Drawer, LayoutSider } from 'ant-design-vue'
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

const emit = defineEmits(['clickMenuItem', 'collapseSidebar'])

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

// 点击菜单
function handleMenuItemClick({ item }) {
  emit('clickMenuItem', item)
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
        width="256"
        @close="drawerVisible = false"
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
      class="z-11 bg-base! h-full"
      :collapsed="collapsed"
      collapsible
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
    </LayoutSider>
  </div>
</template>

<style scoped lang="less">
.logo {
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.ant-layout-sider-trigger) {
  color: inherit;
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
