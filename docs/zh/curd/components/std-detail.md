# StdDetail 组件

StdDetail 是一个用于展示和编辑数据详情的组件，基于 Ant Design Vue 的 Descriptions 组件，支持可编辑模式。

## 基础用法

### 方式一：通过 ID 自动获取数据

```vue
<script setup lang="ts">
import { userApi } from '~/api/user'

const columns = [
  {
    title: '用户名',
    dataIndex: 'username'
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ text }) => text === 1 ? '启用' : '禁用'
  }
]
</script>

<template>
  <StdDetail
    id="1"
    :api="userApi"
    :columns="columns"
  />
</template>
```

### 方式二：手动传入数据

```vue
<script setup lang="ts">
import { ref } from 'vue'

const userRecord = ref({
  id: 1,
  username: 'admin',
  email: 'admin@example.com',
  status: 1
})

const columns = [
  {
    title: '用户名',
    dataIndex: 'username'
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ text }) => text === 1 ? '启用' : '禁用'
  }
]
</script>

<template>
  <StdDetail
    v-model:record="userRecord"
    :columns="columns"
  />
</template>
```

## 可编辑模式

StdDetail 支持可编辑功能，可以直接在详情页面进行数据修改：

```vue
<script setup lang="ts">
import { userApi } from '~/api/user'

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    edit: {
      type: 'input',
      formItem: {
        rules: [{ required: true, message: '请输入用户名' }]
      }
    }
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    edit: {
      type: 'input',
      formItem: {
        rules: [
          { required: true },
          { type: 'email', message: '请输入有效的邮箱地址' }
        ]
      }
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    edit: {
      type: 'select',
      select: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ]
      }
    },
    customRender: ({ text }) => text === 1 ? '启用' : '禁用'
  },
  {
    title: '个人简介',
    dataIndex: 'bio',
    edit: {
      type: 'textarea',
      textarea: {
        rows: 4,
        maxLength: 200,
        showCount: true
      }
    }
  },
  {
    title: 'ID',
    dataIndex: 'id'
    // ID 字段不设置 edit，因此不可编辑
  }
]

</script>

<template>
  <StdDetail
    id="1"
    :api="userApi"
    :columns="columns"
    :editable="true"
  />
</template>
```

## 受限编辑模式

可以通过 `editableFields` 属性限制哪些字段可以编辑：

```vue
<script setup lang="ts">
import { userApi } from '~/api/user'

// 只允许编辑用户名和个人简介
const editableFields = ['username', 'bio']
</script>

<template>
  <StdDetail
    id="1"
    :api="userApi"
    :columns="columns"
    :editable="true"
    :editable-fields="editableFields"
  />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 数据 ID，用于自动获取详情数据 | string | - |
| columns | 列配置 | StdTableColumn[] | [] |
| detailProps | Descriptions 组件属性 | DescriptionsProps | - |
| api | CURD API 接口对象 | CurdApi | - |
| editable | 是否启用可编辑功能 | boolean | false |
| editableFields | 指定可编辑的字段列表 | string[] | - |
| loading | 保存时的加载状态 | boolean | false |

### Model

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| record | 详情数据（v-model） | object | {} |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| save | 保存数据时触发 | (data: any) => void |
| cancel | 取消编辑时触发 | () => void |
| edit | 进入编辑模式时触发 | () => void |

## 功能特性

### 自动过滤

会自动过滤掉以下列:
- dataIndex 为 'actions' 的列
- key 为 'actions' 的列
- hiddenInDetail 为 true 的列

### 模式切换

支持查看模式和编辑模式的无缝切换：
- **查看模式**: 只读展示数据
- **编辑模式**: 可编辑表单，支持验证和保存

### 字段级编辑控制

- 通过列配置的 `edit` 属性控制字段是否可编辑
- 通过 `editableFields` 属性进一步限制可编辑字段
- 不可编辑字段在编辑模式下仍保持只读显示

### 表单验证

集成完整的表单验证功能：
- 支持内置验证规则（必填、邮箱、长度等）
- 支持自定义验证规则
- 实时验证反馈

### 自定义渲染

支持通过 customRender 自定义渲染内容：

```vue
<script setup>
const column = {
  title: '状态',
  dataIndex: 'status',
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
    return text === 1
      ? h(Tag, { color: 'success' }, () => '启用')
      : h(Tag, { color: 'error' }, () => '禁用')
  }
}
</script>
```

### 数据转换

支持通过 dataIndex 读取嵌套数据：

```vue
<script setup>
const column = {
  title: '部门',
  dataIndex: ['dept', 'name'], // 读取 record.dept.name
  edit: {
    type: 'input'
  }
}
</script>
```

### 完整示例

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { StdDetail } from '@uozi-admin/curd'
import { userApi } from '~/api/user'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id'
    // 不设置 edit，表示此字段不可编辑，但仍会显示
  },
  {
    title: '用户名',
    dataIndex: 'username',
    edit: {
      type: 'input',
      formItem: {
        rules: [{ required: true, min: 3, max: 20 }]
      }
    }
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    edit: {
      type: 'input',
      formItem: {
        rules: [
          { required: true },
          { type: 'email', message: '请输入有效邮箱' }
        ]
      }
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    edit: {
      type: 'switch',
      switch: {
        checkedValue: 1,
        unCheckedValue: 0,
        checkedChildren: '启用',
        unCheckedChildren: '禁用'
      }
    },
    customRender: ({ value }) => value === 1 ? '启用' : '禁用'
  },
  {
    title: '个人简介',
    dataIndex: 'bio',
    edit: {
      type: 'textarea',
      textarea: {
        rows: 4,
        maxLength: 200,
        showCount: true
      }
    }
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    edit: {
      type: 'upload',
      upload: {
        listType: 'picture-card',
        maxCount: 1
      }
    },
    customRender: ({ value }) => {
      return value?.[0] ? `<img src="${value[0]}" style="width: 50px;" />` : '-'
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
    // 创建时间不可编辑
  }
]

</script>

<template>
  <StdDetail
    id="1"
    :api="userApi"
    :columns="columns"
    :editable="true"
  />
</template>
```

## Slots

目前不支持插槽，所有内容通过列配置和事件处理。
