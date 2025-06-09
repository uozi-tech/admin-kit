---
outline: deep
---

# 文档导航

欢迎来到 UOZI Admin 文档！本页面将帮助你快速找到所需的信息。

## 🗺️ 学习路径

### 🌟 新手入门（推荐顺序）

1. **[框架总览](/zh/overview)** - 了解整体架构和核心理念
2. **[入门指南](/zh/getting-started)** - 从零开始的完整教程
3. **[CLI 工具](/zh/cli/quick-start)** - 学会使用脚手架工具
4. **[Request 库](/zh/request/quick-start)** - 掌握 API 层的使用
5. **[CRUD 组件](/zh/curd/quick-start)** - 构建数据管理页面

### 🔧 进阶开发

1. **[布局系统](/zh/layout/quick-start)** - 自定义页面布局
2. **[表单控件](/zh/curd/form-controls/input)** - 丰富的表单组件
3. **[自定义渲染](/zh/curd/advance/custom-render)** - 高级定制功能
4. **[全局配置](/zh/curd/advance/global-config)** - 统一配置管理
5. **[国际化](/zh/curd/advance/i18n)** - 多语言支持

### 🎯 专业开发

1. **[项目结构](/zh/cli/project-structure)** - 最佳实践
2. **[共享配置](/zh/shared-config/quick-start)** - 开发工具配置
3. **[高级特性](/zh/curd/advance/custom-form-control)** - 自定义组件

## 📚 文档分类

### 🛠️ 开发工具

| 包名 | 描述 | 快速开始 |
|------|------|----------|
| `create-uozi-admin` | 项目脚手架 | [CLI 快速开始](/zh/cli/quick-start) |
| `@uozi-admin/shared-config` | 共享配置 | [配置快速开始](/zh/shared-config/quick-start) |

### 🎨 UI 组件

| 包名 | 描述 | 快速开始 |
|------|------|----------|
| `@uozi-admin/layout-antdv` | 布局组件 | [布局快速开始](/zh/layout/quick-start) |
| `@uozi-admin/curd` | CRUD 组件 | [CRUD 快速开始](/zh/curd/quick-start) |

### 🌐 数据层

| 包名 | 描述 | 快速开始 |
|------|------|----------|
| `@uozi-admin/request` | HTTP 请求库 | [Request 快速开始](/zh/request/quick-start) |

## 🔍 按功能查找

### 项目创建和配置
- [创建新项目](/zh/cli/quick-start)
- [项目结构说明](/zh/cli/project-structure)
- [Vite 配置](/zh/shared-config/vite-config)
- [插件配置](/zh/shared-config/plugins)

### API 和数据管理
- [HTTP 请求](/zh/request/quick-start#基础用法)
- [CRUD 接口](/zh/request/quick-start#crud-接口)
- [扩展 API](/zh/request/quick-start#扩展-crud-api)
- [请求拦截器](/zh/request/quick-start#拦截器)

### 页面和组件
- [CRUD 页面](/zh/curd/quick-start)
- [表格组件](/zh/curd/components/std-table)
- [表单组件](/zh/curd/components/std-form)
- [搜索组件](/zh/curd/components/std-search)
- [详情组件](/zh/curd/components/std-detail)

### 表单控件
- [输入框](/zh/curd/form-controls/input)
- [选择器](/zh/curd/form-controls/select)
- [日期选择](/zh/curd/form-controls/date)
- [数字输入](/zh/curd/form-controls/number)
- [开关](/zh/curd/form-controls/switch)
- [更多控件...](/zh/curd/form-controls/)

### 布局和主题
- [布局组件](/zh/layout/quick-start)
- [应用配置](/zh/layout/app-config)
- [主题定制](/zh/layout/theme)
- [国际化](/zh/layout/i18n)

### 高级功能
- [列定义](/zh/curd/core/column)
- [自定义渲染](/zh/curd/advance/custom-render)
- [自定义表单控件](/zh/curd/advance/custom-form-control)
- [全局配置](/zh/curd/advance/global-config)
- [国际化](/zh/curd/advance/i18n)

## 🎯 常见场景

### 我想要...

**创建一个新项目**
→ [CLI 快速开始](/zh/cli/quick-start)

**构建用户管理页面**
→ [入门指南](/zh/getting-started) → [CRUD 快速开始](/zh/curd/quick-start)

**自定义表格列显示**
→ [列定义](/zh/curd/core/column) → [自定义渲染](/zh/curd/advance/custom-render)

**添加搜索功能**
→ [搜索配置](/zh/curd/core/search) → [搜索组件](/zh/curd/components/std-search)

**自定义表单字段**
→ [表单配置](/zh/curd/core/form) → [表单控件](/zh/curd/form-controls/input)

**配置 API 接口**
→ [Request 快速开始](/zh/request/quick-start) → [API 配置](/zh/curd/core/api)

**自定义页面布局**
→ [布局快速开始](/zh/layout/quick-start) → [布局组件](/zh/layout/components)

**支持多语言**
→ [CRUD 国际化](/zh/curd/advance/i18n) → [布局国际化](/zh/layout/i18n)

**优化开发体验**
→ [共享配置](/zh/shared-config/quick-start) → [Vite 配置](/zh/shared-config/vite-config)

## 📖 文档约定

### 代码示例
- 所有示例都基于 TypeScript
- 使用 `~/` 表示 `src/` 目录
- 使用 Vue 3 Composition API

### 链接说明
- 🔗 内部链接指向本文档的其他页面
- 🌐 外部链接指向 GitHub 或其他网站
- 📁 文件路径使用等宽字体

### 图标含义
- 🚀 快速开始
- 🔧 配置相关
- 🎨 UI 和样式
- 📚 详细文档
- ⚠️ 注意事项
- 💡 提示和技巧

## 🤝 贡献文档

发现文档问题或想要改进？

- 📝 [编辑此页面](https://github.com/uozi-tech/admin-kit/edit/main/docs/zh/guide.md)
- 🐛 [报告问题](https://github.com/uozi-tech/admin-kit/issues)
- 💬 [参与讨论](https://github.com/uozi-tech/admin-kit/discussions)

---

**找不到你需要的信息？** 请查看 [框架总览](/zh/overview) 或 [入门指南](/zh/getting-started)。