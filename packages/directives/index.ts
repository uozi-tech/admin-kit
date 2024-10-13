import { App } from 'vue'
import { vCopy } from './src/copy'
import { vDebounce } from './src/debounce'
import { vLazyLoad } from './src/lazy-load'

const directives = {
  install(app: App) {
    app.directive('copy', vCopy)
    app.directive('debounce', vDebounce)
    app.directive('lazyload', vLazyLoad)
  },
}

export {
  directives as default,
  vCopy,
  vDebounce,
  vLazyLoad
}
