# 插件配置

shared-config 内置了一系列常用的 Vite 插件，并提供了统一的配置接口。

## 插件列表

### Vue 插件
默认启用 Vue 3 支持，可通过 `vue` 选项配置:

```ts
createViteConfig({
  pluginOptions: {
    vue: {
      script: {
        defineModel: true
      }
    }
  }
})
```

### JSX 插件
默认启用 JSX/TSX 支持，可通过 `vueJsx` 选项配置:

```ts
createViteConfig({
  pluginOptions: {
    vueJsx: {
      // JSX 配置项
    }
  }
})
```

### 自动导入插件
默认启用 API 自动导入，可通过 `autoImport` 选项配置:

```ts
createViteConfig({
  pluginOptions: {
    autoImport: {
      imports: [
        'vue',
        'vue-router',
        'pinia'
      ],
      // 其他配置项
    }
  }
})
```

### 组件自动导入插件
默认启用组件自动导入，可通过 `vueComponents` 选项配置:

```ts
createViteConfig({
  pluginOptions: {
    vueComponents: {
      // 组件自动导入配置
    }
  }
})
```

### UnoCSS 插件
默认启用 UnoCSS 支持，可通过 `unocss` 选项配置:

```ts
createViteConfig({
  pluginOptions: {
    unocss: {
      // UnoCSS 配置
    }
  }
})
```

### Vue DevTools 插件
默认启用 Vue DevTools 支持，可通过 `devTools` 选项配置:

```ts
createViteConfig({
  pluginOptions: {
    devTools: {
      // DevTools 配置
    }
  }
})
```

## 禁用插件

可以通过设置对应配置项为 `false` 来禁用插件:

```ts
createViteConfig({
  pluginOptions: {
    // 禁用 UnoCSS
    unocss: false,
    // 禁用 DevTools
    devTools: false
  }
})
```
