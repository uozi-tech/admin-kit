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

## Breadcrumb

面包屑导航组件，用于显示当前页面在网站层级结构中的位置。

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 面包屑项配置 | `AppBreadcrumbItem[]` | 根据路由自动生成 |

### AppBreadcrumbItem 类型

```ts
interface AppBreadcrumbItem {
  title: string | (() => string) // 显示的标题
  path: string  // 链接路径
  icon?: any    // 图标
  lastRouteName?: string | (() => string) // 上一级路由名称
}
```

### 路由配置

面包屑会自动从路由配置中获取数据。您可以在路由的 meta 中配置以下属性：

```ts
{
  meta: {
    title: '页面标题',      // 页面标题，也用于面包屑
    breadcrumb: '自定义标题', // 面包屑中显示的自定义标题（可选）
    lastRouteName: 'home'  // 上一级路由名称（可选）
  }
}
```

### Composables

您可以使用 `useBreadcrumbs()` 直接获取和修改面包屑：

```ts
import { useBreadcrumbs } from '@uozi-admin/layout-antdv'

// 在组件中使用
const breadcrumbs = useBreadcrumbs()

// 修改面包屑
breadcrumbs.value = [
  { title: '首页', path: '/' },
  { title: '产品列表', path: '/products' },
  { title: '产品详情', path: '/products/1' }
]
```

### 插槽

| 插槽名 | 说明 | 插槽参数 |
| --- | --- | --- |
| default | 自定义面包屑项内容 | `{ item: AppBreadcrumbItem }` |

### 使用示例

```vue
<template>
  <Breadcrumb :items="customItems">
    <template #default="{ item }">
      <!-- 自定义面包屑项渲染 -->
      <CustomIcon :icon="item.icon" />
      {{ item.title }}
    </template>
  </Breadcrumb>
</template>
```
