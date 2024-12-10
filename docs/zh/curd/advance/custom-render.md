# 自定义渲染

通过 `customRender` 属性来自定义表格和表单的渲染方式。例如，可以在表格中显示日期格式化的文本，或者在表单中使用自定义组件。

### 示例
```
const columns = [
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    customRender: (props) => {
        return new Date(props.text).toLocaleString()
    },
  },
]
```
