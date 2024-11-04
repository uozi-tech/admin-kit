<script setup lang="ts">
import { RouterView } from 'vue-router'
import { AdminLayout, SidebarItem } from '@uozi-admin/layout-antdv'
import { useSettingsStore } from '../store'
import gettext from '../gettext'
import { routes } from '../router'
import { computed } from 'vue'

const settings = useSettingsStore()

const languageAvailable = gettext.available

function toggleTheme(t: 'auto' | 'light' | 'dark') {
  settings.set_theme(t)
}
function changeLanguage(l: string) {
  settings.set_language(l)
}

const sidebarItems = computed<SidebarItem[]>(() => {
  return routes[0].children?.map(r => {
    return {
      title: r.meta?.title,
      path: r.path,
      icon: r.meta?.icon,
      children: r.children?.map(c => {
        return {
          title: c.meta?.title,
          path: c.path,
          icon: c.meta?.icon,
        }
      }),
    }
  }) as SidebarItem[]
})
</script>

<template>
  <AdminLayout
    :sidebar-items="sidebarItems"
    :languages="languageAvailable"
    :current-language="gettext.current"
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
