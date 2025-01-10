import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['vite'],
  target: 'esnext',
  format: ['esm', 'cjs'],
  splitting: false,
  sourcemap: false,
  dts: true,
  clean: true,
  external: ['vite'],
})
