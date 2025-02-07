# 文本域

文本域用于输入多行文本。

## 基础用法

```ts
const config = {
  type: 'textarea',
  formItem: {
    label: '备注'
  },
  textarea: {
    placeholder: '请输入备注信息',
    rows: 4,
    maxLength: 500,
    showCount: true
  }
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rows | 行数 | number | 4 |
| maxLength | 最大长度 | number | - |
| showCount | 是否显示字数统计 | boolean | false |
| allowClear | 可以点击清除图标删除内容 | boolean | false |
| placeholder | 输入提示 | string | - |
| disabled | 是否禁用 | boolean | false |
| autoSize | 自适应内容高度 | boolean \| \{ minRows: number, maxRows: number \} | false |

更多属性请参考 [Ant Design Vue Textarea](https://www.antdv.com/components/input-cn#api)

## 示例

```vue
<script setup lang="ts">
const columns = [
  {
    title: '备注',
    dataIndex: 'remark',
    edit: {
      type: 'textarea',
      formItem: {
        label: '备注信息'
      },
      textarea: {
        rows: 4,
        maxLength: 500,
        showCount: true,
        placeholder: '请输入备注信息'
      }
    }
  },
  {
    title: '描述',
    dataIndex: 'description',
    edit: {
      type: 'textarea',
      formItem: {
        label: '详细描述'
      },
      textarea: {
        autoSize: { minRows: 3, maxRows: 6 },
        placeholder: '请输入详细描述'
      }
    }
  }
]
</script>
```
