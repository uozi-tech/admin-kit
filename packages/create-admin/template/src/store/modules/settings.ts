import gettext from '~/language/gettext'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'

export const useSettingsStore = defineStore('settings', () => {
  const language = ref('')
  const theme = ref<'auto' | 'light' | 'dark'>('light')
  const preference_theme = ref<'auto' | 'light' | 'dark'>('auto')
  const copyright = ref('')

  const isDark = computed(() => {
    return theme.value === 'dark'
  })

  const antdLanguage = computed(() => {
    return language.value === 'zh-CN' ? zhCN : enUS
  })

  function setLanguage(lang: string) {
    language.value = lang
    gettext.current = lang
  }
  function setTheme(t: 'auto' | 'light' | 'dark') {
    theme.value = t
  }
  function setPreferenceTheme(t: 'auto' | 'light' | 'dark') {
    preference_theme.value = t
  }
  function setCopyright(cp: string) {
    copyright.value = cp
  }

  return {
    antdLanguage,
    language,
    theme,
    preference_theme,
    copyright,
    isDark,
    setLanguage,
    setTheme,
    setPreferenceTheme,
    setCopyright,
  }
})
