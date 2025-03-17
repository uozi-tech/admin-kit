import type { Theme } from '@uozi-admin/layout-antdv'
import { defineStore } from 'pinia'
import gettext from '~/language/gettext'

export const useSettingsStore = defineStore('settings', () => {
  const language = ref('')
  const theme = ref<Theme>('light')
  const preference_theme = ref<Theme>('auto')

  const isDark = computed(() => {
    return theme.value === 'dark'
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
    language,
    theme,
    preference_theme,
    isDark,
    setLanguage,
    setTheme,
    setPreferenceTheme,
  }
})
