<script setup lang="ts">
import { useSettingsStore } from '~/store'
import { theme } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'

const settingsStore = useSettingsStore()

const antdLang = computed(() => {
  return settingsStore.language === 'zh_CN' ? zhCN : enUS
})

</script>

<template>
  <AConfigProvider
    :theme="{
      algorithm: settingsStore.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }"
    :locale="antdLang"
    :auto-insert-space-in-button="false"
  >
    <AWatermark
      content="waterMark"
      :font="{color: 'rgba(0, 0, 0, .06)'}"
    >
      <RouterView />
    </AWatermark>
  </AConfigProvider>
</template>
