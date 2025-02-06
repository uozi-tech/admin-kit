/* eslint-disable no-console */

import { exec } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { promisify } from 'node:util'
import chalk from 'chalk'
import ora from 'ora'

const execAsync = promisify(exec)

async function postinstall() {
  // 检查 shared-config 的 dist 目录是否存在
  const distPath = join(process.cwd(), 'packages/shared-config/dist')

  if (existsSync(distPath)) {
    console.log(chalk.blue('shared-config 已经构建过，跳过构建步骤'))
    return
  }

  const spinner = ora('正在构建 shared-config...').start()

  try {
    await execAsync('pnpm --filter shared-config build')
    spinner.succeed(chalk.green('shared-config 构建成功'))
  }
  catch (error) {
    spinner.fail(chalk.red('shared-config 构建失败'))
    console.error(error)
    process.exit(1)
  }
}

postinstall().catch((error) => {
  console.error(chalk.red('postinstall 失败:'), error)
  process.exit(1)
})
