# 时间选择器

时间选择器用于选择时间。

## 基础用法

```ts
const config = {
  type: 'time',
  formItem: {
    label: '上课时间'
  },
  time: {
    format: 'HH:mm:ss',
    placeholder: '请选择时间',
    hourStep: 1,
    minuteStep: 5,
    secondStep: 10
  }
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 是否展示清除按钮 | boolean | true |
| autofocus | 自动获取焦点 | boolean | false |
| bordered | 是否有边框 | boolean | true |
| clearIcon | 自定义的清除图标 | VNode | - |
| clearText | 清除按钮的提示文案 | string | clear |
| disabled | 禁用全部操作 | boolean | false |
| disabledTime | 不可选择的时间 | DisabledTime | - |
| format | 展示的时间格式 | string | HH:mm:ss |
| getPopupContainer | 定义浮层的容器，默认为 body 上新建 div | function(trigger) | - |
| hideDisabledOptions | 隐藏禁止选择的选项 | boolean | false |
| hourStep | 小时选项间隔 | number | 1 |
| inputReadOnly | 设置输入框为只读（避免在移动设备上打开虚拟键盘） | boolean | false |
| minuteStep | 分钟选项间隔 | number | 1 |
| open | 面板是否打开 | boolean | false |
| placeholder | 没有值的时候显示的内容 | string | 请选择时间 |
| placement | 选择框弹出的位置 | bottomLeft bottomRight topLeft topRight | bottomLeft |
| popupClassName | 弹出层类名 | string | - |
| popupStyle | 弹出层样式对象 | object | - |
| renderExtraFooter | 选择框底部显示自定义的内容 | VNode | - |
| secondStep | 秒选项间隔 | number | 1 |
| showNow | 面板是否显示“此刻”按钮 | boolean | - |
| status | 设置校验状态 | 'error' | 'warning' | - |
| suffixIcon | 自定义的选择框后缀图标 | VNode | - |
| use12Hours | 使用 12 小时制，为 true 时 format 默认为 h:mm:ss a | boolean | false |
| value | 当前时间 | dayjs | - |
| valueFormat | 可选，绑定值的格式，对 value、defaultValue 起作用。不指定则绑定值为 dayjs 对象 | string | - |

更多属性请参考 [Ant Design Vue TimePicker](https://www.antdv.com/components/time-picker-cn#api)

## 示例

```vue
<script setup lang="ts">
const columns = [
  {
    title: '上课时间',
    dataIndex: 'classTime',
    edit: {
      type: 'time',
      formItem: {
        required: true
      },
      time: {
        format: 'HH:mm',
        placeholder: '请选择上课时间',
        hourStep: 1,
        minuteStep: 5,
      }
    }
  },
  {
    title: '营业时间',
    dataIndex: 'businessHours',
    edit: {
      type: 'time',
      formItem: {
        label: '营业时间'
      },
      time: {
        format: 'h:mm a',
        use12Hours: true,
        placeholder: '请选择营业时间',
        hourStep: 1,
        minuteStep: 30
      }
    }
  }
]
</script>
```
