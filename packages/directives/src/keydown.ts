// packages/directives/src/keydownDirective.ts
import type { Directive } from 'vue'

type Handler = (e: KeyboardEvent) => any

export const keydownDirective: Directive<HTMLElement & { _keydownHandler: Handler }, Handler> = {
  mounted(el, binding) {
    const key = binding.arg || 'enter' // 默认捕获 Enter 键
    const handler = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === key.toLowerCase())
        binding.value(event)
    }
    el.addEventListener('keydown', handler)
    el._keydownHandler = handler
  },
  unmounted(el) {
    el.removeEventListener('keydown', el._keydownHandler)
  },
}
