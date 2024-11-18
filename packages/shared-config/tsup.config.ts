import { defineConfig } from 'tsup'
import * as fs from 'node:fs'

export default defineConfig({
  entry: ['vite'],
  target: 'esnext',
  format: ['esm', 'cjs'],
  splitting: false,
  sourcemap: false,
  dts: true,
  clean: true,
  external: ['vite', 'unocss'],
  onSuccess: () => {
    fs.cpSync('tsconfig/tsconfig.app.json', 'dist/tsconfig.app.json')
    fs.cpSync('tsconfig/tsconfig.node.json', 'dist/tsconfig.node.json')
    return undefined
  },
})
