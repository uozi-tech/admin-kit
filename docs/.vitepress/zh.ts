import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-Hans',
  description: '后台系统工具套件',
  themeConfig: {
    nav: nav(),

    sidebar: {
      '/zh/curd/': { base: '/zh/curd/', items: sidebarGuide() },
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

function nav() {
  return [
    {
      text: 'CURD',
      link: '/zh/curd/quick-start',
    },
    {
      text: 'Layout',
      link: '/zh/layout/quick-start',
    },
  ]
}

function sidebarGuide() {
  return [
    {
      text: '指南',
      base: '/zh/curd/',
      items: [
        { text: '快速开始', link: 'quick-start' },
        { text: 'Column 定义', link: 'std-column' },
      ],
    },
    {
      text: '标准组件',
      base: '/zh/curd/std-components/',
      items: [
        { text: 'StdCurd', link: 'std-curd' },
        { text: 'StdTable', link: 'std-table' },
        { text: 'StdDetail', link: 'std-detail' },
        { text: 'StdForm', link: 'std-form' },
        { text: 'StdSearch', link: 'std-search' },
      ],
    },
    {
      text: '表单组件',
      base: '/zh/curd/form-components/',
      items: [
        { text: 'Input', link: 'input' },
        { text: 'InputNumber', link: 'input-number' },
        { text: 'Password', link: 'password' },
        { text: 'Textarea', link: 'textarea' },
        { text: 'Checkbox', link: 'checkbox' },
        { text: 'Select', link: 'select' },
        { text: 'Selector', link: 'selector' },
        { text: 'Slider', link: 'slider' },
        { text: 'Switch', link: 'switch' },
        { text: 'Rate', link: 'rate' },
        { text: 'Cascader', link: 'cascader' },
        { text: 'Date', link: 'date' },
        { text: 'Datetime', link: 'datetime' },
        { text: 'Year', link: 'year' },
        { text: 'Month', link: 'month' },
        { text: 'Week', link: 'week' },
        { text: 'Time', link: 'time' },
        { text: 'DateRange', link: 'date-range' },
        { text: 'DatetimeRange', link: 'datetime-range' },
        { text: 'YearRange', link: 'year-range' },
        { text: 'MonthRange', link: 'month-range' },
        { text: 'WeekRange', link: 'week-range' },
        { text: 'TimeRange', link: 'time-range' },
      ],
    },
  ]
}
