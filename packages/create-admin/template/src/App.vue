<script setup lang="ts">
import { theme } from 'ant-design-vue'

const settingsStore = useSettingsStore()
</script>

<template>
  <AConfigProvider
    :theme="{
      algorithm: settingsStore.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }"
    :locale="settingsStore.antdLanguage"
    :auto-insert-space-in-button="false"
  >
    <AWatermark
      content="waterMark"
      :font="{ color: 'rgba(0, 0, 0, .06)' }"
    >
      <div class="bg-truegray-1 dark:bg-truegray-9">
        <RouterView />
      </div>
    </AWatermark>
  </AConfigProvider>
</template>
