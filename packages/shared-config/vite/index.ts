import process from 'node:process'
import type { UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vite'
import { createApplicationViteConfig } from './config'
import { PluginsCustomOptions } from './plugins'

interface ApplicationViteConfigOptions {
  overrides?: UserConfig
  plugins?: PluginsCustomOptions
}

export function mergeConfigs(configs: UserConfig[]): Record<string, any> {
  return configs.reduce((mergedConfig, config) => {
    return mergeConfig(mergedConfig, config)
  }, {})
}

export async function createViteConfig(applicationViteConfigOptions: ApplicationViteConfigOptions = {}) {
  const { overrides = {}, plugins = {} } = applicationViteConfigOptions
  const root = process.cwd()
  return defineConfig(async ({ mode }) => {
    return mergeConfigs([overrides, await createApplicationViteConfig(mode, root, plugins)])
  })
}
