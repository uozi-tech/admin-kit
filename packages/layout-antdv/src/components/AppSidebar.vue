<script setup lang="ts">
import { ref } from 'vue'
import { throttle } from 'lodash-es'
import { SidebarItem, Title } from '../props'
import { getRealTitle } from '../utils'

withDefaults(defineProps<{
  headerTitle?: Title
  items?: SidebarItem[]
}>(), {
  headerTitle: 'Admin Dashboard',
  items: () => [],
},
)

const emit = defineEmits(['clickMenuItem', 'collapseSidebar'])

const route = useRoute()

const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])
watchEffect(() => {
  selectedKeys.value = [route.path]
  openKeys.value = [route.path.substring(1, route.path.lastIndexOf('/'))]
})

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
function handleMenuItemClick({ item }: { item: SidebarItem }) {
  emit('clickMenuItem', item)
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
        <AAvatar
          v-show="collapsed"
          size="large"
          class="flex items-center bg-purple-5 dark:bg-purple-8 text-xl font-semibold transition-all"
        >
          {{ getRealTitle(headerTitle)[0] }}
        </AAvatar>
        <h1
          v-show="!collapsed"
          class=" transition-all line-clamp-1"
        >
          {{ getRealTitle(headerTitle) }}
        </h1>
      </slot>
    </div>

    <AMenu
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
          <ASubMenu :key="item.path">
            <template #title>
              <Component :is="item?.icon" />
              <span>{{ getRealTitle(item.title) }}</span>
            </template>
            <AMenuItem
              v-for="child in item.children"
              :key="child.path"
              :icon="child.icon"
            >
              <RouterLink :to="child.path">
                {{ getRealTitle(child.title) }}
              </RouterLink>
            </AMenuItem>
          </ASubMenu>
        </template>
        <template v-else>
          <AMenuItem
            :key="item.path"
            :icon="h(item.icon as any)"
          >
            <RouterLink :to="item.path">
              {{ getRealTitle(item.title) }}
            </RouterLink>
          </AMenuItem>
        </template>
      </template>
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
}
</style>
