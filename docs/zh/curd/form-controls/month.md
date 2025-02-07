# 月份选择器

月份选择器用于选择月份。

## 基础用法

```ts
const config = {
  type: 'month',
  formItem: {
    label: '入职月份'
  },
  month: {
    format: 'YYYY-MM',
    placeholder: '请选择月份',
    allowClear: true
  }
}
```

## API

请参考 [Ant Design Vue DatePicker](https://www.antdv.com/components/date-picker-cn#api)

## 示例

```vue
<script setup lang="ts">
const columns = [
  {
    title: '入职月份',
    dataIndex: 'joinMonth',
    edit: {
      type: 'month',
      formItem: {
        required: true
      },
      month: {
        format: 'YYYY-MM',
        placeholder: '请选择入职月份',
        disabledDate: (current) => {
          return current && current > moment().endOf('month')
        }
      }
    }
  },
  {
    title: '财务月份',
    dataIndex: 'fiscalMonth',
    edit: {
      type: 'month',
      formItem: {
        label: '财务月份'
      },
      month: {
        format: 'MM/YYYY',
        placeholder: '请选择财务月份'
      }
    }
  }
]
</script>
```
