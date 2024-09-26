<script setup lang="ts">
import { theme } from 'ant-design-vue'
import { useSettingsStore } from './store'

const settings = useSettingsStore()
</script>

<template>
  <AConfigProvider
    :theme="{
      algorithm: settings.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }"
    :auto-insert-space-in-button="false"
  >
    <div class="app-container">
      <RouterView />
    </div>
  </AConfigProvider>
</template>

<style scoped>
</style>
