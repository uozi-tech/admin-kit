<script setup lang="ts">
import { theme } from 'ant-design-vue'
import gettext from '~/language/gettext'
import { useSettingsStore } from '~/store'

const settingsStore = useSettingsStore()

gettext.current = settingsStore.language || 'zh_CN'

const watermarkFontColor = computed(() => {
  return settingsStore.isDark ? 'rgba(255, 255, 255, .06)' : 'rgba(0, 0, 0, .06)'
})
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
      :font="{ color: watermarkFontColor }"
    >
      <div class="bg-truegray-1 dark:bg-truegray-9">
        <RouterView />
      </div>
    </AWatermark>
  </AConfigProvider>
</template>
