# 自定义扩展

CURD 组件库提供了强大的自定义能力，支持自定义渲染、自定义表单控件、主题定制等高级功能。

## 在线演示

<demo
  vue="../demos/curd/advanced/customization/customization.vue"
  :vueFiles="[
    '../demos/curd/advanced/customization/CustomRender.vue',
    '../demos/curd/advanced/customization/CustomFormControl.vue',
    '../demos/curd/advanced/customization/DynamicForm.vue',
    '../demos/curd/advanced/customization/CustomRangeInput.vue',
  ]"
/>

## 主题定制

### CSS 变量定制

```css
/* 自定义主题色 */
:root {
  --curd-primary-color: #1890ff;
  --curd-success-color: #52c41a;
  --curd-warning-color: #faad14;
  --curd-error-color: #f5222d;
  
  /* 表格样式 */
  --curd-table-header-bg: #fafafa;
  --curd-table-row-hover-bg: #f5f5f5;
  
  /* 表单样式 */
  --curd-form-item-margin-bottom: 24px;
  --curd-form-label-color: #000000d9;
}
```

### 组件样式覆盖

```css
/* 自定义表格样式 */
.std-table {
  .ant-table-thead > tr > th {
    background-color: var(--curd-table-header-bg);
    font-weight: 600;
  }
  
  .ant-table-tbody > tr:hover > td {
    background-color: var(--curd-table-row-hover-bg);
  }
}

/* 自定义表单样式 */
.std-form {
  .ant-form-item {
    margin-bottom: var(--curd-form-item-margin-bottom);
  }
  
  .ant-form-item-label > label {
    color: var(--curd-form-label-color);
  }
}
```

### 全局样式配置

```ts
// main.ts
import { createCurdConfig } from '@uozi-admin/curd'

app.use(createCurdConfig({
  theme: {
    // 主题色配置
    primaryColor: '#1890ff',
    
    // 组件默认样式
    table: {
      size: 'middle',
      bordered: true,
      showSorterTooltip: false
    },
    
    edit: {
      layout: 'vertical',
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    }
  }
}))
```

## 相关内容

- [表单交互](./form-interactions) - 表单联动和验证
- [批量操作](./batch-operations) - 批量编辑和删除