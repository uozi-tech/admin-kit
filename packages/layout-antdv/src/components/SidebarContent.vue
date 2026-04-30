<script setup lang="ts">
import type { SidebarItem, Text } from '../props'
import { Avatar, Image, Menu, MenuItem, SubMenu } from 'antdv-next'
import { h, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getRealTitle } from '../utils'

const props = withDefaults(defineProps<{
  logo?: string
  headerTitle?: Text
  items?: SidebarItem[]
  collapsed?: boolean
}>(), {
  headerTitle: 'Admin Dashboard',
  items: () => [],
  collapsed: false,
})

const emit = defineEmits<{
  selectMenuItem: [key: string]
}>()

const route = useRoute()

const selectedKeys = ref<string[]>(getSelectedKeys())
const openKeys = ref<string[]>(getOpenKeys())

function isSameKeys(left: string[], right: string[]) {
  return left.length === right.length && left.every((key, index) => key === right[index])
}

function mergeKeys(baseKeys: string[], nextKeys: string[]) {
  return Array.from(new Set([...baseKeys, ...nextKeys]))
}

function normalizePath(path: string) {
  if (path === '/')
    return path

  return path.replace(/\/+$/, '')
}

function resolveMenuItemPath(parentPath: string, childPath: string) {
  if (childPath.startsWith('/'))
    return normalizePath(childPath)

  return normalizePath(`${normalizePath(parentPath)}/${childPath.replace(/^\/+/, '')}`)
}

function getSelectedKeys() {
  return route.name ? [String(route.name)] : []
}

function getOpenKeysFromItems() {
  const routePath = normalizePath(route.path)

  const activeItem = props.items.find(item => item.children?.some((child) => {
    return child.name === route.name
      || resolveMenuItemPath(item.path, child.path) === routePath
  }))

  return activeItem ? [activeItem.path] : []
}

function getOpenKeys() {
  const openKeysFromItems = getOpenKeysFromItems()

  if (openKeysFromItems.length) {
    return openKeysFromItems
  }

  const matchedOpenKeys = route.matched
    .slice(1, -1)
    .map(record => record.path)
    .filter(key => key && key !== '/')

  if (matchedOpenKeys.length) {
    return matchedOpenKeys
  }

  const lastSepIndex = route.path.lastIndexOf('/')
  const parentPath = lastSepIndex > 0 ? route.path.substring(0, lastSepIndex) : ''

  return parentPath ? [parentPath] : []
}

watch(
  () => [route.name, route.path, route.matched.map(record => record.path).join('|')],
  () => {
    const nextSelectedKeys = getSelectedKeys()
    const nextOpenKeys = getOpenKeys()

    if (!isSameKeys(selectedKeys.value, nextSelectedKeys)) {
      selectedKeys.value = nextSelectedKeys
    }

    const mergedOpenKeys = mergeKeys(openKeys.value, nextOpenKeys)

    if (!isSameKeys(openKeys.value, mergedOpenKeys)) {
      openKeys.value = mergedOpenKeys
    }
  },
)

// 点击菜单
function handleMenuItemClick({ key }: { key: string }) {
  emit('selectMenuItem', key)
}

function handleOpenChange(keys: string[]) {
  if (props.collapsed)
    return

  openKeys.value = keys
}
</script>

<template>
  <div>
    <!-- 可自定义 Logo 区域 -->
    <div class="logo">
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
          class="text-20px font-400 transition-all line-clamp-1 my-0"
        >
          {{ getRealTitle(headerTitle) }}
        </h1>
      </slot>
    </div>
    <Menu
      v-model:selected-keys="selectedKeys"
      :open-keys="collapsed ? [] : openKeys"
      mode="inline"
      @open-change="handleOpenChange"
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
              <RouterLink :to="resolveMenuItemPath(item.path, child.path)">
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
    background-color: transparent !important;
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
