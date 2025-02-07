/* eslint-disable no-console */

import type { Ora } from 'ora'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import chalk from 'chalk'
import ora from 'ora'

interface PackageConfig {
  name: string
  dependencies?: string[]
  parallel?: boolean
}

interface BuildOptions {
  parallel?: boolean // 是否启用并行构建
}

const BUILD_CONFIG: PackageConfig[] = [
  {
    name: 'shared-config',
  },
  {
    name: 'request',
    parallel: true,
  },
  {
    name: 'layout-antdv',
    dependencies: ['shared-config'],
    parallel: true,
  },
  {
    name: 'curd',
    dependencies: ['shared-config'],
    parallel: true,
  },
  {
    name: 'create-uozi-admin',
    parallel: true,
  },
]

class Builder {
  private built = new Set<string>()
  private buildTimes: Record<string, number> = {}
  private startTime = Date.now()
  private execAsync = promisify(exec)
  private spinners: Record<string, Ora> = {}

  constructor(private options: BuildOptions = {}) {}

  private async buildPackage(pkg: PackageConfig): Promise<void> {
    if (this.built.has(pkg.name))
      return

    const spinner = ora({
      text: `Building ${pkg.name}...`,
    }).start()
    this.spinners[pkg.name] = spinner
    const startTime = Date.now()

    try {
      const { stderr } = await this.execAsync(`pnpm --filter ${pkg.name} build`)
      if (stderr)
        spinner.warn(`[${pkg.name}] ${stderr}`)

      const duration = Date.now() - startTime
      this.buildTimes[pkg.name] = duration
      spinner.succeed(chalk.green(`Built ${pkg.name} (${duration}ms)`))
      this.built.add(pkg.name)
    }
    catch (error) {
      spinner.fail(chalk.red(`Failed to build ${pkg.name}`))
      console.error(error)
      process.exit(1)
    }
  }

  private async buildParallel(packages: PackageConfig[]): Promise<void> {
    await Promise.all(packages.map(pkg => this.buildPackage(pkg)))
  }

  private printSummary(): void {
    const totalTime = Date.now() - this.startTime
    console.log('\n📊 Build Summary:\n')
    Object.entries(this.buildTimes)
      .sort(([, a], [, b]) => b - a)
      .forEach(([pkg, time]) => {
        console.log(chalk.blue(`${pkg}: ${time}ms`))
      })
    console.log(chalk.bold(`\n✨ Total build time: ${totalTime}ms\n`))
  }

  async build(): Promise<void> {
    console.log(chalk.bold('\n🚀 Starting build process...\n'))

    while (this.built.size < BUILD_CONFIG.length) {
      const canBuild = BUILD_CONFIG.filter(pkg =>
        !this.built.has(pkg.name)
        && (!pkg.dependencies || pkg.dependencies.every(dep => this.built.has(dep))),
      )

      if (canBuild.length === 0) {
        throw new Error('检测到循环依赖')
      }

      if (this.options.parallel) {
        const parallelPackages = canBuild.filter(pkg => pkg.parallel)
        const serialPackages = canBuild.filter(pkg => !pkg.parallel)

        await this.buildParallel(parallelPackages)
        for (const pkg of serialPackages) {
          await this.buildPackage(pkg)
        }
      }
      else {
        for (const pkg of canBuild) {
          await this.buildPackage(pkg)
        }
      }
    }

    this.printSummary()
  }
}

// 命令行参数解析
const args = process.argv.slice(2)
const options: BuildOptions = {
  parallel: args.includes('--parallel'),
}

// 执行构建
new Builder(options).build().catch((error) => {
  console.error(chalk.red('构建失败:'), error)
  process.exit(1)
})
