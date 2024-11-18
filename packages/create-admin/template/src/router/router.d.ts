import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    needAuth?: boolean
    icon?: string
    group?: string
    hidden?: boolean
  }
}
