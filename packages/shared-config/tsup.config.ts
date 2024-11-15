import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['vite', 'tsconfig'],
  target: 'esnext',
  format: ['esm'],
  splitting: false,
  sourcemap: false,
  dts: true,
  clean: true,
  external: ['vite', 'unocss'],
  noExternal: ['./**/*.json'],
})
