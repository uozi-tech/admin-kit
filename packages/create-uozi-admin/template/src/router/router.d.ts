import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string | (() => string)
    needAuth?: boolean
    icon?: AntDesignOutlinedIconType
    group?: string
    hidden?: boolean
    permissions?: string[]
  }
}
