<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import AppSidebar from './components/AppSidebar.vue'
import PageHeader from './components/PageHeader.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import { BreadcrumbItem, SidebarItem, Title } from './props.ts'

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
  }>(),
  {
    siteTitle: 'Admin Dashboard',
    pageTitle: 'Page Title',
    showPageHeader: true,
    showBreadcrumb: true,
    breadcrumbItems: () => [],
    sidebarItems: () => [],
    selectedMenuKey: '',
    showFooter: true,
  },
)

const theme = ref('light')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function changeLanguage(language: string) {
  console.log('Language switched to:', language)
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
    class="h-100svh!"
    :class="theme"
  >
    <!-- Sidebar -->
    <AppSidebar
      class="shadow-lg"
      :items="sidebarItems"
      :selected-key="selectedMenuKey"
      @select-menu-item="onMenuSelect"
      @collapse-sidebar="onSidebarCollapse"
    >
      <!-- 自定义 Logo 区域 -->
      <template #logo>
        <div class="logo">
          My Custom Logo
        </div>
      </template>
    </AppSidebar>
    <!-- Main Layout -->
    <ALayout>
      <ALayoutHeader class="z-10 shadow-sm p-inline-0!">
        <AppHeader
          :header-title="siteTitle"
          @toggle-theme="toggleTheme"
          @change-language="changeLanguage"
        >
          <template #actions>
            <slot name="header-actions" />
          </template>
        </AppHeader>
      </ALayoutHeader>

      <ALayoutContent>
        <div class="flex flex-col gap-2 px-6 py-4 bg-base">
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
        <div class="main-content">
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
.main-content {
  padding: 24px;
  min-height: 100%;
}

:deep(.ant-layout-header), :deep(.ant-layout-sider), :deep(.ant-layout-sider-trigger) {
  @apply bg-base text-color-base!;
}
</style>
