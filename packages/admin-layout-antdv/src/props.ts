import { VNode } from 'vue'

export type Title = string | (() => string)

export interface BreadcrumbItem {
  title: Title
  path: string
  icon?: VNode
  children?: BreadcrumbItem[]
}

export interface SidebarItem {
  title: Title
  path: string
  icon?: VNode
  children?: SidebarItem[]
}
