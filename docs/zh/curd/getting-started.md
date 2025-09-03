---
outline: deep
---

# 快速开始

本指南将通过渐进式示例，帮助您快速掌握 CURD 组件库的使用方法。

## 📦 起步

### 安装依赖

::: code-group
```bash [pnpm (推荐)]
pnpm add @uozi-admin/curd @uozi-admin/request
```

```bash [npm]
npm install @uozi-admin/curd @uozi-admin/request
```

```bash [yarn]
yarn add @uozi-admin/curd @uozi-admin/request
```
:::

### 全局配置

在 `main.ts` 中添加配置：

```ts
import { createApp } from 'vue'
import { createCurdConfig } from '@uozi-admin/curd'
import App from './App.vue'

const app = createApp(App)

// 使用默认配置
app.use(createCurdConfig())

app.mount('#app')
```

## 📚 示例

### 第一个示例：只读表格

让我们从最简单的数据表格开始：

<demo vue="../demos/curd/getting-started/readonly-table.vue" />

### 第二个示例：添加搜索

为表格添加搜索功能：

<demo vue="../demos/curd/getting-started/with-search.vue" />

### 第三个示例：完整 CRUD

添加新增、编辑、删除功能：

<demo vue="../demos/curd/getting-started/full-crud.vue" />

### 第四个示例：高级定制

添加自定义渲染和高级功能：

<demo vue="../demos/curd/getting-started/advanced-custom.vue" />

## 📖 下一步学习

恭喜完成快速入门！现在您可以：

### 深入学习基础知识
- [核心概念](./fundamentals/concepts) - 理解设计理念和架构
- [配置指南](./fundamentals/configuration) - 掌握配置选项
- [使用示例](./fundamentals/examples) - 学习最佳实践

### 探索组件功能
- [StdCurd 组件](./components/std-curd) - 一站式解决方案详解
- [表单控件](./form-controls/basic-controls) - 丰富的表单控件

### 学习高级特性
- [自定义扩展](./advanced/customization) - 个性化定制
- [表单交互](./advanced/form-interactions) - 复杂表单逻辑

## 🆘 常见问题

### API 格式不匹配怎么办？

如果后端 API 格式与标准不符，可以自定义配置：

```ts
app.use(createCurdConfig({
  listApi: {
    paginationMap: {
      params: {
        current: 'page',
        pageSize: 'page_size'
      },
      response: {
        total: 'total',
        current: 'current_page'
      }
    }
  }
}))
```

### 如何自定义表单控件？

可以传入自定义 Vue 组件：

```ts
{
  title: '自定义字段',
  dataIndex: 'custom',
  edit: {
    type:MyCustomComponent
  }
}
```

### 需要更多帮助？

- 查看 [完整 API 文档](./api-reference)
- 浏览 [使用示例](./fundamentals/examples)
- 学习 [高级特性](./advanced/customization)

开始您的 CURD 开发之旅吧！🎉