# 自定义表单控件

CURD 组件支持自定义表单控件,可以扩展内置控件或创建全新的控件。

## 基础用法

```vue
<script setup lang="ts">
// 自定义控件组件
const MyInput = defineComponent({
  props: {
    value: String,
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    return () => (
      <input
        value={props.value}
        onInput={e => emit('update:value', e.target.value)}
      />
    )
  }
})

// 在列配置中使用
const columns = [
  {
    title: '自定义输入',
    dataIndex: 'custom',
    edit: {
      type: MyInput,
      customComponent: {
        // 传递给自定义组件的 props
        placeholder: '请输入'
      }
    }
  }
]
</script>
```

## 扩展内置控件

可以基于内置控件进行扩展:

```vue
<script setup lang="ts">
import { StdInput } from '@uozi-admin/curd'

// 扩展 Input 组件
const MyInput = defineComponent({
  extends: StdInput,
  setup(props, ctx) {
    // 添加自定义逻辑
    onMounted(() => {
      console.log('mounted')
    })

    return () => (
      <StdInput
        {...props}
        {...ctx.attrs}
        v-slots={ctx.slots}
      />
    )
  }
})
</script>
```

<!-- ## 注册全局控件

可以将自定义控件注册为全局组件:

```ts
import { createCurdConfig } from '@uozi-admin/curd'

app.use(createCurdConfig({
  components: {
    // 注册自定义控件
    MyInput
  }
}))

// 使用时直接指定 type
const columns = [
  {
    title: '自定义输入',
    dataIndex: 'custom',
    edit: {
      type: 'MyInput'
    }
  }
]
```

## 控件接口规范

自定义控件需要遵循以下接口规范:

```ts
interface CustomControl {
  // 必须接收 value prop
  props: {
    value: any
  }

  // 必须触发 update:value 事件
  emits: ['update:value']

  // 可选的其他 props
  customComponent?: {
    [key: string]: any
  }
}
``` -->
