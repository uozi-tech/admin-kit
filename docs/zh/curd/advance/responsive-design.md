# 响应式设计

CURD 组件内置了响应式设计支持，能够在不同屏幕尺寸下提供良好的用户体验。

## 响应式列配置

使用 `responsive` 属性控制列在不同屏幕尺寸下的显示：

```ts
{
  title: '邮箱',
  dataIndex: 'email',
  width: 200,
  responsive: ['md'], // 只在中等屏幕以上显示
}
```

### 断点说明

- `xs`: ≥ 0px
- `sm`: ≥ 576px
- `md`: ≥ 768px
- `lg`: ≥ 992px
- `xl`: ≥ 1200px
- `xxl`: ≥ 1600px

## 固定列

在小屏幕上使用固定列确保重要信息始终可见：

```ts
{
  title: '姓名',
  dataIndex: 'name',
  width: 120,
  fixed: 'left', // 固定在左侧
},
{
  title: '操作',
  dataIndex: 'actions',
  width: 150,
  fixed: 'right', // 固定在右侧
}
```

## 表格滚动

配置水平滚动适应内容：

```vue
<StdCurd
  :columns="columns"
  :api="userApi"
  :scroll="{ x: 'max-content' }"
/>
```

## 搜索表单响应式

配置搜索表单的响应式布局：

```vue
<StdCurd
  :columns="columns"
  :api="userApi"
  :search-form-props="{
    layout: 'vertical', // 垂直布局更适合移动端
  }"
/>
```

## 表格尺寸

在小屏幕上使用更紧凑的表格尺寸：

```vue
<StdCurd
  :columns="columns"
  :api="userApi"
  :table-props="{
    size: 'small',
  }"
/>
```

## CSS 媒体查询

使用 CSS 媒体查询进一步优化样式：

```css
/* 移动端优化 */
@media (max-width: 768px) {
  :deep(.ant-table-thead > tr > th) {
    font-size: 12px;
    padding: 8px 4px;
  }
  
  :deep(.ant-table-tbody > tr > td) {
    font-size: 12px;
    padding: 8px 4px;
  }
}

/* 平板端优化 */
@media (min-width: 769px) and (max-width: 1024px) {
  :deep(.ant-table-thead > tr > th) {
    font-size: 13px;
  }
}
```

## 完整演示

<demo vue="../demos/layout/responsive-table.vue" title="响应式表格示例" description="演示表格在不同屏幕尺寸下的响应式表现"></demo>

## 最佳实践

1. **列优先级**
   - 重要列（如名称、状态）始终显示
   - 详情信息在大屏幕显示
   - 操作列固定在右侧

2. **内容适配**
   - 长文本自动截断或换行
   - 图片使用响应式尺寸
   - 数字格式化显示

3. **交互优化**
   - 触摸友好的按钮尺寸
   - 合理的点击区域
   - 滑动操作支持

4. **性能考虑**
   - 移动端减少列数提升性能
   - 懒加载图片资源
   - 合理的分页大小