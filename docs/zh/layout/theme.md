# 主题配置

`@uozi-admin/layout-antdv` 支持亮色/暗色主题切换。

## 主题切换

通过 `currentTheme` 属性和 `toggleTheme` 事件可以实现主题切换:

```vue
<script setup>
import { ref } from 'vue'

const theme = ref('light')

function handleThemeChange(newTheme) {
  theme.value = newTheme
}
</script>

<template>
  <AdminLayout
    :current-theme="theme"
    @toggle-theme="handleThemeChange"
  />
</template>
```

## 主题类型

支持以下主题类型:

- `light` - 亮色主题
- `dark` - 暗色主题
- `auto` - 跟随系统
