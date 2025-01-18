import type { Theme } from '@uozi-admin/layout-antdv'
import { defineStore } from 'pinia'
import gettext from '../gettext'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    language: '',
    theme: 'light' as Theme,
    preference_theme: 'auto' as Theme,
    copyright: '',
  }),
  getters: {
    isDark(state) {
      return state.theme === 'dark'
    },
  },
  actions: {
    set_language(lang: string) {
      this.language = lang
      gettext.current = lang
    },
    set_theme(t: Theme) {
      this.theme = t
    },
    set_preference_theme(t: Theme) {
      this.preference_theme = t
    },
    set_copyright(copyright: string) {
      this.copyright = copyright
    },
  },
})
