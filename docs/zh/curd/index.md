# CURD 组件库

`@uozi-admin/curd` 是一个专为 Vue 3 + TypeScript 项目设计的企业级 CRUD 组件库。基于 Ant Design Vue，为后台管理系统提供完整、高效的数据管理解决方案。

## ✨ 核心特性

- **🚀 开箱即用** - 几行代码创建完整数据管理页面
- **🎯 统一配置** - 单一配置对象定义表格、搜索、表单
- **🔧 高度定制** - 支持自定义渲染、控件、验证规则
- **📱 响应式设计** - 自动适配不同屏幕尺寸
- **🌍 国际化支持** - 内置多语言支持

## 🚀 快速体验

```vue
<template>
  <StdCurd
    title="用户管理"
    :api="userApi"
    :columns="columns"
  />
</template>

<script setup lang="ts">
import { StdCurd } from '@uozi-admin/curd'
import { useCurdApi } from '@uozi-admin/request'

const userApi = useCurdApi('/users')
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    search: { type:'input' },
    edit: { type:'input', required: true }
  },
  {
    title: '邮箱', 
    dataIndex: 'email',
    edit: { type:'input', required: true }
  }
]
</script>
```

## 📚 文档导航

### 🔰 开始使用
- [快速开始](./getting-started) - 安装配置和第一个示例

### 📖 基础知识
- [核心概念](./fundamentals/concepts) - 设计理念和架构
- [配置指南](./fundamentals/configuration) - 列配置和API设置
- [使用示例](./fundamentals/examples) - 常见模式和最佳实践

### 🧩 组件参考
- [StdCurd](./components/std-curd) - 一站式解决方案
- [StdTable](./components/std-table) - 数据表格
- [StdForm](./components/std-form) - 表单组件
- [StdSearch](./components/std-search) - 搜索组件

### 🎛️ 表单控件
- [基础控件](./form-controls/basic-controls) - 输入框、文本域等
- [选择控件](./form-controls/selection-controls) - 下拉、单选、多选等
- [日期控件](./form-controls/date-controls) - 日期时间选择器
- [高级控件](./form-controls/advanced-controls) - 上传、开关、滑块等

### ⚡ 高级特性
- [自定义扩展](./advanced/customization) - 自定义渲染和控件
- [表单交互](./advanced/form-interactions) - 联动和验证
- [批量操作](./advanced/batch-operations) - 批量编辑删除
- [国际化](./advanced/internationalization) - 多语言配置

### 📋 API 参考
- [完整 API 文档](./api-reference) - 所有组件和配置选项

## 🎯 适用场景

- **后台管理系统** - 用户管理、权限配置、数据监控
- **内容管理系统** - 文章管理、分类管理、标签管理  
- **电商管理后台** - 商品管理、订单管理、会员管理
- **业务系统** - 客户管理、项目管理、财务管理

准备好开始了吗？从 [快速开始](./getting-started) 开始您的 CURD 之旅！