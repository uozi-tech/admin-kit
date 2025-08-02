# 自动完成

自动完成用于输入框的自动完成功能，可以根据用户输入提供相关的建议选项。

## 基础用法

```ts
const config = {
  type: 'autoComplete',
  formItem: {
    label: '城市'
  },
  autoComplete: {
    options: [
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '广州', value: 'guangzhou' },
      { label: '深圳', value: 'shenzhen' }
    ],
    placeholder: '请输入城市名称',
    allowClear: true
  }
}
```

## API

### 特有属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| remote | 远程数据配置 | RemoteConfig | - |
| mask | 选项数据 | Record<string \| number, any> | - |
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
| filterOption | 是否根据输入项进行筛选 | boolean \| function | true |
| optionFilterProp | 搜索时过滤对应的 option 属性 | string | 'value' |
| allowClear | 支持清除 | boolean | false |
| placeholder | 输入框默认文字 | string | - |
| disabled | 是否禁用 | boolean | false |
| backfill | 使用键盘选择选项的时候把选中项回填到输入框中 | boolean | false |

## 示例

### 静态选项

```vue
<script setup lang="ts">
const columns = [
  {
    title: '城市',
    dataIndex: 'city',
    edit: {
      type: 'autoComplete',
      formItem: {
        required: true
      },
      autoComplete: {
        options: [
          { label: '北京', value: 'beijing' },
          { label: '上海', value: 'shanghai' },
          { label: '广州', value: 'guangzhou' },
          { label: '深圳', value: 'shenzhen' }
        ],
        placeholder: '请输入城市名称',
        allowClear: true,
        filterOption: true
      }
    }
  }
]
</script>
```

### 远程数据

```vue
<script setup lang="ts">
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    edit: {
      type: 'autoComplete',
      formItem: {
        required: true
      },
      autoComplete: {
        remote: {
          api: () => fetch('/api/users/search'),
          valueKey: 'username',
          labelKey: 'displayName'
        },
        placeholder: '请输入用户名',
        allowClear: true
      }
    }
  }
]
</script>
```

### 使用 mask 配置

```vue
<script setup lang="ts">
const columns = [
  {
    title: '状态',
    dataIndex: 'status',
    edit: {
      type: 'autoComplete',
      formItem: {
        required: true
      },
      autoComplete: {
        mask: {
          1: '活跃',
          2: '暂停',
          3: '禁用'
        },
        placeholder: '请选择状态'
      }
    }
  }
]
</script>
```

## 与 Select 组件的区别

- **AutoComplete**: 支持用户输入自定义内容，适用于既可以从建议选项中选择，也可以输入自定义值的场景
- **Select**: 只能从预设选项中选择，不支持用户输入自定义内容

选择建议：
- 当需要用户从固定选项中选择时，使用 `select`
- 当需要提供输入建议但允许用户输入自定义内容时，使用 `autoComplete`