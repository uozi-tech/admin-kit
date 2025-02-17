<script setup lang="ts">
import { ConfigProvider, theme } from 'ant-design-vue'
import { configProviderKey } from 'ant-design-vue/es/config-provider/context'
import en_US from 'ant-design-vue/es/locale/en_US'
import zh_CN from 'ant-design-vue/es/locale/zh_CN'
import zh_HK from 'ant-design-vue/es/locale/zh_HK'
import zh_TW from 'ant-design-vue/es/locale/zh_TW'
import { computed, provide } from 'vue'
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

provide('key', configProviderKey)

provide(configProviderKey, {
  getPrefixCls(suffixCls: string | undefined, customizePrefixCls: string | undefined): string {
    return ''
  },
  iconPrefixCls: computed(() => 'anticon'),
  locale: computed(() => lang.value),
})
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
