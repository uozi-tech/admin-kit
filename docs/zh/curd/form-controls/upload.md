# 上传

上传控件用于文件上传。

## 基础用法

```ts
const config = {
  type: 'upload',
  formItem: {
    label: '附件'
  },
  upload: {
    action: '/api/upload',
    accept: '.jpg,.png,.pdf',
    multiple: true,
    maxCount: 5,
    maxSize: 5 * 1024 * 1024 // 5MB
  }
}
```

## 图片上传

```ts
const config = {
  type: 'upload',
  formItem: {
    label: '图片'
  },
  upload: {
    action: '/api/upload/image',
    accept: 'image/*',
    listType: 'picture-card',
    maxCount: 1,
    // 图片预览
    previewConfig: {
      width: 200,
      height: 200
    }
  }
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| action | 上传的地址 | string | - |
| accept | 接受的文件类型 | string | - |
| multiple | 是否支持多选 | boolean | false |
| maxCount | 最大上传数量 | number | - |
| maxSize | 最大文件大小(字节) | number | - |
| listType | 上传列表的样式 | 'text' \| 'picture' \| 'picture-card' | 'text' |
| previewConfig | 预览配置 | PreviewConfig | - |
| headers | 上传请求头 | object | - |
| data | 上传额外参数 | object | - |
| withCredentials | 上传是否携带 cookie | boolean | false |
| disabled | 是否禁用 | boolean | false |

```ts
interface PreviewConfig {
  width?: number
  height?: number
  maskClosable?: boolean
}
```

## 示例

```vue
<script setup lang="ts">
const columns = [
  {
    title: '附件',
    dataIndex: 'attachments',
    edit: {
      type: 'upload',
      formItem: {
        label: '上传附件',
        required: true
      },
      upload: {
        action: '/api/upload',
        accept: '.jpg,.png,.pdf',
        multiple: true,
        maxCount: 5,
        maxSize: 5 * 1024 * 1024,
        headers: {
          Authorization: 'Bearer token'
        }
      }
    }
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    edit: {
      type: 'upload',
      formItem: {
        label: '上传头像'
      },
      upload: {
        action: '/api/upload/avatar',
        accept: 'image/*',
        listType: 'picture-card',
        maxCount: 1,
        previewConfig: {
          width: 200,
          height: 200,
          maskClosable: true
        }
      }
    }
  }
]
</script>
```
