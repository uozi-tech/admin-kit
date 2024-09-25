<script setup lang="ts">
import { BreadcrumbItem } from '../props.ts'
import { getRealTitle } from '../utils'

withDefaults(defineProps<{
  items: BreadcrumbItem[]
}>(), {
  items: () => [],
})
</script>

<template>
  <ABreadcrumb>
    <ABreadcrumbItem
      v-for="(item, index) in items"
      :key="index"
    >
      <!-- 如果有path属性则是链接，否则为普通文本 -->
      <template v-if="item.path && index !== items.length - 1">
        <ADropdown>
          <a :href="item.path">{{ getRealTitle(item.title) }}</a>
          <template
            v-if="item.children?.length"
            #overlay
          >
            <AMenu>
              <AMenuItem
                v-for="child in item.children"
                :key="child.path"
              >
                <a :href="item.path">{{ getRealTitle(item.title) }}</a>
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
