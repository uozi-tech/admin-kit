import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    language: '',
    theme: 'light' as 'auto' | 'light' | 'dark',
    preference_theme: 'auto' as 'auto' | 'light' | 'dark',
    copyright: '',
  }),
  getters: {
    isDark(state) {
      return state.theme === 'dark'
    }
  },
  actions: {
    set_language(lang: string) {
      this.language = lang
    },
    set_theme(t: 'auto' | 'light' | 'dark') {
      this.theme = t
      document.body.setAttribute('class', t === 'dark' ? 'dark' : 'light')
    },
    set_preference_theme(t: 'auto' | 'light' | 'dark') {
      this.preference_theme = t
    },
    set_copyright(copyright: string) {
      this.copyright = copyright
    },
  },
})
