import { createViteConfig } from '@uozi-admin/shared-config/vite'

export default createViteConfig({
  overrides: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:4523',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: path => {
            const path1 = path.replace('/api', '/m1/3871056-3505026-default')
            return path1
          },
        },
      },
    },
  },
})
