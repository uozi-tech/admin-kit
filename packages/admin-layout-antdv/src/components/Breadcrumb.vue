<script setup lang="ts">
import { BreadcrumbItem } from '../props.ts'
import { getRealTitle } from '../utils'

const props = defineProps<{
  items?: BreadcrumbItem[]
}>()

const route = useRoute()
const internalItems = computed<BreadcrumbItem[]>(() => {
  const matchedRoutes = route.matched
  return props.items || matchedRoutes.map(r => ({
    title: r.meta?.breadcrumb || r.meta?.title || r.name,
    path: r.path,
    icon: r.meta?.icon,
    children: r.children?.map(c => ({
      title: c.meta?.breadcrumb || c.meta?.title || c.name,
      path: c.path,
      icon: c.meta?.icon,
    })),
  })) as BreadcrumbItem[]
})
</script>

<template>
  <ABreadcrumb>
    <ABreadcrumbItem
      v-for="(item, index) in internalItems"
      :key="index"
    >
      <!-- 如果有path属性则是链接，否则为普通文本 -->
      <template v-if="item.path && index !== internalItems.length - 1">
        <ADropdown>
          <RouterLink :to="item.path">
            {{ getRealTitle(item.title) }}
          </RouterLink>
          <template
            v-if="item.children?.length"
            #overlay
          >
            <AMenu>
              <AMenuItem
                v-for="child in item.children"
                :key="child.path"
                class="py-[2px]!"
              >
                <RouterLink :to="child.path">
                  {{ getRealTitle(child.title) }}
                </RouterLink>
              </AMenuItem>
            </AMenu>
          </template>
        </ADropdown>
      </template>
      <template v-else>
        {{ getRealTitle(item.title) }}
      </template>
    </ABreadcrumbItem>
    <!-- 支持插槽自定义面包屑项 -->
    <slot />
  </ABreadcrumb>
</template>

<style scoped>
a-breadcrumb {
  margin: 16px 0;
}
</style>
