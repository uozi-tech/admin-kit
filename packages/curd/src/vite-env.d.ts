/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare module 'scroll-into-view-if-needed' {
  export default function scrollIntoViewIfNeeded(node: Element, options?: {
    scrollMode?: 'always' | 'if-needed'
    block?: 'start' | 'center' | 'end' | 'nearest'
    inline?: 'start' | 'center' | 'end' | 'nearest'
    behavior?: 'auto' | 'smooth'
  }): void
}
