<script setup lang="ts">
import type { AppBreadcrumbItem, Languages, LanguageValue, SidebarItem, Text, Theme } from '../props'
import { Layout, LayoutContent, LayoutFooter, LayoutHeader } from 'ant-design-vue'
import { provide, ref } from 'vue'
import { getRealTitle } from '../utils'
import AppFooter from './AppFooter.vue'
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
import Breadcrumb from './Breadcrumb.vue'
import LanguageSelect from './LanguageSelect.vue'
import PageHeader from './PageHeader.vue'
import ThemeSwitch from './ThemeSwitch.vue'

withDefaults(
  defineProps<{
    siteTitle?: Text
    pageTitle?: Text
    copyright?: Text
    logo?: string
    showPageHeader?: boolean
    showBreadcrumb?: boolean
    breadcrumbItems?: AppBreadcrumbItem[]
    sidebarItems?: SidebarItem[]
    showFooter?: boolean
    showThemeSwitch?: boolean
    currentTheme?: Theme
    showLanguageSelect?: boolean
    currentLanguage?: LanguageValue
    languages?: Languages
  }>(),
  {
    siteTitle: 'Admin Dashboard',
    showPageHeader: true,
    showBreadcrumb: true,
    showFooter: true,
    showThemeSwitch: true,
    showLanguageSelect: true,
    languages: () => [],
  },
)

const emit = defineEmits([
  'toggleTheme',
  'changeLanguage',
  'menuSelect',
  'sidebarCollapsed',
])

const sidebarDrawerVisible = ref(false)

function toggleTheme(t: Theme) {
  emit('toggleTheme', t)
}

function changeLanguage(language: string) {
  emit('changeLanguage', language)
}

function onMenuSelect(key: string) {
  emit('menuSelect', key)
}

function onSidebarCollapse(collapsed: boolean) {
  emit('sidebarCollapsed', collapsed)
}

const breadList = ref([])

provide('breadList', breadList)
</script>

<template>
  <Layout class="layout-container h-screen of-hidden">
    <!-- Sidebar -->
    <AppSidebar
      v-model:drawer-visible="sidebarDrawerVisible"
      :logo="logo"
      :header-title="siteTitle"
      :items="sidebarItems"
      @select-menu-item="onMenuSelect"
      @collapse-sidebar="onSidebarCollapse"
    >
      <template #logo="props">
        <slot
          name="logo"
          v-bind="props"
        />
      </template>
    </AppSidebar>

    <!-- Main Layout -->
    <Layout class="main-container">
      <LayoutHeader class="z-10 shadow-sm p-inline-0!">
        <AppHeader @click-un-fold="sidebarDrawerVisible = true">
          <LanguageSelect
            v-if="showLanguageSelect"
            :current-language="currentLanguage"
            :languages="languages"
            @change-language="changeLanguage"
          />
          <ThemeSwitch
            v-if="showThemeSwitch"
            :current-theme="currentTheme"
            @toggle-theme="toggleTheme"
          />
          <template #actions>
            <slot name="header-extra" />
          </template>
        </AppHeader>
      </LayoutHeader>

      <LayoutContent class="flex flex-col max-h-full of-auto">
        <div class="flex flex-col gap-1 px-6 py-2 page-header light:bg-base">
          <!-- Breadcrumb -->
          <Breadcrumb
            v-if="showBreadcrumb"
            :items="breadcrumbItems"
          >
            <template #default="item">
              <slot
                name="breadcrumb-item"
                :item="item"
              />
            </template>
          </Breadcrumb>

          <!-- PageHeader -->
          <PageHeader
            v-if="showPageHeader && pageTitle"
            :page-title="getRealTitle(pageTitle)"
          >
            <slot name="page-header-extra" />
          </PageHeader>
        </div>

        <!-- Main Content -->
        <div class="main-content p-4">
          <!-- 插槽：页面内容 -->
          <slot />
        </div>

        <!-- Footer -->
        <LayoutFooter v-if="showFooter">
          <AppFooter :copyright="getRealTitle(copyright)">
            <slot name="footer-content" />
          </AppFooter>
        </LayoutFooter>
      </LayoutContent>
    </Layout>
  </Layout>
</template>

<style scoped lang="less">
:deep(.ant-layout-header), :deep(.ant-layout-sider), :deep(.ant-layout-sider-trigger) {
  @apply bg-white bg-base text-color-base;
}
:deep(.ant-layout-sider .ant-menu-root) {
  border-inline-end: none !important;
}
@media (orientation: landscape) {
  .layout-container {
    padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);
  }
}
.dark {
  .page-header {
    background: #121212 !important;
    border-bottom: unset;

    h1 {
      color: #fafafa;
    }
  }
}
</style>
