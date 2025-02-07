# 复选框

复选框用于在多个选项中选择多个选项。

## 基础用法

```ts
const config = {
  type: 'checkbox',
  formItem: {
    label: '爱好'
  },
  checkboxGroup: {
    options: [
      { label: '阅读', value: 'reading' },
      { label: '音乐', value: 'music' },
      { label: '运动', value: 'sports' }
    ]
  }
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项数组 | CheckboxOption[] | - |
| disabled | 是否禁用 | boolean | false |
| name | CheckboxGroup 下所有 input[type="checkbox"] 的 name 属性 | string | - |
| value(v-model) | 值 | string[] \| number[] | - |

```ts
interface CheckboxOption {
  label: string
  value: string | number
  disabled?: boolean
}
```

其它属性请参考 [Ant Design Vue Checkbox](https://www.antdv.com/components/checkbox-cn#api)

## 示例

```vue
<script setup lang="ts">
const columns = [
  {
    title: '爱好',
    dataIndex: 'hobbies',
    edit: {
      type: 'checkbox',
      formItem: {
        required: true
      },
      checkboxGroup: {
        options: [
          { label: '阅读', value: 'reading' },
          { label: '音乐', value: 'music' },
          { label: '运动', value: 'sports' },
          { label: '旅行', value: 'travel' },
          { label: '美食', value: 'food' }
        ]
      }
    }
  },
  {
    title: '技能',
    dataIndex: 'skills',
    edit: {
      type: 'checkbox',
      formItem: {
        label: '专业技能'
      },
      checkboxGroup: {
        options: [
          { label: 'JavaScript', value: 'js' },
          { label: 'TypeScript', value: 'ts' },
          { label: 'Vue', value: 'vue' },
          { label: 'React', value: 'react' },
          { label: 'Node.js', value: 'node', disabled: true }
        ],
      }
    }
  }
]
</script>
```
