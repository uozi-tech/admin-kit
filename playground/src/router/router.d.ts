import type { Component, VNode } from 'vue'

export interface CustomRouteMeta {
  icon?: Component | VNode
  title?: () => string
}

declare module 'vue-router' {
  interface RouteMeta extends CustomRouteMeta {
  }
}
