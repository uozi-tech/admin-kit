# Column 定义

StdColumn 是 CURD 组件的核心配置,用于定义表格列和表单项的展示、编辑等行为。

## 基础属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 列标题 | string | - |
| dataIndex | 列数据字段名 | string | - |
| width | 列宽度 | number \| string | - |
| fixed | 列固定方向 | 'left' \| 'right' | - |
| align | 对齐方式 | 'left' \| 'center' \| 'right' | 'left' |

## 搜索配置

通过 `search` 属性配置搜索表单:

```ts
{
  title: '用户名',
  dataIndex: 'username',
  search: true // 开启搜索
}

// 或者自定义搜索表单配置
{
  title: '创建时间',
  dataIndex: 'created_at',
  search: {
    type: 'dateRange' // 使用日期范围选择器
  }
}
```

## 编辑配置

通过 `edit` 属性配置编辑表单:

```ts
{
  title: '用户名',
  dataIndex: 'username',
  edit: {
    type: 'input', // 表单控件类型
    formItem: { // antd form-item 配置
      required: true,
      rules: [{ required: true, message: '请输入用户名' }]
    },
    input: { // 控件属性配置
      maxLength: 20,
      placeholder: '请输入用户名'
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
  customRender: ({ text }) => {
    return text === 1 ? '启用' : '禁用'
  }
}
```

## 显示控制

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| hiddenInTable | 在表格中隐藏 | boolean | false |
| hiddenInSearch | 在搜索表单中隐藏 | boolean | false |
| hiddenInForm | 在编辑表单中隐藏 | boolean | false |
| hiddenInDetail | 在详情中隐藏 | boolean | false |
