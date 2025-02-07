# 滑块

滑块控件用于在连续或离散区间内选择数值。

## 基础用法

```ts
const config = {
  type: 'slider',
  formItem: {
    label: '进度'
  },
  slider: {
    min: 0,
    max: 100,
    step: 10,
    marks: {
      0: '0%',
      50: '50%',
      100: '100%'
    }
  }
}
```

## 范围选择

```ts
const config = {
  type: 'slider',
  formItem: {
    label: '价格区间'
  },
  slider: {
    range: true,
    min: 0,
    max: 1000,
    step: 100,
    marks: {
      0: '0',
      500: '500',
      1000: '1000'
    }
  }
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autofocus | 自动获取焦点 | boolean | false |
| disabled | 值为 true 时，滑块为禁用状态 | boolean | false |
| dots | 是否只能拖拽到刻度上 | boolean | false |
| included | marks 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列 | boolean | true |
| mark | 自定义刻度标记 | slot | - |
| marks | 刻度标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标签可以单独设置样式 | object | - |
| max | 最大值 | number | 100 |
| min | 最小值 | number | 0 |
| range | 双滑块模式 | boolean | false |
| reverse | 反向坐标轴 | boolean | false |
| step | 步长，取值必须大于 0，并且可被 (max - min) 整除。当 marks 不为空对象时，可以设置 step 为 null，此时 Slider 的可选值仅有 marks 标出来的部分。 | number | 1 |
| value | 设置当前取值。当 range 为 false 时，使用 number，否则用 [number, number] | number | - |
| vertical | 值为 true 时，Slider 为垂直方向 | boolean | false |
| tipFormatter | Slider 会把当前值传给 tipFormatter，并在 Tooltip 中显示 tipFormatter 的返回值，若为 null，则隐藏 Tooltip。 | Function | IDENTITY |
| tooltipPlacement | 设置 Tooltip 展示位置。参考 Tooltip。 | string | - |
| tooltipOpen | 值为true时，Tooltip 将会始终显示；否则始终不显示，哪怕在拖拽及移入时。 | boolean | - |
| getTooltipPopupContainer | Tooltip 渲染父节点，默认渲染到 body 上。 | Function | () => document.body |

更多属性请参考 [Ant Design Vue Slider](https://www.antdv.com/components/slider-cn#api)

## 示例

```vue
<script setup lang="ts">
const columns = [
  {
    title: '完成进度',
    dataIndex: 'progress',
    edit: {
      type: 'slider',
      formItem: {
        label: '完成进度',
        required: true
      },
      slider: {
        min: 0,
        max: 100,
        step: 10,
        marks: {
          0: '0%',
          50: '50%',
          100: '100%'
        }
      }
    }
  },
  {
    title: '价格区间',
    dataIndex: 'priceRange',
    edit: {
      type: 'slider',
      formItem: {
        label: '价格区间'
      },
      slider: {
        range: true,
        min: 0,
        max: 1000,
        step: 100,
        marks: {
          0: '¥0',
          500: '¥500',
          1000: '¥1000'
        },
        tooltipVisible: true
      }
    }
  }
]
</script>
```
