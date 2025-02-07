# StdSearch 组件

StdSearch 是一个搜索表单组件,用于配置表格的搜索条件。

## 基础用法

```vue
<script setup lang="ts">
const searchData = ref({})

function resetSearch() {
  searchData.value = {}
}
</script>

<template>
  <StdSearch
    v-model:data="searchData"
    :columns="columns"
  >
    <template #extra="{ formData }">
      <Button @click="resetSearch">
        重置
      </Button>
    </template>
  </StdSearch>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列配置 | StdTableColumn[] | [] |

### Model

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 搜索数据 | object | {} |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| extra | 额外的操作区域 | { formData } |

## 搜索配置

通过 column 的 search 属性配置搜索:

### 开启搜索
```vue
<script setup>
const column = {
  title: '用户名',
  dataIndex: 'username',
  search: true // 使用与 edit 相同的控件类型
}
</script>
```

### 自定义搜索控件
```vue
<script setup>
const column = {
  title: '创建时间',
  dataIndex: 'created_at',
  search: {
    type: 'dateRange',
    dateRange: {
      format: 'YYYY-MM-DD'
    }
  }
}
</script>
```

### 配置验证规则
```vue
<script setup>
const column = {
  title: '手机号',
  dataIndex: 'mobile',
  search: {
    type: 'input',
    formItem: {
      rules: [
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
      ]
    }
  }
}
</script>
```
