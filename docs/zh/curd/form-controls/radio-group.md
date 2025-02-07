# 单选框

单选框用于在多个选项中选择一个选项。

## 基础用法

```ts
const config = {
  title: '状态',
  dataIndex: 'status',
  edit: {
    type: 'radio',
    formItem: {
      label: '用户状态'
    },
    radioGroup: {
      optionType: 'button',
      buttonStyle: 'solid',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
        { label: '锁定', value: 2, disabled: true }
      ]
    }
  }
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| buttonStyle | 按钮样式 | 'outline' \| 'solid' | 'outline' |
| name | RadioGroup 下所有 input[type="radio"] 的 name 属性 | string | - |
| options | 选项数组 | RadioOption[] | - |
| optionType | 选项类型 | 'default' \| 'button' | 'default' |
| disabled | 是否禁用 | boolean | false |
| value(v-model) | 值 | string | - |
| size | 尺寸 | 'default' \| 'small' \| 'large' | 'default' |

更多属性请参考 [Ant Design Vue Radio](https://www.antdv.com/components/radio-cn#api)
