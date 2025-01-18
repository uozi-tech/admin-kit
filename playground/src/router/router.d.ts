import type { AntDesignOutlinedIconType } from '@ant-design/icons-vue/lib/icons/AntDesignOutlined'
import type { VNode } from 'vue'

export interface CustomRouteMeta {
  icon?: AntDesignOutlinedIconType | VNode
  title?: () => string
}

declare module 'vue-router' {
  interface RouteMeta extends CustomRouteMeta {
  }
}
