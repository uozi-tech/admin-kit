# 日期时间选择器

日期时间选择器用于选择日期和时间。

## 基础用法

```ts
const config = {
  type: 'datetime',
  formItem: {
    label: '预约时间'
  },
  datetime: {
    format: 'YYYY-MM-DD HH:mm:ss',
    placeholder: '请选择日期时间',
    showTime: {
      defaultValue: dayjs('00:00:00', 'HH:mm:ss')
    }
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
    title: '预约时间',
    dataIndex: 'appointmentTime',
    edit: {
      type: 'datetime',
      formItem: {
        required: true
      },
      datetime: {
        format: 'YYYY-MM-DD HH:mm:ss',
        placeholder: '请选择预约时间',
        showTime: {
          format: 'HH:mm:ss',
          hourStep: 1,
          minuteStep: 5,
          secondStep: 10,
          defaultValue: dayjs('00:00:00', 'HH:mm:ss')
        },
      }
    }
  }
]
</script>
