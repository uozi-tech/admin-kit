<script setup lang="ts">
import type { SidebarItem, Text } from '../props'
import { Avatar, Image, LayoutSider, Menu, MenuItem, SubMenu } from 'ant-design-vue'
import { throttle } from 'lodash-es'
import { h, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getRealTitle } from '../utils'

withDefaults(defineProps<{
  logo?: string
  headerTitle?: Text
  items?: SidebarItem[]
}>(), {
  headerTitle: 'Admin Dashboard',
  items: () => [],
})

const emit = defineEmits(['clickMenuItem', 'collapseSidebar'])

const route = useRoute()

const selectedKeys = ref<string[]>([route.name as string])

const lastSepIndex = route.path.lastIndexOf('/')
const openKeys = ref<string[]>([route.path.substring(0, lastSepIndex)])

// 折叠菜单
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

function handleCollapse(val: boolean) {
  collapsed.value = val
  emit('collapseSidebar', val)
}

// 点击菜单
function handleMenuItemClick({ item }) {
  emit('clickMenuItem', item)
}
</script>

<template>
  <LayoutSider
    class="z-11 bg-base!"
    :collapsed="collapsed"
    collapsible
    @collapse="handleCollapse"
  >
    <!-- 可自定义 Logo 区域 -->
    <div class="logo">
      <slot name="logo">
        <Avatar
          v-if="collapsed && !logo"
          size="large"
          class="flex items-center bg-purple-5 dark:bg-purple-8 text-xl font-semibold transition-all"
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
          class=" transition-all line-clamp-1"
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
  </LayoutSider>
</template>

<style scoped>
.logo {
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.ant-layout-sider-trigger) {
  color: inherit;
}
</style>
