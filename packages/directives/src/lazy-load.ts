import type { Directive } from 'vue'

export const vLazyLoad: Directive = {
  mounted(el) {
    const loadImage = () => {
      el.src = el.dataset.src
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage()
          observer.unobserve(el)
        }
      })
    })

    observer.observe(el)
  },
}
