<script setup lang="ts">
import { theme } from 'ant-design-vue'
import { useSettingsStore } from './store'
import gettext from './gettext'
import zh_CN from 'ant-design-vue/es/locale/zh_CN'
import en_US from 'ant-design-vue/es/locale/en_US'
import { computed } from 'vue'

const settings = useSettingsStore()

const lang = computed(() => {
  switch (gettext.current) {
    case 'zh_CN':
      return zh_CN
    default:
      return en_US
  }
})
</script>

<template>
  <AConfigProvider
    :theme="{
      algorithm: settings.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }"
    :auto-insert-space-in-button="false"
    :locale="lang"
  >
    <div class="app-container">
      <RouterView />
    </div>
  </AConfigProvider>
</template>

<style scoped>
</style>
