# StdCurd 组件

StdCurd 是一站式 CRUD 解决方案，集成了表格、搜索、表单等所有功能，适合快速构建标准的数据管理页面。

## 基础用法

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
    edit: { 
      type:'input', 
      formItem: { required: true } 
    }
  }
]
</script>
```

## 插槽（Slots）

### 页面结构插槽

StdCurd 提供了丰富的插槽来自定义页面的各个部分：

```vue
<template>
  <StdCurd
    :api="api"
    :columns="columns"
  >
    <!-- 标题区域插槽 -->
    <template #titleLeft>
      <span>左侧标题内容</span>
    </template>
    <template #title>
      <span>自定义标题</span>
    </template>
    <template #titleRight>
      <span>右侧标题内容</span>
    </template>

    <!-- 操作按钮区域插槽 -->
    <template #beforeListActions>
      <a-button>自定义按钮1</a-button>
    </template>
    <template #afterListActions>
      <a-button>自定义按钮2</a-button>
    </template>

    <!-- 卡片内容插槽 -->
    <template #beforeCardBody>
      <div>卡片内容前的自定义内容</div>
    </template>

    <!-- 表格相关插槽 -->
    <template #beforeTable>
      <div>表格前的自定义内容</div>
    </template>

    <!-- 操作列插槽 -->
    <template #beforeActions="{ record, column }">
      <a-button size="small" type="link">自定义操作</a-button>
    </template>
    <template #afterActions="{ record, column }">
      <a-button size="small" type="link">更多操作</a-button>
    </template>

    <!-- 表单相关插槽 -->
    <template #beforeForm="{ record }">
      <div>表单前的自定义内容</div>
    </template>
    <template #afterForm="{ record }">
      <div>表单后的自定义内容</div>
    </template>

    <!-- 自定义列渲染 -->
    <template #col-status="{ record, text }">
      <a-badge
        :status="text === 1 ? 'success' : 'error'"
        :text="text === 1 ? '启用' : '禁用'"
      />
    </template>
  </StdCurd>
</template>
```

### 透传的表格插槽

StdCurd 会自动透传所有以 `col-` 开头的插槽到内部的 StdTable 组件，用法与 StdTable 相同。

#### 自定义列渲染

使用 `#col-{dataIndex}` 格式的插槽来自定义特定列的渲染：

```vue
<template #col-username="{ record, text, value, column, index }">
  <a-tag color="blue">{{ text }}</a-tag>
</template>
```

具体使用参考 [StdTable 自定义列渲染](/zh/curd/components/std-table#自定义列渲染)。

### 插槽参数

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| titleLeft | - | 标题左侧内容 |
| title | - | 自定义标题 |
| titleRight | - | 标题右侧内容 |
| beforeListActions | - | 列表操作按钮前的内容 |
| afterListActions | - | 列表操作按钮后的内容 |
| beforeCardBody | - | 卡片内容前的自定义内容 |
| beforeTable | - | 表格前的自定义内容 |
| beforeActions | `{ record, column }` | 操作列前的自定义操作 |
| afterActions | `{ record, column }` | 操作列后的自定义操作 |
| beforeForm | `{ record }` | 表单前的自定义内容 |
| afterForm | `{ record }` | 表单后的自定义内容 |
| col-\{dataIndex\} | `{ record, text, value, column, index }` | 自定义列渲染 |

## 演示示例

<demo vue="../demos/curd/components/std-curd.vue" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| **基础配置** | | | |
| title | 页面标题 | string \| (() => string) | - |
| api | API 接口对象 | CurdApi | - |
| columns | 列配置 | StdTableColumn[] | - |
| rowKey | 行数据的 Key | string | 'id' |
| **组件属性** | | | |
| detailProps | 详情描述组件属性 | DescriptionsProps | - |
| formRowProps | 表单行属性 | RowProps | `{ gutter: 16 }` |
| tableProps | 表格组件属性 | TableProps | - |
| **表格选择** | | | |
| rowSelectionType | 选择类型 | 'checkbox' \| 'radio' | - |
| rowSelection | 表格行选择配置 | TableRowSelection | - |
| **滚动配置** | | | |
| scrollX | 表格横向滚动 | number \| string | - |
| scrollY | 表格纵向滚动 | number \| string | - |
| **查询参数** | | | |
| customQueryParams | 自定义查询参数 | Record<string, any> | - |
| overwriteParams | 覆盖查询参数 | Record<string, any> | - |
| **模态框配置** | | | |
| modalWidth | 模态框宽度 | string \| number | - |
| formClass | 表单样式类 | string \| string[] \| Record<string, boolean> | - |
| **功能开关** | | | |
| disableRouterQuery | 禁用路由查询 | boolean | false |
| disableSearch | 禁用搜索功能 | boolean | false |
| disableAdd | 禁用新增功能 | boolean | false |
| disableView | 禁用查看功能 | boolean | false |
| disableEdit | 禁用编辑功能 | boolean | false |
| disableDelete | 禁用删除功能 | boolean | false |
| disableExport | 禁用导出功能 | boolean | false |
| disableTrash | 禁用回收站功能 | boolean | false |
| **UI 显示控制** | | | |
| hideResetBtn | 隐藏重置按钮 | boolean | false |
| showSearchBtn | 显示搜索按钮 | boolean | false |
| hideTitle | 隐藏标题 | boolean | false |
| hideExtra | 隐藏额外内容 | boolean | false |
| hideHeader | 隐藏头部 | boolean | false |
| **拖拽功能** | | | |
| rowDraggable | 启用行拖拽 | boolean | false |
| rowDraggableOptions | 拖拽配置 | object | - |
| **扩展渲染** | | | |
| searchFormExtraRender | 搜索表单扩展渲染 | function | - |
| **删除确认配置** | | | |
| deleteConfirmConfig | 删除确认配置 | DeleteConfirmConfig | `{ mode: 'popconfirm' }` |
| **钩子函数** | | | |
| beforeSave | 保存前钩子 | (data: Record\<string, any\>) => Promise\<boolean\> \| boolean | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| success | 操作成功时触发 | (type: string, data: any) |
| error | 操作失败时触发 | (error: Error) |

更多详细配置请参考完整 API 文档。
