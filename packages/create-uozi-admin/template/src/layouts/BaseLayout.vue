<script setup lang="ts">
import type { SidebarItem, Theme } from '@uozi-admin/layout-antdv'
import type { RouteRecordRaw } from 'vue-router'
import { AdminLayout } from '@uozi-admin/layout-antdv'
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import gettext from '~/language/gettext'
import { routes } from '~/router'
import { useSettingsStore } from '~/store'

const route = useRoute()

const settings = useSettingsStore()

const languageAvailable = gettext.available

function toggleTheme(t: Theme) {
  settings.setTheme(t)
}
function changeLanguage(l: string) {
  settings.setLanguage(l)
}

function getSidebarTree(routes?: RouteRecordRaw[]): SidebarItem[] {
  if (!routes)
    return []

  return routes.map<SidebarItem>(r => ({
    title: r.meta?.title as any,
    path: r.path,
    icon: r.meta?.icon,
    children: getSidebarTree(r.children),
  }))
}

const sidebarItems = computed<SidebarItem[]>(() => {
  return getSidebarTree(routes[0].children)
})
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
    <RouterView v-slot="{ Component, route: r }">
      <component
        :is="Component"
        :key="r.path"
      />
    </RouterView>
  </AdminLayout>
</template>

<style scoped>

</style>
