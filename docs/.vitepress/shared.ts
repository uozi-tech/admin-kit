import type { DefaultTheme } from 'vitepress'
// import { createUnoCSSPluginConfig } from './unocss'
import { Buffer } from 'node:buffer'
import * as path from 'node:path'
// import AutoImport from 'unplugin-auto-import/vite'
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vitepress'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin'

function createBasicAuthPlugin() {
  const authUser = process.env.DOCS_AUTH_USER
  const authPassword = process.env.DOCS_AUTH_PASSWORD

  if (!authUser || !authPassword) {
    return null
  }

  const expectedCredential = Buffer.from(`${authUser}:${authPassword}`).toString('base64')

  function basicAuthMiddleware(req: { headers: Record<string, string | undefined> }, res: { statusCode: number, setHeader: (name: string, value: string) => void, end: (content: string) => void }) {
    const authorization = req.headers.authorization

    if (authorization === `Basic ${expectedCredential}`) {
      return
    }

    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Kit Docs"')
    res.end('Authentication required.')
  }

  return {
    name: 'docs-basic-auth',
    configureServer(server: { middlewares: { use: (handler: (req: { headers: Record<string, string | undefined> }, res: { statusCode: number, setHeader: (name: string, value: string) => void, end: (content: string) => void }, next: () => void) => void) => void } }) {
      server.middlewares.use((req, res, next) => {
        basicAuthMiddleware(req, res)

        if (res.statusCode === 401) {
          return
        }

        next()
      })
    },
    configurePreviewServer(server: { middlewares: { use: (handler: (req: { headers: Record<string, string | undefined> }, res: { statusCode: number, setHeader: (name: string, value: string) => void, end: (content: string) => void }, next: () => void) => void) => void } }) {
      server.middlewares.use((req, res, next) => {
        basicAuthMiddleware(req, res)

        if (res.statusCode === 401) {
          return
        }

        next()
      })
    },
  }
}

const basicAuthPlugin = createBasicAuthPlugin()

export default defineConfig({
  base: '/admin-kit/',
  title: 'Admin Kit',
  head: [
    ['link', { rel: 'icon', href: './logo.svg' }],
  ],

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  ignoreDeadLinks: true,

  themeConfig: {
    logo: '/logo.svg',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/uozi-tech/admin-kit' },
    ],

    search: {
      provider: 'local',
    },
  } as DefaultTheme.Config,
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, {
        demoDir: path.resolve(__dirname, '../demos'),
      })
    },
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 5000,
    },
    plugins: [
      ...(basicAuthPlugin ? [basicAuthPlugin] : []),
      // AutoImport({
      //   imports: ['vue', 'vue-router', 'pinia'],
      //   vueTemplate: true,
      //   eslintrc: {
      //     enabled: true,
      //   },
      // }),
      // Components({
      //   resolvers: [AntDesignVueResolver({ importStyle: false })],
      //   directoryAsNamespace: true,
      // }),
      // createUnoCSSPluginConfig(),
    ],
    optimizeDeps: {
      include: [
        'antdv-next',
        '@antdv-next/icons',
        '@uozi-admin/curd',
        'vue-router',
        'mermaid',
        'cytoscape',
        'cytoscape-cose-bilkent',
        '@braintree/sanitize-url',
        'debug',
      ],
    },
    ssr: {
      noExternal: ['antdv-next', '@antdv-next/icons', '@uozi-admin/curd'],
    },
  },
})
