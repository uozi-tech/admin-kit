<template>
  <a-breadcrumb>
    <a-breadcrumb-item :class="{ 'text-gray-9': index === items.length - 1 }" v-for="(item, index) in items" :key="index">
      <!-- 如果有href属性则是链接，否则为普通文本 -->
      <template v-if="item.href">
        <a :href="item.href">{{ item.text }}</a>
      </template>
      <template v-else>
        {{ item.text }}
      </template>
    </a-breadcrumb-item>
    <!-- 支持插槽自定义面包屑项 -->
    <slot />
  </a-breadcrumb>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
a-breadcrumb {
  margin: 16px 0;
}
</style>