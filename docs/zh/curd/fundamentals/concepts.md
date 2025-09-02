# 核心概念

理解 CURD 组件库的核心设计理念和关键概念，这些是高效使用所有功能的基础。

## 🎯 设计理念

### 统一配置，多处复用

CURD 的核心理念是**一处定义，处处使用**。通过一个列配置对象，同时控制：

```mermaid
graph TD
    A[列配置] --> B[表格列显示]
    A --> C[搜索表单字段]  
    A --> D[编辑表单字段]
    A --> E[详情页显示]
    A --> F[批量编辑字段]
```

这避免了传统开发中表格、表单、搜索分别配置的重复工作。

### API 驱动的数据管理

```mermaid
sequenceDiagram
    participant U as 用户操作
    participant C as CURD组件
    participant A as API接口
    participant S as 数据源

    U->>C: 搜索数据
    C->>A: getList(params)
    A->>S: 查询数据库
    S->>A: 返回数据
    A->>C: 列表数据+分页
    C->>U: 展示表格

    U->>C: 编辑数据
    C->>A: getItem(id)
    A->>S: 查询详情
    S->>A: 返回详情
    A->>C: 详情数据
    C->>U: 展示表单
    
    U->>C: 提交修改
    C->>A: updateItem(id, data)
    A->>S: 更新数据库
    S->>A: 更新成功
    A->>C: 操作结果
    C->>U: 刷新列表
```

### 约定优于配置

采用合理的默认配置，减少样板代码，让开发者专注于业务逻辑。

### 渐进增强

从最简单的表格开始，逐步添加搜索、表单、自定义渲染等功能，学习成本低。

## 📋 核心概念详解

### 列配置 (StdTableColumn)

列配置是 CURD 最重要的概念，描述了数据的完整生命周期：

```ts
interface StdTableColumn {
  // 基础配置
  title: string                    // 列标题
  dataIndex: string | string[]     // 数据字段路径
  
  // 表格配置  
  width?: number                   // 列宽
  fixed?: 'left' | 'right'        // 固定列
  sorter?: boolean | Function      // 排序
  
  // 搜索配置
  search?: {
    control: FormControlType       // 搜索控件类型
    label?: string                 // 搜索标签
    options?: Array<{label: string, value: any}> // 选项数据
    placeholder?: string           // 占位符
  }
  
  // 表单配置
  form?: {
    control: FormControlType       // 表单控件类型
    required?: boolean             // 是否必填
    rules?: ValidationRule[]       // 验证规则
    defaultValue?: any             // 默认值
    disabled?: boolean             // 是否禁用
  }
  
  // 显示配置
  customRender?: (args: RenderArgs) => VNode | string  // 自定义渲染
  hide?: boolean                   // 是否隐藏列
}
```

#### 统一配置示例

```ts
const columns: StdTableColumn[] = [
  {
    title: '用户状态',
    dataIndex: 'status',
    
    // 📊 表格中显示：自定义渲染
    customRender: ({ value }) => {
      return value === 1 ? '✅ 启用' : '❌ 禁用'
    },
    
    // 🔍 搜索中使用：下拉选择
    search: {
      control: 'select',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    },
    
    // 📝 表单中使用：开关控件
    form: {
      control: 'switch',
      required: true,
      defaultValue: 1,
      checkedChildren: '启用',
      unCheckedChildren: '禁用'
    }
  }
]
```

### 表单控件 (FormControl)

表单控件定义了数据如何输入和编辑：

```ts
// 基础输入控件
type BasicControls = 
  | 'input'        // 文本输入框
  | 'password'     // 密码输入框  
  | 'textarea'     // 多行文本
  | 'inputNumber'  // 数字输入框

// 选择控件
type SelectControls =
  | 'select'       // 下拉选择
  | 'radioGroup'   // 单选按钮组
  | 'checkboxGroup'// 多选框组
  | 'cascader'     // 级联选择

// 日期时间控件
type DateControls =
  | 'date' | 'datetime' | 'time'
  | 'dateRange' | 'datetimeRange' | 'timeRange'

// 高级控件
type AdvancedControls = 
  | 'upload'       // 文件上传
  | 'switch'       // 开关
  | 'slider'       // 滑块
  | 'rate'         // 评分
```

