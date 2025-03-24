# 应用配置

`@uozi-admin/layout-antdv` 提供了全局应用配置功能，允许您设置和获取应用的全局配置信息，如站点标题和版权信息等。

## 基本用法

### setAppConfig

用于设置应用的全局配置。

```ts
import { setAppConfig } from '@uozi-admin/layout-antdv'

setAppConfig({
  siteTitle: 'Uozi Admin',
  copyright: `Copyright © 2024 - ${new Date().getFullYear()} Uozi Tech`,
})
```

### getAppConfig

用于获取当前应用的全局配置。

```ts
import { getAppConfig } from '@uozi-admin/layout-antdv'

const appConfig = getAppConfig()
console.log(appConfig.siteTitle) // 'Uozi Admin'
console.log(appConfig.copyright) // 'Copyright © 2024 - 2024 Uozi Tech'
```

## 配置项

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| siteTitle | 站点标题 | `string` | 'Admin Dashboard' |
| copyright | 版权信息 | `string` | 'Uozi-Tech' |

## 在组件中使用

您可以在任何组件中使用 `getAppConfig` 获取全局配置：

```vue
<script setup lang="ts">
import { getAppConfig } from '@uozi-admin/layout-antdv'

const appConfig = getAppConfig()
</script>

<template>
  <div>
    <h1>{{ appConfig.siteTitle }}</h1>
    <footer>{{ appConfig.copyright }}</footer>
  </div>
</template>
```

## 应用场景

### 在布局组件中使用

```vue
<script setup lang="ts">
import { AdminLayout, getAppConfig } from '@uozi-admin/layout-antdv'

const appConfig = getAppConfig()
</script>

<template>
  <AdminLayout
    :site-title="appConfig.siteTitle"
    :copyright="appConfig.copyright"
    <!-- 其他属性 -->
  >
    <RouterView />
  </AdminLayout>
</template>
```

### 在主入口文件设置

通常，您应该在应用的主入口文件中设置全局配置：

```ts
// main.ts
import { setAppConfig } from '@uozi-admin/layout-antdv'
import { createApp } from 'vue'
import App from './App.vue'

// 设置全局配置
setAppConfig({
  siteTitle: '我的管理系统',
  copyright: `© ${new Date().getFullYear()} 我的公司`,
})

createApp(App).mount('#app')
``` 