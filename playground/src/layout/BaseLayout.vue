<script setup lang="ts">
import type { SidebarItem, Theme } from '@uozi-admin/layout-antdv'
import { AdminLayout } from '@uozi-admin/layout-antdv'
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { routes } from '~/router'
import { useSettingsStore } from '~/store'
import gettext from '../gettext'

const settings = useSettingsStore()

const languageAvailable = gettext.available

function toggleTheme(t: Theme) {
  settings.set_theme(t)
}
function changeLanguage(l: string) {
  settings.set_language(l)
}

const sidebarItems = computed<SidebarItem[]>(() => {
  return routes[0].children?.map((r) => {
    return {
      title: r.meta?.title,
      path: r.path,
      icon: r.meta?.icon,
      children: r.children?.map((c) => {
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
    <template #logo>
      <div class="flex items-center">
        <span class="text-lg font-bold">Uozi Admin</span>
      </div>
    </template>

    <template #page-header-extra>
      <AButton>
        Page Header Extra
      </AButton>
    </template>

    <!-- <template #breadcrumb-item="item">
      {{ item }}
    </template> -->

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
