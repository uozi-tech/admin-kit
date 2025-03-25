# 上传

上传控件用于文件上传。

## 基础用法

```vue
<script setup lang="ts">
const columns = [{
  type: 'upload',
  formItem: {
    label: '附件'
  },
  upload: {
    multiple: true
  }
}]

const uploadFiles = (formData: Record<string, any>) => {
  // 处理上传逻辑
  // ...
}
</script>

<template>
  <StdCurd :columns="columns" :before-save="uploadFiles" />
</template>
```