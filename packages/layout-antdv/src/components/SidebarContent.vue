<script setup lang="ts">
import type { SidebarItem, Text } from '../props'
import { Avatar, Image, Menu, MenuItem, SubMenu } from 'ant-design-vue'
import { h, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getRealTitle } from '../utils'

withDefaults(defineProps<{
  logo?: string
  headerTitle?: Text
  items?: SidebarItem[]
  collapsed?: boolean
}>(), {
  headerTitle: 'Admin Dashboard',
  items: () => [],
  collapsed: false,
})

const emit = defineEmits(['clickMenuItem'])

const route = useRoute()

const selectedKeys = ref<string[]>([route.name as string])

const lastSepIndex = route.path.lastIndexOf('/')
const openKeys = ref<string[]>([route.path.substring(0, lastSepIndex)])

// 点击菜单
function handleMenuItemClick({ item }) {
  emit('clickMenuItem', item)
}
</script>

<template>
  <div>
    <!-- 可自定义 Logo 区域 -->
    <div class="logo mb-1">
      <slot
        name="logo"
        :collapsed="collapsed"
      >
        <Avatar
          v-if="collapsed && !logo"
          size="large"
          class="flex items-center bg-purple-5 dark:bg-purple-8 text-xl transition-all"
        >
          {{ getRealTitle(headerTitle)[0] }}
        </Avatar>
        <div
          v-if="collapsed && logo"
          class="p-4"
        >
          <Image :src="logo" />
        </div>
        <h1
          v-show="!collapsed"
          class="text-20px font-400 transition-all line-clamp-1"
        >
          {{ getRealTitle(headerTitle) }}
        </h1>
      </slot>
    </div>
    <Menu
      v-model:selected-keys="selectedKeys"
      v-model:open-keys="openKeys"
      mode="inline"
      @click="handleMenuItemClick"
    >
      <template
        v-for="item in items"
        :key="item.path"
      >
        <!-- 动态生成菜单项 -->
        <template v-if="item.children?.length">
          <SubMenu
            :key="item.path"
            :icon="item?.icon ? h(item?.icon as any) : undefined"
          >
            <template #title>
              {{ getRealTitle(item.title) }}
            </template>
            <MenuItem
              v-for="child in item.children"
              :key="child.name"
            >
              <RouterLink :to="`${item.path}/${child.path}`">
                {{ getRealTitle(child.title) }}
              </RouterLink>
            </MenuItem>
          </SubMenu>
        </template>
        <template v-else>
          <MenuItem
            :key="item.name"
            :icon="item?.icon ? h(item?.icon as any) : undefined"
          >
            <RouterLink :to="item.path">
              {{ getRealTitle(item.title) }}
            </RouterLink>
          </MenuItem>
        </template>
      </template>
    </Menu>

    <!-- 自定义的侧边栏内容 -->
    <slot />
  </div>
</template>

<style scoped>
.dark {
  .logo {
    background-color: transparent;
    -webkit-box-shadow: 1px 1px 0 0 #404040;
    box-shadow: 1px 1px 0 0 #404040;
  }
}

.logo {
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 1px 1px 0 0 #e8e8e8;
  box-shadow: 1px 1px 0 0 #e8e8e8;
}

.ant-drawer-body {
  .logo {
    box-shadow: unset !important;
  }
}

:deep(.ant-layout-sider-trigger) {
  color: inherit;
}

:deep(ul.ant-menu-inline.ant-menu-root) {
    height: calc(100vh - 112px);
    overflow-y: auto;
    overflow-x: hidden;

    .ant-menu-item {
      width: unset;
    }
  }

:deep(ul.ant-menu-inline-collapsed) {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
