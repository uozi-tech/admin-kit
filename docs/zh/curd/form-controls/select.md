# 选择器

选择器用于在预设的选项中选择一个或多个选项。

## 基础用法

<demo vue="../../../demos/curd/form-controls/select-demo.vue" title="选择器控件" description="展示各种选择器的配置选项，包括单选、多选、搜索、标签模式、远程数据等功能"></demo>

```ts
const config = {
  type: 'select',
  formItem: {
    label: '状态'
  },
  select: {
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ],
    placeholder: '请选择状态',
    allowClear: true
  }
}
```

## API

### 特有属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| remote | 远程数据配置 | RemoteConfig | - |
| mask | 选项数据 | Record<string | number, any> | - |
| valueKey | 选项数据 | string | - |

```ts
interface RemoteConfig {
  api: () => Promise<{ data: any[] }>
  valueKey: string
  labelKey: string
}
```

### Ant Design Vue 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项数据 | { label: string, value: any }[] | - |
| mode | 模式 | 'multiple' \| 'tags' | - |
| maxTagCount | 最多显示多少个 tag | number | - |
| optionFilterProp | 搜索时过滤对应的 option 属性 | string | 'value' |
| showSearch | 使单选模式可搜索 | boolean | false |
| allowClear | 支持清除 | boolean | false |
| placeholder | 选择框默认文字 | string | - |
| loading | 加载中状态 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| remote | 远程数据配置 | RemoteConfig | - |

```ts
interface RemoteConfig {
  api: () => Promise<any>
  valueKey: string
  labelKey: string
}
```

## 示例

```vue
<script setup lang="ts">
const columns = [
  {
    title: '状态',
    dataIndex: 'status',
    edit: {
      type: 'select',
      formItem: {
        required: true
      },
      select: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ],
        placeholder: '请选择状态',
        allowClear: true
      }
    }
  },
  {
    title: '标签',
    dataIndex: 'tags',
    edit: {
      type: 'select',
      formItem: {
        label: '标签'
      },
      select: {
        mode: 'multiple',
        options: [
          { label: '前端', value: 'frontend' },
          { label: '后端', value: 'backend' },
          { label: '设计', value: 'design' }
        ],
        maxTagCount: 3,
        placeholder: '请选择标签'
      }
    }
  },
  {
    title: '部门',
    dataIndex: 'department',
    edit: {
      type: 'select',
      formItem: {
        required: true
      },
      select: {
        showSearch: true,
        remote: {
          api: () => fetch('/api/departments'),
          valueKey: 'id',
          labelKey: 'name'
        },
        placeholder: '请选择部门'
      }
    }
  }
]
</script>
```
