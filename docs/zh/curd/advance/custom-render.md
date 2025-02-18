# 自定义渲染

CURD 组件支持自定义单元格、表头和操作列的渲染。

## 单元格渲染

通过 `customRender` 自定义单元格内容:

```ts
const columns: StdTableColumn[] = [
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ text, record }) => {
      return h(Tag, {
        color: record.status === 1 ? 'success' : 'error'
      }, () => text === 1 ? '启用' : '禁用')
    }
  }
]
```

渲染函数接收以下参数:

```ts
interface RenderContext {
  text: any // 单元格数据
  record: any // 行数据
  index: number // 行索引
  column: StdColumn // 列配置
}
```

## 表头渲染

通过 `customHeaderRender` 自定义表头内容:

```ts
const columns: StdTableColumn[] = [
  {
    title: '操作',
    dataIndex: 'actions',
    customHeaderRender: ({ column }) => {
    return h('div', {
      class: 'flex items-center'
    }, [
      h('span', '操作'),
      h(Tooltip, {
        title: '提示信息'
      }, () => h(QuestionCircleOutlined))
    ])
  }
]
```

## 操作列渲染

通过插槽自定义操作列:

```vue
<template>
  <StdTable>
    <template #beforeActions="{ record }">
      <Button @click="handleCustomAction(record)">
        自定义操作
      </Button>
    </template>
  </StdTable>
</template>
```

## 常见示例

### 图片渲染

```ts
const columns: StdTableColumn[] = [
  {
    title: '头像',
    dataIndex: 'avatar',
    customRender: ({ text }) => h('img', {
      src: text,
      class: 'w-10 h-10 rounded-full'
    })
  }
]
```

### 链接渲染

```ts
const columns: StdTableColumn[] = [
  {
    title: '链接',
    dataIndex: 'url',
    customRender: ({ text }) => h('a', {
      href: text,
      target: '_blank'
    }, text)
  }
]
```

### 标签渲染

```ts
const columns: StdTableColumn[] = [
  {
    title: '标签',
    dataIndex: 'tags',
    customRender: ({ text }) => {
    return text.map(tag => h(Tag, {
      color: tag.color
    }, () => tag.name))
  }
]
```

### 按钮渲染

```ts
const columns: StdTableColumn[] = [
  {
    title: '操作',
    dataIndex: 'actions',
    customRender: ({ record }) => {
      return [
        h(Button, {
          type: 'link',
          onClick: () => handleView(record)
        }, '查看'),
        h(Button, {
          type: 'link',
          danger: true,
          onClick: () => handleDelete(record)
        }, '删除')
      ]
    }
  }
]
```
