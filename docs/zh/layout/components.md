# 组件

## AdminLayout

主布局组件，包含侧边栏、顶部栏和内容区域。

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| siteTitle | 站点标题 | `string \| (() => string)` | 'Admin Dashboard' |
| pageTitle | 页面标题 | `string \| (() => string)` | - |
| copyright | 版权信息 | `string \| (() => string)` | - |
| logo | Logo 图片地址 | `string` | - |
| showPageHeader | 是否显示页面头部 | `boolean` | `true` |
| showBreadcrumb | 是否显示面包屑 | `boolean` | `true` |
| breadcrumbItems | 面包屑配置 | `BreadcrumbItem[]` | - |
| sidebarItems | 侧边栏菜单配置 | `SidebarItem[]` | `[]` |
| showFooter | 是否显示底部 | `boolean` | `true` |
| showThemeSwitch | 是否显示主题切换 | `boolean` | `true` |
| currentTheme | 当前主题 | `'light' \| 'dark' \| 'auto'` | - |
| showLanguageSelect | 是否显示语言切换 | `boolean` | `true` |
| currentLanguage | 当前语言 | `string \| number` | - |
| languages | 可选语言配置 | `string[] \| Record<string, string \| number>` | `[]` |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| toggleTheme | 切换主题时触发 | `(theme: Theme) => void` |
| changeLanguage | 切换语言时触发 | `(language: string) => void` |
| menuSelect | 选择菜单项时触发 | `(key: string) => void` |
| sidebarCollapsed | 侧边栏展开/收起时触发 | `(collapsed: boolean) => void` |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 内容区域 |
| logo | 自定义 Logo 区域 |
| header-actions | 顶部栏右侧操作区 |
| footer-content | 自定义底部内容 |
| breadcrumb-items | 自定义面包屑项 |
| page-header-extra | 页面头部额外内容 |
