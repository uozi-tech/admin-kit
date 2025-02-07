# 输入框

输入框用于输入单行文本。

## 基础用法

```ts
const config = {
  type: 'input',
  formItem: {
    label: '用户名'
  },
  input: {
    placeholder: '请输入用户名',
    maxLength: 20,
    allowClear: true
  }
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| addonAfter | 带标签的 input，设置后置标签 | string|slot | - |
| addonBefore | 带标签的 input，设置前置标签 | string|slot | - |
| allowClear | 可以点击清除图标删除内容 | boolean | false |
| bordered | 是否有边框 | boolean | true |
| clearIcon | 自定义清除图标 （allowClear 为 true 时生效） | slot | <CloseCircleFilled /> |
| defaultValue | 输入框默认内容 | string | - |
| disabled | 是否禁用状态，默认为 false | boolean | false |
| id | 输入框的 id | string | - |
| maxlength | 最大长度 | number | - |
| prefix | 带有前缀图标的 input | string \| slot | - |
| showCount | 是否展示字数 | boolean | false |
| status | 设置校验状态 | 'error' | 'warning' | - |
| size | 控件大小。注：标准表单内的输入框大小限制为 middle。可选 large middle small | string | - |
| suffix | 带有后缀图标的 input | string|slot | - |
| type | 声明 input 类型，同原生 input 标签的 type 属性，见：MDN(请直接使用 <a-textarea /> 代替 type="textarea")。 | string | text |
| value(v-model) | 输入框内容 | string | - |

更多属性请参考 [Ant Design Vue Input](https://www.antdv.com/components/input-cn#api)

## 示例

```vue
<script setup lang="ts">
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    edit: {
      type: 'input',
      formItem: {
        required: true,
        rules: [
          { required: true, message: '请输入用户名' },
          { min: 3, max: 20, message: '长度在 3-20 个字符' }
        ]
      },
      input: {
        placeholder: '请输入用户名',
        maxLength: 20,
        allowClear: true
      }
    }
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    edit: {
      type: 'input',
      formItem: {
        required: true
      },
      input: {
        placeholder: '请输入手机号',
        prefix: '+86',
        maxLength: 11
      }
    }
  }
]
</script>
```
