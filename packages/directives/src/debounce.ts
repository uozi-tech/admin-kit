import type { Directive } from 'vue'

export const vDebounce: Directive = {
  mounted(el, binding) {
    let timeout: number | null = null
    const delay = Number(binding.arg) || 300 // 默认300ms延迟

    const handler = () => {
      if (binding.value)
        binding.value()
    }

    el.addEventListener('click', () => {
      if (timeout)
        clearTimeout(timeout)

      timeout = setTimeout(handler, delay)
    })
  },
}
