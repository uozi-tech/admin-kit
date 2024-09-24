<script setup lang="ts">
withDefaults(defineProps<{
  items: {
    text: string
    href?: string
  }[]
}>(), {
  items: () => [],
})
</script>

<template>
  <ABreadcrumb>
    <ABreadcrumbItem
      v-for="(item, index) in items"
      :key="index"
      :class="{ 'text-gray-9': index === items.length - 1 }"
    >
      <!-- 如果有href属性则是链接，否则为普通文本 -->
      <template v-if="item.href">
        <a :href="item.href">{{ item.text }}</a>
      </template>
      <template v-else>
        {{ item.text }}
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
