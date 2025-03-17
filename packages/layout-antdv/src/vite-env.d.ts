/// <reference types="vite/client" />
import type { Text } from './props'
// src/types/vue-router.d.ts
import 'vue-router'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

/**
 * @description Extend the types of router meta
 */

declare module 'vue-router' {
  interface RouteMeta {
    title: Text
    breadcrumb?: Text
    lastRouteName?: string
  }
}
