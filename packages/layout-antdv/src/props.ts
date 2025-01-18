import type { AntdIconType } from '@ant-design/icons-vue/es/components/AntdIcon'
import type { Component, FunctionalComponent, VNode } from 'vue'

export type Text = string | (() => string)

export interface AppBreadcrumbItem {
  title: Text
  path: string
  icon?: AntdIconType | FunctionalComponent | Component
  children?: AppBreadcrumbItem[]
}

export interface SidebarItem {
  title: Text
  path: string
  icon?: VNode
  children?: SidebarItem[]
}

export type Theme = 'auto' | 'light' | 'dark'
export type LanguageValue = string | number
export type Languages = string[] | Record<string, LanguageValue>
