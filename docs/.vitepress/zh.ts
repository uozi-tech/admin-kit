import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-Hans',
  description: '后台系统工具套件',
  themeConfig: {
    nav: nav(),

    sidebar: {
      '/zh/curd/': { base: '/zh/curd/', items: sidebarGuide() },
      '/zh/request/': { base: '/zh/request/', items: sidebarRequest() },
      '/zh/layout/': { base: '/zh/layout/', items: sidebarLayout() },
      '/zh/cli/': { base: '/zh/cli/', items: sidebarCli() },
      '/zh/shared-config/': { base: '/zh/shared-config/', items: sidebarSharedConfig() },
    },

    editLink: {
      pattern: 'https://github.com/uozi-tech/admin-kit/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    footer: {
      message: '根据 Apache-2.0 许可发布。',
      copyright: '版权所有 © 2024-present Uozi Tech',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '页面导航',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'CURD',
      link: '/zh/curd/introduction',
      activeMatch: '/zh/curd/',
    },
    {
      text: 'Request',
      link: '/zh/request/quick-start',
      activeMatch: '/zh/request/',
    },
    {
      text: 'Layout',
      link: '/zh/layout/quick-start',
      activeMatch: '/zh/layout/',
    },
    {
      text: 'Shared Config',
      link: '/zh/shared-config/quick-start',
      activeMatch: '/zh/shared-config/',
    },
    {
      text: 'CLI',
      link: '/zh/cli/quick-start',
      activeMatch: '/zh/cli/',
    },
  ]
}

function sidebarGuide() {
  return [
    {
      text: '指南',
      items: [
        { text: '介绍', link: 'introduction' },
        { text: '快速开始', link: 'quick-start' },
        { text: '基础概念', link: 'basic-concepts' },
      ],
    },
    {
      text: '核心功能',
      items: [
        { text: '列配置', link: 'core/column' },
        { text: '表单配置', link: 'core/form' },
        { text: '搜索配置', link: 'core/search' },
        { text: '接口配置', link: 'core/api' },
      ],
    },
    {
      text: '进阶',
      items: [
        { text: '全局配置', link: 'advance/global-config' },
        { text: '自定义渲染', link: 'advance/custom-render' },
        { text: '自定义表单控件', link: 'advance/custom-form-control' },
        { text: '国际化', link: 'advance/i18n' },
      ],
    },
    {
      text: '核心组件',
      items: [
        { text: 'StdCurd', link: 'components/std-curd' },
        { text: 'StdDetail', link: 'components/std-detail' },
        { text: 'StdTable', link: 'components/std-table' },
        { text: 'StdForm', link: 'components/std-form' },
        { text: 'StdSearch', link: 'components/std-search' },
      ],
    },
    {
      text: '表单控件',
      items: [
        { text: '输入框', link: 'form-controls/input' },
        { text: '文本域', link: 'form-controls/textarea' },
        { text: '密码框', link: 'form-controls/password' },
        { text: '数字输入框', link: 'form-controls/number' },
        { text: '单选框', link: 'form-controls/radio-group' },
        { text: '复选框', link: 'form-controls/checkbox-group' },
        { text: '下拉列表选择器', link: 'form-controls/select' },
        { text: '表格列表选择器', link: 'form-controls/selector' },
        { text: '级联选择器', link: 'form-controls/cascader' },
        { text: '滑块', link: 'form-controls/slider' },
        { text: '评分', link: 'form-controls/rate' },
        { text: '开关', link: 'form-controls/switch' },
        { text: '日期选择器', link: 'form-controls/date' },
        { text: '日期范围选择器', link: 'form-controls/date-range' },
        { text: '日期时间选择器', link: 'form-controls/datetime' },
        { text: '日期时间范围选择器', link: 'form-controls/datetime-range' },
        { text: '时间选择器', link: 'form-controls/time' },
        { text: '时间范围选择器', link: 'form-controls/time-range' },
        { text: '月份选择器', link: 'form-controls/month' },
        { text: '月份范围选择器', link: 'form-controls/month-range' },
        { text: '周选择器', link: 'form-controls/week' },
        { text: '周范围选择器', link: 'form-controls/week-range' },
        { text: '年份选择器', link: 'form-controls/year' },
        { text: '年份范围选择器', link: 'form-controls/year-range' },
      ],
    },
  ]
}

function sidebarRequest() {
  return [
    {
      text: '指南',
      items: [
        { text: '快速开始', link: 'quick-start' },
      ],
    },
  ]
}

function sidebarLayout() {
  return [
    {
      text: '指南',
      items: [
        { text: '快速开始', link: 'quick-start' },
        { text: '组件', link: 'components' },
        { text: '主题配置', link: 'theme' },
        { text: '国际化', link: 'i18n' },
      ],
    },
  ]
}

function sidebarCli() {
  return [
    {
      text: '指南',
      items: [
        { text: '快速开始', link: 'quick-start' },
        { text: '项目结构', link: 'project-structure' },
        { text: '配置说明', link: 'configuration' },
      ],
    },
  ]
}

function sidebarSharedConfig() {
  return [
    {
      text: '指南',
      items: [
        { text: '快速开始', link: 'quick-start' },
        { text: 'Vite 配置', link: 'vite-config' },
        { text: '插件配置', link: 'plugins' },
      ],
    },
  ]
}
