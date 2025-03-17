<script setup lang="ts">
import type { SidebarItem, Theme } from '@uozi-admin/layout-antdv'
import type { RouteRecordRaw } from 'vue-router'
import { AdminLayout, getAppConfig } from '@uozi-admin/layout-antdv'
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

  return routes
    .filter((r) => {
      return !r.meta?.hidden
    })
    .map<SidebarItem>(r => ({
      title: r.meta?.title as any,
      name: r.name as string,
      path: r.path,
      icon: r.meta?.icon,
      children: getSidebarTree(r.children),
    }))
}

const sidebarItems = computed<SidebarItem[]>(() => {
  return getSidebarTree(routes[0].children)
})

const appConfig = getAppConfig()
const settingsStore = useSettingsStore()
</script>

<template>
  <AdminLayout
    :sidebar-items="sidebarItems"
    logo="/logo.svg"
    :current-theme="settingsStore.theme"
    :languages="languageAvailable"
    :current-language="settingsStore.language"
    :page-title="route.meta.title"
    show-footer
    :site-title="appConfig.siteTitle"
    :copyright="appConfig.copyright"
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
