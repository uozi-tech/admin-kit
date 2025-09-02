# 表格列表选择器

表格列表选择器（Selector）是一个强大的表单控件，通过表格形式展示选项数据，支持搜索、分页和多选等功能。

## 基础用法

最简单的选择器配置：

```ts
{
  title: '部门',
  dataIndex: 'departmentId',
  edit: {
    type: 'selector',
    selector: {
      getListApi: departmentApi.getList,
      columns: [
        { title: '部门名称', dataIndex: 'name' },
        { title: '部门编码', dataIndex: 'code' },
      ],
      valueKey: 'id',
      displayKey: 'name',
      title: '选择部门',
    },
  },
}
```

## 配置选项

```ts
interface SelectorConfig {
  // API 配置
  getListApi: (params: any) => Promise<any> // 获取数据的API
  valueKey: string // 值字段
  displayKey: string // 显示字段
  
  // 表格配置
  columns: TableColumn[] // 表格列配置
  title?: string // 弹窗标题
  
  // 功能配置
  multiple?: boolean // 是否多选
  searchable?: boolean // 是否可搜索
  searchFields?: string[] // 搜索字段
  filterCurrentRow?: boolean // 过滤当前行（避免选择自己）
  
  // 界面配置
  width?: number // 弹窗宽度
  height?: number // 表格高度
}
```

## 搜索功能

启用搜索功能，支持多字段搜索：

```ts
{
  edit: {
    type: 'selector',
    selector: {
      getListApi: userApi.getList,
      columns: [
        { title: '姓名', dataIndex: 'name' },
        { title: '邮箱', dataIndex: 'email' },
        { title: '手机号', dataIndex: 'phone' },
      ],
      valueKey: 'id',
      displayKey: 'name',
      title: '选择用户',
      searchable: true,
      searchFields: ['name', 'email'], // 支持按姓名和邮箱搜索
    },
  },
}
```

## 多选模式

启用多选功能：

```ts
{
  title: '角色',
  dataIndex: 'roleIds',
  edit: {
    type: 'selector',
    selector: {
      getListApi: roleApi.getList,
      columns: [
        { title: '角色名称', dataIndex: 'name' },
        { title: '角色编码', dataIndex: 'code' },
        { title: '权限', dataIndex: 'permissions', 
          customRender: ({ value }) => value.join(', ') 
        },
      ],
      valueKey: 'id',
      displayKey: 'name',
      title: '选择角色',
      multiple: true, // 启用多选
    },
  },
}
```

## 在搜索中使用

选择器也可以在搜索表单中使用：

```ts
{
  title: '部门',
  dataIndex: 'departmentId',
  search: {
    type: 'selector',
    selector: {
      getListApi: departmentApi.getList,
      columns: [
        { title: '部门名称', dataIndex: 'name' },
        { title: '负责人', dataIndex: 'manager' },
      ],
      valueKey: 'id',
      displayKey: 'name',
      title: '选择部门',
    },
  },
}
```

## 自定义渲染

配合自定义渲染显示选中的值：

```ts
{
  title: '部门',
  dataIndex: 'departmentId',
  edit: {
    type: 'selector',
    // ... selector 配置
  },
  customRender: ({ value }) => {
    // 根据 ID 显示部门名称
    const deptMap = {
      1: '技术部',
      2: '产品部',
      3: '运营部'
    }
    return deptMap[value] || '-'
  },
}
```

## 完整演示

<demo vue="../demos/curd/integration/selector-demo.vue" title="选择器综合示例" description="演示各种选择器的使用场景，包括部门选择、角色多选、上级选择等"></demo>

## API 数据格式

选择器要求 API 返回标准的分页数据格式：

```ts
interface ApiResponse {
  data: any[] // 数据列表
  pagination: {
    total: number // 总数
    current_page: number // 当前页
    per_page: number // 每页大小
    total_pages: number // 总页数
  }
}
```

## 最佳实践

1. **性能优化**
   - 合理设置分页大小
   - 启用搜索减少数据量
   - 缓存常用数据

2. **用户体验**
   - 提供有意义的搜索字段
   - 清晰的表格列标题
   - 合适的弹窗尺寸

3. **数据处理**
   - 处理空数据情况
   - 提供默认显示值
   - 验证选中数据的有效性

4. **权限控制**
   - 根据权限过滤可选数据
   - 处理无权限访问的情况