# StdPagination 组件

StdPagination 是一个增强的分页组件，基于 Ant Design Vue 的 Pagination 组件扩展，提供了响应式布局、国际化支持和配置化的分页功能。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'

const pagination = ref({
  total: 100,
  current: 1,
  pageSize: 10
})

function handleChange(page, size) {
  pagination.value.current = page
  pagination.value.pageSize = size
  console.log('页码变化:', page, size)
}
</script>

<template>
  <StdPagination
    :pagination="pagination"
    @change="handleChange"
  />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| pagination | 分页数据对象 | object | - |
| size | 分页组件尺寸 | 'default' \| 'small' | 'default' |
| loading | 加载状态 | boolean | false |
| showSizeChanger | 是否显示页面大小选择器 | boolean | true |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 页码或每页条数改变时触发 | (page: number, pageSize: number) |
| changePageSize | 每页条数改变时触发 | (pageSize: number) |
| update:pagination | 分页数据更新时触发 | (pagination: object) |

## 功能特性

### 智能显示

组件只有在总数大于每页条数时才会显示，避免不必要的分页显示：

```vue
<template>
  <!-- 总数100，每页10条，会显示分页 -->
  <StdPagination :pagination="{ total: 100, current: 1, pageSize: 10 }" />
  
  <!-- 总数5，每页10条，不会显示分页 -->
  <StdPagination :pagination="{ total: 5, current: 1, pageSize: 10 }" />
</template>
```

### 响应式布局

分页组件具有响应式布局，在不同屏幕尺寸下提供最佳的用户体验：

- 大屏幕：右对齐显示
- 小屏幕（≤450px）：居中显示，总数信息换行

### 国际化支持

组件自动支持国际化，会根据当前语言环境显示对应的文本：

```
总计: 100 条  // 中文
Total: 100 item(s)  // 英文
```

### 加载状态

支持加载状态，禁用分页操作防止重复请求：

```vue
<script setup lang="ts">
const loading = ref(false)

async function loadData() {
  loading.value = true
  try {
    // 加载数据...
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <StdPagination
    :pagination="pagination"
    :loading="loading"
  />
</template>
```

## 完整示例

```vue
<script setup lang="ts">
import { StdPagination } from '@uozi-admin/curd'
import { ref } from 'vue'

const loading = ref(false)
const pagination = ref({
  total: 1000,
  current: 1,
  pageSize: 20
})

async function handlePageChange(page, pageSize) {
  loading.value = true
  
  try {
    pagination.value.current = page
    pagination.value.pageSize = pageSize
    
    // 模拟接口请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log(`加载第 ${page} 页，每页 ${pageSize} 条`)
  } finally {
    loading.value = false
  }
}

function handlePageSizeChange(pageSize) {
  console.log('每页条数变更:', pageSize)
  // 重置到第一页
  pagination.value.current = 1
}
</script>

<template>
  <div class="example-container">
    <div class="content">
      <!-- 这里是数据列表内容 -->
      <div v-if="loading" class="loading">
        加载中...
      </div>
      <div v-else class="data-list">
        数据列表内容...
      </div>
    </div>
    
    <!-- 分页组件 -->
    <StdPagination
      :pagination="pagination"
      :loading="loading"
      size="default"
      :show-size-changer="true"
      @change="handlePageChange"
      @change-page-size="handlePageSizeChange"
    />
  </div>
</template>

<style scoped>
.example-container {
  margin: 20px 0;
}

.content {
  min-height: 300px;
  padding: 20px;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
}

.loading {
  text-align: center;
  padding: 50px 0;
  color: #999;
}
</style>
```

## 与其他组件配合使用

StdPagination 通常与 StdTable 等数据展示组件配合使用，在 StdTable 组件中已经内置了分页功能，但如果需要自定义布局，也可以单独使用：

```vue
<template>
  <div>
    <!-- 自定义数据展示 -->
    <div class="custom-list">
      <div v-for="item in dataList" :key="item.id">
        {{ item.name }}
      </div>
    </div>
    
    <!-- 独立使用分页组件 -->
    <StdPagination
      :pagination="pagination"
      @change="loadData"
    />
  </div>
</template>
``` 