import type { Theme } from '@uozi-admin/layout-antdv'
import { useColorMode } from '@vueuse/core'
import enUS from 'antdv-next/locale/en_US'
import zhCN from 'antdv-next/locale/zh_CN'
import gettext from '~/language/gettext'

export const useSettingsStore = defineStore('settings', () => {
  const language = ref('zh_CN')
  const theme = useColorMode({
    initialValue: 'auto',
  }) as unknown as Ref<Theme>
  const preference_theme = ref<Theme>('auto')

  const isDark = computed(() => {
    return theme.value === 'dark'
  })

  const antdLanguage = computed(() => {
    return language.value === 'zh_CN' ? zhCN : enUS
  })

  function setLanguage(lang: string) {
    language.value = lang
    gettext.current = lang
  }
  function setTheme(t: Theme) {
    theme.value = t
  }
  function setPreferenceTheme(t: Theme) {
    preference_theme.value = t
  }

  return {
    antdLanguage,
    language,
    theme,
    preference_theme,
    isDark,
    setLanguage,
    setTheme,
    setPreferenceTheme,
  }
}, {
  persist: true,
})
