# Vite 配置

## 默认配置

shared-config 提供了一套开箱即用的 Vite 配置:

```json5
{
  // 路径别名
  resolve: {
    alias: {
      '~': resolve(root, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.less'],
  },

  // CSS 预处理
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'border-radius-base': '5px',
        },
        javascriptEnabled: true,
      },
    },
  },

  // 开发服务器
  server: {
    proxy: {
      '/api': {
        target: env.VITE_PROXY_TARGET || 'http://localhost:9000',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: path => path.replace(env.VITE_API_ROOT || '/api', ''),
      },
    },
  },

  // 构建优化
  build: {
    chunkSizeWarningLimit: 5000,
  },
}
```

## 自定义配置

你可以通过 `overrides` 选项覆盖默认配置:

```ts
import { createViteConfig } from '@uozi-admin/shared-config'

export default createViteConfig({
  // 方式一: 对象形式
  overrides: {
    base: '/admin/',
    build: {
      outDir: 'dist/admin'
    }
  },

  // 方式二: 函数形式
  overrides: env => ({
    base: env.mode === 'production' ? '/admin/' : '/',
    build: {
      outDir: env.mode === 'production' ? 'dist/admin' : 'dist'
    }
  })
})
