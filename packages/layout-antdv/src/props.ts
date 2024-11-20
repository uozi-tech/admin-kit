import type { AntdIconType } from '@ant-design/icons-vue/es/components/AntdIcon'
import type { Component, FunctionalComponent, VNode } from 'vue'

export type Text = string | (() => string)

export interface BreadcrumbItem {
  title: Text
  path: string
  icon?: AntdIconType | FunctionalComponent | Component
  children?: BreadcrumbItem[]
}

export interface SidebarItem {
  title: Text
  path: string
  icon?: VNode
  children?: SidebarItem[]
}

export type Theme = 'light' | 'dark'
export type LanguageValue = string | number
export type Languages = string[] | Record<string, LanguageValue>
