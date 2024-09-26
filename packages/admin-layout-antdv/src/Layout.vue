<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import AppSidebar from './components/AppSidebar.vue'
import PageHeader from './components/PageHeader.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import { BreadcrumbItem, Languages, LanguageValue, SidebarItem, Theme, Title } from './props.ts'

const emit = defineEmits(['toggleTheme', 'changeLanguage'])

withDefaults(
  defineProps<{
    siteTitle?: Title
    pageTitle?: string
    showPageHeader?: boolean
    showBreadcrumb?: boolean
    breadcrumbItems?: BreadcrumbItem[]
    sidebarItems?: SidebarItem[]
    selectedMenuKey?: string
    showFooter?: boolean
    showThemeSwitch?: boolean
    currentTheme?: Theme
    showLanguageSwitch?: boolean
    currentLanguage?: LanguageValue
    languages?: Languages
  }>(),
  {
    siteTitle: 'Admin Dashboard',
    showPageHeader: true,
    showBreadcrumb: true,
    breadcrumbItems: () => [],
    sidebarItems: () => [],
    selectedMenuKey: '',
    showFooter: true,
    showThemeSwitch: true,
    showLanguageSwitch: true,
    languages: () => [],
  },
)

const theme = ref('light')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  emit('toggleTheme', theme.value)
}

function changeLanguage(language: string) {
  console.log('Language switched to:', language)
  emit('changeLanguage', language)
}

function onMenuSelect(key: string) {
  console.log('Menu selected:', key)
}

function onSidebarCollapse(collapsed: boolean) {
  console.log('Sidebar collapsed:', collapsed)
}
</script>

<template>
  <ALayout
    class="layout-container min-h-screen"
    :class="theme"
  >
    <!-- Sidebar -->
    <AppSidebar
      :header-title="siteTitle"
      class="shadow-lg"
      :items="sidebarItems"
      :selected-key="selectedMenuKey"
      @select-menu-item="onMenuSelect"
      @collapse-sidebar="onSidebarCollapse"
    />
    <!-- Main Layout -->
    <ALayout>
      <ALayoutHeader class="z-10 shadow-sm p-inline-0!">
        <AppHeader
          :show-theme-switch="showThemeSwitch"
          :show-language-switch="showLanguageSwitch"
          :current-theme="theme"
          :current-language="currentLanguage"
          :languages="languages"
          @toggle-theme="toggleTheme"
          @change-language="changeLanguage"
        >
          <template #actions>
            <slot name="header-actions" />
          </template>
        </AppHeader>
      </ALayoutHeader>

      <ALayoutContent>
        <div class="flex flex-col gap-1 px-6 py-2 bg-base">
          <!-- Breadcrumb -->
          <Breadcrumb
            v-if="showBreadcrumb"
            :items="breadcrumbItems"
          >
            <slot name="breadcrumb-items" />
          </Breadcrumb>

          <!-- PageHeader -->
          <PageHeader
            v-if="showPageHeader"
            :page-title="pageTitle"
          >
            <slot name="pageheader-extra" />
          </PageHeader>
        </div>

        <!-- Main Content -->
        <div class="main-content p-4">
          <slot /> <!-- 插槽：页面内容 -->
        </div>
      </ALayoutContent>

      <!-- Footer -->
      <ALayoutFooter v-if="showFooter">
        <AppFooter>
          <slot name="footer-content" />
        </AppFooter>
      </ALayoutFooter>
    </ALayout>
  </ALayout>
</template>

<style scoped>
:deep(.ant-layout-header), :deep(.ant-layout-sider), :deep(.ant-layout-sider-trigger) {
  @apply bg-base text-color-base;
}
:deep(.ant-layout-sider .ant-menu-root) {
  border-inline-end: none !important;;
}
@media (orientation: landscape) {
  .layout-container {
    padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);
  }
}
</style>
