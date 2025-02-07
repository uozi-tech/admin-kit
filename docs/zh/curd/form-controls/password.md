# 密码框

密码框用于输入密码。

## 基础用法

```ts
const config = {
  type: 'password',
  formItem: {
    label: '密码'
  },
  password: {
    placeholder: '请输入密码',
    generate: true
  }
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visibilityToggle | 是否显示切换密码可见状态的按钮 | boolean | true |
| generate | 是否显示生成随机密码按钮 | boolean | false |
| maxLength | 最大长度 | number | 12 |

其他属性与 [Input](./input.md) 相同，此处不再赘述。

更多属性请参考 [Ant Design Vue Input](https://www.antdv.com/components/input-cn#api)

## 示例

```vue
<script setup lang="ts">
const columns = [
  {
    title: '密码',
    dataIndex: 'password',
    edit: {
      type: 'password',
      formItem: {
        required: true,
        rules: [
          { required: true, message: '请输入密码' },
          { min: 6, message: '密码长度不能小于6位' }
        ]
      },
      password: {
        placeholder: '请输入密码',
        generate: true,
        maxLength: 20
      }
    }
  }
]
</script>
```
