# 列配置

列配置是 CURD 组件的核心,用于定义如何展示和操作数据。

:::info
`StdTableColumn` 继承自 Ant Design Vue 的 `TableColumnType`，并添加了一些 CURD 特有的配置。
:::

## 基础配置

```ts
export interface StdTableColumn<T = any> extends Omit<TableColumnType, 'customRender'> {
  title: string | (() => string)
  dataIndex: string | string[]
  customHeaderRender?: CustomHeaderRenderFn
  pure?: boolean
  search?: boolean | StdFormConfig
  edit?: StdFormConfig
  customRender?: CustomRenderFn<T>
  hiddenInTable?: boolean
  hiddenInEdit?: boolean
  hiddenInAdd?: boolean
  hiddenInDetail?: boolean
  hiddenInExport?: boolean
}
```

## 搜索配置

通过 `search` 配置搜索表单:

```ts
{
  title: '用户名',
  dataIndex: 'username',
  // 简单配置
  search: true, // 默认使用 edit 配置

  // 或者自定义配置
  search: {
    type: 'input', // 搜索框类型
    formItem: {
      label: '用户名', // 表单标签
      rules: [] // 校验规则
    },
    input: { // 控件属性
      placeholder: '请输入'
    }
  }
}
```

## 编辑配置

通过 `edit` 配置编辑表单:

```ts
{
  title: '状态',
  dataIndex: 'status',
  edit: {
    // 表单控件类型
    type: 'select',

    // 表单项配置
    formItem: {
      label: '状态',
      required: true,
      rules: [
        { required: true, message: '请选择状态' }
      ]
    },

    // 控件属性
    select: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  }
}
```

## 自定义渲染

通过 `customRender` 自定义单元格渲染:

```ts
{
  title: '状态',
  dataIndex: 'status',
  customRender: ({ text, record }) => {
    return h(Tag, {
      color: record.status === 1 ? 'success' : 'error'
    }, () => text === 1 ? '启用' : '禁用')
  }
}
```

## 显示控制

控制列在不同场景下的显示:

```ts
{
  title: '备注',
  dataIndex: 'remark',
  // 在表格中隐藏
  hiddenInTable: true,
  // 在搜索表单中隐藏
  hiddenInSearch: true,
  // 在编辑表单中隐藏
  hiddenInForm: true,
  // 在详情页中隐藏
  hiddenInDetail: true
}
```

## 自定义布局

```ts
{
  // ...
  col: {
    // 配置同 ant-design-vue 的 Col 组件属性
    span: 12
  }
}
```

## 完整示例

```ts
const columns: StdColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
    fixed: 'left',
    search: true,
    edit: {
      type: 'input',
      formItem: {
        required: true
      }
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    align: 'center',
    search: {
      type: 'select',
      select: {
        options: [
          { label: '全部', value: '' },
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ]
      }
    },
    edit: {
      type: 'select',
      select: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ]
      }
    },
    customRender: ({ text }) => {
      return h(Tag, {
        color: text === 1 ? 'success' : 'error'
      }, () => text === 1 ? '启用' : '禁用')
    }
  }
]
```
