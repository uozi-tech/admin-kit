<script setup lang="ts">
import type { Bread } from './types'
import {useRoute, useRouter} from "vue-router";
import {computed, inject, onMounted, Ref, watch} from "vue";

const route = useRoute()
const router = useRouter()

const computedBreadList = computed(() => {
  const result: Bread[] = []

  route.matched.forEach(item => {
    if (item.meta?.lastRouteName) {
      const lastRoute = router.resolve({ name: item.meta.lastRouteName as string })

      result.push({
        name: lastRoute.name as string,
        translatedName: lastRoute.meta.title as never as () => string,
        path: lastRoute.path,
      })
    }

    result.push({
      name: item.name as string,
      translatedName: item.meta.title as never as () => string,
      path: item.path,
      hasChildren: item.children?.length > 0,
    })
  })

  return result
})

const breadList = inject<Ref<Bread[]>>('breadList')

onMounted(() => {
  breadList.value = computedBreadList.value
})

watch(route, () => {
  breadList.value = computedBreadList.value
})
</script>

<template>
  <ABreadcrumb class="breadcrumb">
    <ABreadcrumbItem
      v-for="(item, index) in breadList"
      :key="item.name"
    >
      <RouterLink
        v-if="index === 0 || !item.hasChildren && index !== breadList.length - 1"
        :to="{ path: item.path === '' ? '/' : item.path, query: item.query }"
      >
        {{ item.translatedName() }}
      </RouterLink>
      <span v-else-if="item.hasChildren">{{ item.translatedName() }}</span>
      <span v-else>{{ item.translatedName() }}</span>
    </ABreadcrumbItem>
  </ABreadcrumb>
</template>

<style scoped>
</style>
