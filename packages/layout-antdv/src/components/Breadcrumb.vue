<script setup lang="ts">
import type { AppBreadcrumbItem } from '../props'
import { Breadcrumb, BreadcrumbItem } from 'ant-design-vue'
import { computed, onMounted, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useBreadcrumbs } from '../composables'
import { getRealTitle } from '../utils'

const props = defineProps<{
  items?: AppBreadcrumbItem[]
}>()
const route = useRoute()
const router = useRouter()

const internalItems = computed<AppBreadcrumbItem[]>(() => {
  const matchedRoutes = route.matched
  const result: AppBreadcrumbItem[] = []

  matchedRoutes.forEach((r) => {
    if (r.meta?.lastRouteName) {
      const lastRoute = router.resolve({ name: r.meta.lastRouteName })
      result.push({
        title: lastRoute.meta?.breadcrumb || lastRoute.meta?.title || '',
        path: lastRoute.path,
      })
    }
    result.push({
      title: r.meta?.breadcrumb || r.meta?.title || '',
      path: r.path,
    })
  })
  return props.items || result
})

const breadList = useBreadcrumbs()

onMounted(() => {
  breadList.value = internalItems.value
})

watch(route, () => {
  breadList.value = internalItems.value
})
</script>

<template>
  <Breadcrumb>
    <BreadcrumbItem
      v-for="(item, index) in internalItems"
      :key="index"
    >
      <slot :item="item">
        <!-- 如果有path属性则是链接，否则为普通文本 -->
        <template v-if="item.path && index !== internalItems.length - 1">
          <RouterLink :to="item.path">
            {{ getRealTitle(item.title) }}
          </RouterLink>
        </template>
        <template v-else>
          {{ getRealTitle(item.title) }}
        </template>
      </slot>
    </BreadcrumbItem>
  </Breadcrumb>
</template>

<style scoped>
a-breadcrumb {
  margin: 16px 0;
}
</style>
