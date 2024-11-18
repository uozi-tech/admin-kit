import { defineStore } from 'pinia'
import gettext from '~/language/gettext'

export const useSettingsStore = defineStore('settings', () => {
  const language = ref('')
  const theme = ref<'auto' | 'light' | 'dark'>('light')
  const preference_theme = ref<'auto' | 'light' | 'dark'>('auto')
  const copyright = ref('')

  const isDark = computed(() => {
    return theme.value === 'dark'
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
