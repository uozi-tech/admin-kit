import { Component, FunctionalComponent, VNode } from 'vue'
import { AntdIconType } from '@ant-design/icons-vue/es/components/AntdIcon'

export type Title = string | (() => string)

export interface BreadcrumbItem {
  title: Title
  path: string
  icon?: AntdIconType | FunctionalComponent | Component
  children?: BreadcrumbItem[]
}

export interface SidebarItem {
  title: Title
  path: string
  icon?: VNode
  children?: SidebarItem[]
}

export type Theme = 'light' | 'dark'
export type LanguageValue = string | number
export type Languages = string[] | Record<string, LanguageValue>
