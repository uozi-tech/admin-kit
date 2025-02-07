# 开关

开关控件用于切换布尔类型的值。

## 基础用法

```ts
{
  type: 'switch',
  formItem: {
    label: '状态'
  },
  switch: {
    checkedValue: 1,
    unCheckedValue: 0,
    checkedChildren: '启用',
    unCheckedChildren: '禁用'
  }
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autofocus | 组件自动获取焦点 | boolean | false |
| checked | 指定当前是否选中 | checkedValue | unCheckedValue | false |
| checkedChildren | 选中时的内容 | string \| VNode | - |
| checkedValue | 选中时的值 | boolean | string | number | true |
| disabled | 是否禁用 | boolean | false |
| loading | 加载中的开关 | boolean | false |
| size | 开关大小，可选值：default small | string | default |
| unCheckedChildren | 非选中时的内容 | string \| VNode | - |
| unCheckedValue | 非选中时的值 | boolean | string | number | false |

更多属性请参考 [Ant Design Vue Switch](https://www.antdv.com/components/switch-cn#api)

## 示例

```vue
<script setup lang="ts">
const columns = [
  {
    title: '状态',
    dataIndex: 'status',
    edit: {
      type: 'switch',
      formItem: {
        label: '启用状态'
      },
      switch: {
        checkedValue: 1,
        unCheckedValue: 0,
        checkedChildren: '启用',
        unCheckedChildren: '禁用'
      }
    }
  },
  {
    title: '推荐',
    dataIndex: 'recommended',
    edit: {
      type: 'switch',
      formItem: {
        label: '是否推荐'
      },
      switch: {
        checkedChildren: '是',
        unCheckedChildren: '否'
      }
    }
  }
]
</script>
```
