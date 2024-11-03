import process from 'node:process'
import type { UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vite'
import { createApplicationViteConfig } from './config'

interface ApplicationViteConfigOptions {
  overrides?: UserConfig
}

export function mergeConfigs(configs: UserConfig[]): Record<string, any> {
  return configs.reduce((mergedConfig, config) => {
    return mergeConfig(mergedConfig, config)
  }, {})
}

export async function createViteConfig(applicationViteConfigOptions: ApplicationViteConfigOptions = {}) {
  const { overrides = {} } = applicationViteConfigOptions
  const root = process.cwd()
  return defineConfig(async ({ mode }) => {
    return mergeConfigs([overrides, await createApplicationViteConfig(mode, root)])
  })
}
