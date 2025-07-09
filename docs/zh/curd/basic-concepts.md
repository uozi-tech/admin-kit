# 基础概念

本节介绍 CURD 组件库中的一些基本概念。

## 列配置 (Column)

列配置是 CURD 的核心概念,用于定义数据如何展示、编辑和搜索。

```ts
interface StdTableColumn {
  title: string // 列标题
  dataIndex: string // 数据字段名
  search?: boolean | SearchConfig // 搜索配置
  edit?: EditConfig // 编辑配置
  customRender?: (args: RenderArgs) => VNode | string // 自定义渲染
}
```

更多配置项请参考[列配置](/zh/curd/core/column)章节。

## 表单控件 (FormControl)

表单控件用于数据的输入和编辑,支持多种类型:

```ts
type FormControlType =
  | 'input' // 文本输入
  | 'password' // 密码输入
  | 'inputNumber' // 数字输入
  | 'select' // 下拉选择
  | 'selector' // 选择器
  | 'date' // 日期选择
  | 'datetime' // 日期时间选择
  | 'year' // 年份选择
  | 'month' // 月份选择
  | 'week' // 周选择
  | 'time' // 时间选择
  | 'textarea' // 文本区域
  | 'radioGroup' // 单选框
  | 'checkboxGroup' // 多选框
  | 'switch' // 开关
  | 'rate' // 评分
  | 'slider' // 滑块
  | 'upload' // 上传
  | 'cascader' // 级联选择
  | 'transfer' // 穿梭框
  | 'dateRange' // 日期范围选择
  | 'datetimeRange' // 日期时间范围选择
  | 'yearRange' // 年份范围选择
  | 'monthRange' // 月份范围选择
  | 'weekRange' // 周范围选择
  | 'timeRange' // 时间范围选择
  | ((formData: any, column: StdTableColumn, config: Record<any, any>) => VNode | JSX.Element) // 自定义函数组件
  | JSX.Element // 自定义 JSX 组件
  | DefineComponent<any, any, any> // 自定义 Vue 组件
```

更多配置项请参考[表单控件](/zh/curd/core/form)章节。

## API 接口

标准的 CRUD 接口定义:

```ts
interface StdApi {
  // 获取列表数据
  getList: (params: Record<string, any>) => Promise<{
    data: any[]
    pagination?: {
      total: number
      current: number
      pageSize: number
    }
  }>

  // 获取单条数据
  getItem: (id: string | number) => Promise<any>

  // 创建数据
  createItem: (data: Record<string, any>) => Promise<any>

  // 更新数据
  updateItem: (id: string | number, data: Record<string, any>) => Promise<any>

  // 删除数据
  deleteItem: (id: string | number) => Promise<any>
}
```

## 组件层级

CURD 组件的层级结构:

```
StdCurd (顶层容器)
├── StdSearch (搜索表单)
├── StdTable (数据表格)
├── StdForm (编辑表单)
└── StdDetail (数据详情/可编辑详情)
```

每个组件既可以在 StdCurd 中使用，也可以单独使用：
- **StdDetail**: 支持查看和编辑两种模式，可用于构建独立的详情页面

## 数据流

CURD 组件的数据流向:

1. **查询流程**
   - 用户输入搜索条件
   - 触发 `getList` 接口
   - 更新表格数据

2. **编辑流程**
   - 打开编辑表单
   - 调用 `getItem` 获取详情
   - 用户修改表单
   - 提交触发 `updateItem`
   - 刷新表格数据

3. **新增流程**
   - 打开新增表单
   - 用户填写表单
   - 提交触发 `createItem`
   - 刷新表格数据

4. **删除流程**
   - 用户确认删除
   - 触发 `deleteItem`
   - 刷新表格数据

## 状态管理

CURD 组件内部管理以下状态:

- 搜索条件
- 分页信息
- 排序参数
- 表格数据
- 表单数据
- 加载状态
- 选中行

## 下一步

- 了解 [列配置](/zh/curd/core/column) 的详细用法
- 查看 [表单配置](/zh/curd/core/form) 的完整选项
- 探索 [搜索表单](/zh/curd/core/search) 的完整选项
- 了解 [API 接口](/zh/curd/core/api) 的要求
