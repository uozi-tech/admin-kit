import process from 'node:process'
import type { UserConfig, UserConfigExport } from 'vite'
import { defineConfig, mergeConfig } from 'vite'
import { createApplicationViteConfig } from './config'
import { PluginsCustomOptions } from './plugins'

interface ApplicationViteConfigOptions {
  overrides?: UserConfigExport
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
  return defineConfig(async env => {
    if (typeof overrides === 'function') 
      return mergeConfigs([await createApplicationViteConfig(env.mode, root, plugins), await overrides(env)])
    
    return mergeConfigs([await createApplicationViteConfig(env.mode, root, plugins), overrides as UserConfig])
  })
}
