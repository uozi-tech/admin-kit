# 搜索配置

搜索配置用于定义数据的查询条件，支持多种搜索方式。

## 基础用法

最简单的搜索配置:

```ts
{
  title: '用户名',
  dataIndex: 'username',
  search: true // 默认使用 edit 配置控件
}
```

## 详细配置

可以指定搜索控件的类型和属性:

```ts
{
  title: '状态',
  dataIndex: 'status',
  search: {
    type: 'select',
    select: {
      options: [
        { label: '全部', value: '' },
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  }
}
```

## 日期范围

支持日期范围搜索:

```ts
{
  title: '创建时间',
  dataIndex: 'created_at',
  search: {
    type: 'dateRange',
    dateRange: {
      format: 'YYYY-MM-DD'
    }
  }
}
```

## 远程搜索

支持从接口获取搜索选项:

```ts
{
  title: '部门',
  dataIndex: 'department_id',
  search: {
    type: 'select',
    select: {
      remote: {
        api: () => fetch('/api/departments'),
        valueKey: 'id',
        labelKey: 'name'
      }
    }
  }
}
```

## 完整示例

```ts
const columns: StdColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    search: {
      type: 'input',
      input: {
        placeholder: '请输入用户名',
        allowClear: true
      }
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    search: {
      type: 'select',
      select: {
        options: [
          { label: '全部', value: '' },
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ],
        allowClear: true,
        placeholder: '请选择状态'
      }
    }
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    search: {
      type: 'dateRange',
      dateRange: {
        format: 'YYYY-MM-DD',
        placeholder: ['开始日期', '结束日期']
      }
    }
  }
]
```
