import type { UserConfig, UserConfigExport, UserConfigFnPromise } from 'vite'
import type { PluginsCustomOptions } from '../types'
import process from 'node:process'
import { defineConfig, mergeConfig } from 'vite'
import { createApplicationViteConfig } from './config'

interface ApplicationViteConfigOptions {
  overrides?: UserConfigExport
  pluginOptions?: PluginsCustomOptions
}

export function mergeConfigs(configs: UserConfig[]): Record<string, any> {
  return configs.reduce((mergedConfig, config) => {
    return mergeConfig(mergedConfig, config)
  }, {})
}

export async function createViteConfig(
  applicationViteConfigOptions: ApplicationViteConfigOptions = {},
): Promise<UserConfigFnPromise> {
  const { overrides = {}, pluginOptions = {} } = applicationViteConfigOptions
  const root = process.cwd()
  return defineConfig(async (env) => {
    if (typeof overrides === 'function')
      return mergeConfigs([await createApplicationViteConfig(env.mode, root, pluginOptions), await overrides(env)])

    return mergeConfigs([await createApplicationViteConfig(env.mode, root, pluginOptions), overrides as UserConfig])
  })
}
