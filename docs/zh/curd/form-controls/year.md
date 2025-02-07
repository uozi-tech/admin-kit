# 年份选择器

年份选择器用于选择年份。

## 基础用法

```ts
const config = {
  type: 'year',
  formItem: {
    label: '财年'
  },
  year: {
    format: 'YYYY',
    placeholder: '请选择年份',
    allowClear: true
  }
}
```

## API

参考 [Ant Design Vue DatePicker](https://www.antdv.com/components/date-picker-cn#api)

## 示例

```vue
<script setup lang="ts">
const columns = [
  {
    title: '财年',
    dataIndex: 'fiscalYear',
    edit: {
      type: 'year',
      formItem: {
        required: true
      },
      year: {
        format: 'YYYY',
        placeholder: '请选择财年',
        disabledDate: (current) => {
          return current && current > moment().endOf('year')
        }
      }
    }
  },
  {
    title: '入职年份',
    dataIndex: 'joinYear',
    edit: {
      type: 'year',
      formItem: {
        label: '入职年份'
      },
      year: {
        format: 'YYYY年',
        placeholder: '请选择入职年份'
      }
    }
  }
]
</script>
```
