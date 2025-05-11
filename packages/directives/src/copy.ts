import type { Directive } from 'vue'

export const vCopy: Directive = {
  mounted(el, binding) {
    el.addEventListener('click', () => {
      const textToCopy = binding.value
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          // eslint-disable-next-line no-console
          console.log('Text copied to clipboard!')
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err)
        })
    })
  },
}
