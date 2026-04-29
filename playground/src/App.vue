<script setup lang="ts">
import { ConfigProvider, theme } from 'antdv-next'
// import { configProviderKey } from 'antdv-next/config-provider/context'
import en_US from 'antdv-next/locale/en_US'
import zh_CN from 'antdv-next/locale/zh_CN'
import zh_HK from 'antdv-next/locale/zh_HK'
import zh_TW from 'antdv-next/locale/zh_TW'
import { computed } from 'vue'
import gettext from './gettext'
import { useSettingsStore } from './store'

const settings = useSettingsStore()

const lang = computed(() => {
  switch (gettext.current) {
    case 'zh_CN':
      return zh_CN
    case 'zh_HK':
      return zh_HK
    case 'zh_TW':
      return zh_TW
    default:
      return en_US
  }
})

// provide('key', configProviderKey)

// provide(configProviderKey, {
//   getPrefixCls(): string {
//     return ''
//   },
//   iconPrefixCls: computed(() => 'anticon'),
//   locale: computed(() => lang.value),
// })
</script>

<template>
  <ConfigProvider
    :theme="{
      algorithm: settings.theme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }"
    :auto-insert-space-in-button="false"
    :locale="lang"
  >
    <div class="app-container">
      <RouterView />
    </div>
  </ConfigProvider>
</template>

<style scoped>
</style>
