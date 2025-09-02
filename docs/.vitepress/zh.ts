import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-Hans',
  description: '后台系统工具套件',
  themeConfig: {
    nav: nav(),

    sidebar: {
      // '/zh/overview': { base: '/zh/', items: sidebarOverview() },
      // '/zh/getting-started': { base: '/zh/', items: sidebarGettingStarted() },
      // '/zh/guide': { base: '/zh/', items: sidebarGuideNav() },
      '/zh/curd/': { base: '/zh/curd/', items: sidebarGuide() },
      '/zh/request/': { base: '/zh/request/', items: sidebarRequest() },
      '/zh/layout/': { base: '/zh/layout/', items: sidebarLayout() },
      '/zh/cli/': { base: '/zh/cli/', items: sidebarCli() },
      '/zh/shared-config/': { base: '/zh/shared-config/', items: sidebarSharedConfig() },
    },

    // 搜索配置优化
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
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
      text: '指南',
      items: [
        { text: '框架总览', link: '/zh/overview' },
        { text: '入门指南', link: '/zh/getting-started' },
        { text: '文档导航', link: '/zh/guide' },
      ],
    },
    {
      text: 'CURD',
      link: '/zh/curd/',
      activeMatch: '/zh/curd/',
    },
    {
      text: '请求',
      link: '/zh/request/quick-start',
      activeMatch: '/zh/request/',
    },
    {
      text: '布局',
      link: '/zh/layout/quick-start',
      activeMatch: '/zh/layout/',
    },
    {
      text: '共享配置',
      link: '/zh/shared-config/quick-start',
      activeMatch: '/zh/shared-config/',
    },
    {
      text: '脚手架',
      link: '/zh/cli/quick-start',
      activeMatch: '/zh/cli/',
    },
    {
      text: '团队',
      link: '/zh/team',
      activeMatch: '/zh/team/',
    },
  ]
}

function sidebarGuide() {
  return [
    {
      text: '开始使用',
      items: [
        { text: '概述', link: '' },
        { text: '快速开始', link: 'getting-started' },
      ],
    },
    {
      text: '基础知识',
      items: [
        { text: '核心概念', link: 'fundamentals/concepts' },
        { text: '配置指南', link: 'fundamentals/configuration' },
        { text: '使用示例', link: 'fundamentals/examples' },
      ],
    },
    {
      text: '高级特性',
      items: [
        { text: '自定义扩展', link: 'advanced/customization' },
        { text: '表单交互', link: 'advanced/form-interactions' },
        { text: '批量操作', link: 'advanced/batch-operations' },
        { text: '国际化', link: 'advanced/internationalization' },
      ],
    },
    {
      text: '组件参考',
      items: [
        { text: 'StdCurd', link: 'components/std-curd' },
        { text: 'StdTable', link: 'components/std-table' },
        { text: 'StdForm', link: 'components/std-form' },
        { text: 'StdSearch', link: 'components/std-search' },
      ],
    },
    {
      text: '表单控件',
      items: [
        { text: '基础控件', link: 'form-controls/basic-controls' },
        { text: '选择控件', link: 'form-controls/selection-controls' },
        { text: '日期控件', link: 'form-controls/date-controls' },
        { text: '高级控件', link: 'form-controls/advanced-controls' },
      ],
    },
    // {
    //   text: 'API 参考',
    //   items: [
    //     { text: '完整 API 文档', link: 'api-reference' },
    //   ],
    // },
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
        { text: '应用配置', link: 'app-config' },
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

// function sidebarOverview() {
//   return [
//     {
//       text: '框架总览',
//       items: [
//         { text: '核心理念', link: 'overview#核心理念' },
//         { text: '核心包介绍', link: 'overview#核心包介绍' },
//         { text: '快速开始', link: 'overview#快速开始' },
//         { text: '学习路径', link: 'overview#学习路径' },
//         { text: '架构特点', link: 'overview#架构特点' },
//       ],
//     },
//   ]
// }

// function sidebarGettingStarted() {
//   return [
//     {
//       text: '入门指南',
//       items: [
//         { text: '学习目标', link: 'getting-started#学习目标' },
//         { text: '前置要求', link: 'getting-started#前置要求' },
//         { text: '创建项目', link: 'getting-started#第一步创建项目' },
//         { text: '项目结构', link: 'getting-started#项目结构' },
//         { text: '核心概念', link: 'getting-started#核心概念' },
//         { text: '构建页面', link: 'getting-started#第二步构建第一个页面' },
//         { text: '自定义样式', link: 'getting-started#第三步自定义样式' },
//         { text: '配置优化', link: 'getting-started#第四步配置和优化' },
//         { text: '下一步学习', link: 'getting-started#下一步学习' },
//       ],
//     },
//   ]
// }

// function sidebarGuideNav() {
//   return [
//     {
//       text: '文档导航',
//       items: [
//         { text: '学习路径', link: 'guide#学习路径' },
//         { text: '文档分类', link: 'guide#文档分类' },
//         { text: '按功能查找', link: 'guide#按功能查找' },
//         { text: '常见场景', link: 'guide#常见场景' },
//         { text: '文档约定', link: 'guide#文档约定' },
//       ],
//     },
//   ]
// }
