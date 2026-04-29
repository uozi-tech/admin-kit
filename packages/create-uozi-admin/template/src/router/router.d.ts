import type { Component } from 'vue'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string | (() => string)
    noNeedAuth?: boolean
    icon?: Component
    group?: string
    hidden?: boolean
    permissions?: string[]
  }
}
