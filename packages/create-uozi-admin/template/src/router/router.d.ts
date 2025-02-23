import type { AntDesignOutlinedIconType } from 'ant-design-vue'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string | (() => string)
    noNeedAuth?: boolean
    icon?: AntDesignOutlinedIconType
    group?: string
    hidden?: boolean
    permissions?: string[]
  }
}
