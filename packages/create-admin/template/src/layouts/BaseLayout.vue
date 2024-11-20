<script setup lang="ts">
import {RouteRecordRaw, RouterView} from 'vue-router'
import { AdminLayout, SidebarItem } from '@uozi-admin/layout-antdv'
import gettext from '~/language/gettext'
import { routes } from '~/router'
import { computed } from 'vue'

const route = useRoute()

const settings = useSettingsStore()

const languageAvailable = gettext.available

function toggleTheme(t: 'auto' | 'light' | 'dark') {
  settings.setTheme(t)
}
function changeLanguage(l: string) {
  settings.setLanguage(l)
}

function getSidebarTree(routes?: RouteRecordRaw[]): SidebarItem[] {
  if (!routes) return []

  return routes.map<SidebarItem>(r => ({
    title: r.meta?.title as any,
    path: r.path,
    icon: r.meta?.icon,
    children: getSidebarTree(r.children)
  }))
}

const sidebarItems = computed<SidebarItem[]>(() => {
  return getSidebarTree(routes[0].children)
})
console.log(sidebarItems)
</script>

<template>
  <AdminLayout
    :sidebar-items="sidebarItems"
    :languages="languageAvailable"
    :current-language="gettext.current"
    :page-title="route.meta.title"
    @toggle-theme="toggleTheme"
    @change-language="changeLanguage"
  >
    <RouterView v-slot="{ Component, route }">
      <component
        :is="Component"
        :key="route.path"
      />
    </RouterView>
  </AdminLayout>
</template>

<style scoped>

</style>