### API 接口 (StdApi)

CURD 组件通过标准化的 API 接口与后端交互：

```ts
interface StdApi {
  // 📋 获取列表数据
  getList: (params: {
    [key: string]: any      // 搜索参数
    current?: number        // 当前页码
    pageSize?: number       // 每页条数
    sorter?: {
      field: string         // 排序字段
      order: 'ascend' | 'descend'  // 排序方向  
    }
  }) => Promise<{
    data: any[]             // 数据列表
    pagination: {
      total: number         // 总记录数
      current: number       // 当前页码
      pageSize: number      // 每页条数
    }
  }>

  // 📄 获取单条数据详情
  getItem: (id: string | number) => Promise<any>

  // ➕ 创建新数据
  createItem: (data: Record<string, any>) => Promise<any>

  // ✏️ 更新现有数据
  updateItem: (id: string | number, data: Record<string, any>) => Promise<any>

  // 🗑️ 删除数据
  deleteItem: (id: string | number) => Promise<any>
}
```

## 🏗️ 组件架构

### 组件层级结构

```
🏢 StdCurd (一站式解决方案)
├── 🔍 StdSearch (搜索表单)
├── 📊 StdTable (数据表格)
├── 📝 StdForm (编辑表单) 
├── 📄 StdDetail (详情页面)
└── 📃 StdPagination (分页组件)
```

### 使用方式对比

| 使用方式 | 适用场景 | 优势 | 劣势 |
|---------|---------|------|------|
| **StdCurd 一站式** | 标准 CRUD 页面 | 开箱即用，代码简洁 | 定制化有限 |
| **组合使用** | 复杂业务场景 | 高度灵活，完全控制 | 代码量较多 |

## 🔄 数据流转

理解数据在 CURD 组件中的流转过程：

```mermaid
graph TD
    A[用户操作] --> B{操作类型}
    
    B -->|搜索| C[StdSearch]
    C --> D[收集搜索参数]
    D --> E[调用 getList API]
    
    B -->|新增| F[StdForm 新增模式]
    F --> G[用户填写表单]
    G --> H[调用 createItem API]
    
    B -->|编辑| I[StdForm 编辑模式]
    I --> J[调用 getItem API]
    J --> K[表单回填数据]
    K --> L[用户修改表单]
    L --> M[调用 updateItem API]
    
    B -->|删除| N[确认删除]
    N --> O[调用 deleteItem API]
    
    E --> P[更新表格数据]
    H --> P
    M --> P
    O --> P
    
    P --> Q[StdTable 显示]
```

### 状态管理

CURD 组件内部自动管理以下状态，无需手动维护：

| 状态类型 | 说明 | 自动管理 |
|---------|------|---------|
| **列表数据** | 表格显示的数据 | ✅ |
| **搜索参数** | 当前搜索条件 | ✅ |
| **分页信息** | 当前页码、每页条数 | ✅ |
| **排序参数** | 排序字段和方向 | ✅ |
| **加载状态** | 数据加载中状态 | ✅ |
| **选中行** | 表格选中的行数据 | ✅ |
| **表单数据** | 表单的当前值 | ✅ |

## 🎨 定制化能力

### 渲染定制

```ts
const columns = [
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ value, record }) => {
      return h('span', { 
        class: value === 1 ? 'text-green' : 'text-red' 
      }, value === 1 ? '启用' : '禁用')
    }
  }
]
```

### 表单定制

```ts
const columns = [
  {
    title: '复杂字段',
    dataIndex: 'complex',
    form: {
      // 自定义 Vue 组件
      control: MyCustomComponent,
      // 或自定义渲染函数
      control: (formData, column, config) => {
        return h(MyComponent, { 
          modelValue: formData.complex,
          'onUpdate:modelValue': (val) => formData.complex = val
        })
      }
    }
  }
]
```

## 🚀 下一步

现在您已经理解了 CURD 的核心概念，可以继续学习：

- [配置指南](./configuration) - 掌握配置选项和技巧
- [使用示例](./examples) - 学习常见模式和最佳实践
- [组件参考](../components/std-curd) - 深入了解组件 API