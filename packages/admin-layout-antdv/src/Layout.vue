<template>
  <a-layout class="h-100svh!" :class="theme">
    <!-- Sidebar -->
      <AppSidebar
        class="shadow-lg"
        :menu-items="menuItems"
        :selected-key="selectedMenuKey"
        @selectMenuItem="onMenuSelect"
        @collapseSidebar="onSidebarCollapse"
      >
        <!-- 自定义 Logo 区域 -->
        <template #logo>
          <div class="logo">My Custom Logo</div>
        </template>
      </AppSidebar>
    <!-- Main Layout -->
    <a-layout>
      <a-layout-header class="z-10 shadow-sm p-inline-0!">
        <AppHeader
            :title="title"
            @toggleTheme="toggleTheme"
            @changeLanguage="changeLanguage"
        >
          <template #actions>
            <slot name="header-actions" />
          </template>
        </AppHeader>
      </a-layout-header>

      <a-layout-content>
        <div class="flex flex-col gap-2 px-6 py-4 bg-base">
        <!-- Breadcrumb -->
        <AppBreadcrumb v-if="showBreadcrumb" :items="breadcrumbItems">
          <slot name="breadcrumb-items" />
        </AppBreadcrumb>

        <!-- PageHeader -->
        <PageHeader v-if="showPageHeader" :pageTitle="pageTitle">
          <slot name="pageheader-extra" />
        </PageHeader>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <slot /> <!-- 插槽：页面内容 -->
        </div>
      </a-layout-content>

      <!-- Footer -->
      <a-layout-footer v-if="showFooter">
        <AppFooter>
          <slot name="footer-content" />
        </AppFooter>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import PageHeader from './components/PageHeader.vue';
import AppBreadcrumb from './components/AppBreadcrumb.vue';
import AppSidebar from './components/AppSidebar.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Admin Dashboard',
  },
  pageTitle: {
    type: String,
    default: 'Page Title',
  },
  showPageHeader: {
    type: Boolean,
    default: true,
  },
  showBreadcrumb: {
    type: Boolean,
    default: true,
  },
  breadcrumbItems: {
    type: Array,
    default: () => [],
  },
  menuItems: {
    type: Array,
    default: () => [],
  },
  selectedMenuKey: {
    type: String,
    default: '',
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
});

const theme = ref('light');

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}

function changeLanguage(language) {
  console.log('Language switched to:', language);
}

function onMenuSelect(key) {
  console.log('Menu selected:', key);
}

function onSidebarCollapse(collapsed) {
  console.log('Sidebar collapsed:', collapsed);
}
</script>

<style scoped>
.main-content {
  padding: 24px;
  min-height: 100%;
}

:deep(.ant-layout-header), :deep(.ant-layout-sider), :deep(.ant-layout-sider-trigger) {
  @apply bg-base text-color-base!;
}
</style>
