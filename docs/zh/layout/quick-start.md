# Layout 快速开始

`@uozi-admin/layout-antdv` 是一个基于 Ant Design Vue 的后台布局组件库，提供了一套完整的后台管理系统布局解决方案。

## 特性

- 🎨 **开箱即用** - 提供完整的后台布局方案
- 🔧 **高度可配置** - 支持多种布局模式和主题
- 📱 **响应式设计** - 完美适配桌面和移动端
- 🌍 **国际化支持** - 内置多语言切换
- 🎯 **TypeScript** - 完整的类型定义
- 🚀 **性能优化** - 虚拟滚动和懒加载

## 安装

::: code-group
```bash [npm]
npm install @uozi-admin/layout-antdv
```

```bash [yarn]
yarn add @uozi-admin/layout-antdv
```

```bash [pnpm]
pnpm add @uozi-admin/layout-antdv
```
:::

## 基础用法

### 在线演示

#### 基础用法演示

<demo vue="../demos/layout/basic.vue" />

#### 高级用法演示

<demo vue="../demos/layout/advanced.vue" />

## 配置选项

### 基础配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `site-title` | `string` | - | 网站标题 |
| `sidebar-items` | `SidebarItem[]` | `[]` | 侧边栏菜单项 |
| `collapsed` | `boolean` | `false` | 是否折叠侧边栏 |
| `theme` | `'light' \| 'dark'` | `'light'` | 主题模式 |
| `layout-mode` | `'side' \| 'top' \| 'mix'` | `'side'` | 布局模式 |

### 侧边栏配置

```typescript
interface SidebarItem {
  title: string          // 菜单标题
  path?: string         // 路由路径
  icon?: VNode      // 图标组件
  children?: SidebarItem[]  // 子菜单
}
```

## 高级用法

### 自定义头部

```vue
<template>
  <AdminLayout :sidebar-items="sidebarItems">
    <template #header>
      <div class="custom-header">
        <a-space>
          <a-button type="primary">自定义按钮</a-button>
          <a-dropdown>
            <a-button>
              用户菜单
              <DownOutlined />
            </a-button>
            <template #popupRender>
              <a-menu>
                <a-menu-item>个人设置</a-menu-item>
                <a-menu-item>退出登录</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-space>
      </div>
    </template>
    
    <router-view />
  </AdminLayout>
</template>
```

## 下一步

- [布局配置](/zh/layout/configuration) - 了解详细配置选项
- [主题定制](/zh/layout/theming) - 学习如何定制主题
- [国际化](/zh/layout/i18n) - 多语言支持
