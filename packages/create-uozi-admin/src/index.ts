import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import minimist from 'minimist'
import ora from 'ora'
import colors from 'picocolors'
import prompts from 'prompts'

const { blue, gray, green, italic, red, yellow } = colors

const argv = minimist(process.argv.slice(2), {
  string: ['_'],
})
const cwd = process.cwd()

const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore',
}

const defaultTargetDir = 'uozi-admin-project'

const getProjectName = (targetDir: string) => path.basename(path.resolve(targetDir))

async function init() {
  const argTargetDir = formatTargetDir(argv._[0])

  let targetDir = argTargetDir || defaultTargetDir

  let result: prompts.Answers<
    'projectName' | 'packageManager' | 'overwrite' | 'packageName'
  >

  prompts.override({
    overwrite: argv.overwrite,
  })

  try {
    result = await prompts(
      [
        {
          type: argTargetDir ? null : 'text',
          name: 'projectName',
          message: green('Project name:'),
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultTargetDir
          },
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'select',
          name: 'overwrite',
          message: () =>
            green(`${targetDir === '.'
              ? 'Current directory'
              : `Target directory "${targetDir}"`
            } is not empty. Please choose how to proceed:`),
          initial: 0,
          choices: [
            {
              title: 'Remove existing files and continue',
              value: 'yes',
            },
            {
              title: 'Cancel operation',
              value: 'no',
            },
            {
              title: 'Ignore files and continue',
              value: 'ignore',
            },
          ],
        },
        {
          type: () => (isValidPackageName(getProjectName(targetDir)) ? null : 'text'),
          name: 'packageName',
          message: green('Package name:'),
          initial: () => toValidPackageName(getProjectName(targetDir)),
          validate: dir =>
            isValidPackageName(dir) || 'Invalid package.json name',
        },
        {
          type: 'select',
          name: 'packageManager',
          message: green('Choose a package manager:'),
          choices: [
            { title: 'npm', value: 'npm' },
            { title: 'yarn', value: 'yarn' },
            { title: 'pnpm', value: 'pnpm' },
          ],
          initial: 2, // 设置默认值为 pnpm
        },
        {
          type: (_, { overwrite }: { overwrite?: string }) => {
            if (overwrite === 'no')
              throw new Error(`${red('✖')} Operation cancelled`)

            return null
          },
          name: 'overwriteChecker',
        },
      ],
      {
        onCancel: () => {
          throw new Error(`${red('✖')} Operation cancelled`)
        },
      },
    )
  }
  catch (cancelled: any) {
    // eslint-disable-next-line no-console
    console.log(yellow(cancelled.message))
    return
  }

  const root = path.join(cwd, targetDir)

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  const pkgManager = result.packageManager || (pkgInfo ? pkgInfo.name : 'npm')

  // eslint-disable-next-line no-console
  console.log()

  const spinner = ora({
    text: blue('Creating project...'),
    color: 'yellow',
  }).start()

  createProject({ targetDir, root, result }).then(() => {
    spinner.succeed(green('The project has been created successfully.'))

    const cdProjectName = path.relative(cwd, root)

    // eslint-disable-next-line no-console
    console.log(gray(`\nScaffolded project in ${root}.`))

    // eslint-disable-next-line no-console
    console.log(`\nDone. Now run:\n`)

    if (root !== cwd) {
      // eslint-disable-next-line no-console
      console.log(green(
        `  cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`,
      ))
    }

    // 根据包管理器打印后续命令
    switch (pkgManager) {
      case 'yarn':
        // eslint-disable-next-line no-console
        console.log(green('  yarn'))
        // eslint-disable-next-line no-console
        console.log(green('  yarn dev'))
        break
      default:
        // eslint-disable-next-line no-console
        console.log(green(`  ${pkgManager} install`))
        // eslint-disable-next-line no-console
        console.log(green(`  ${pkgManager} run dev`))
        break
    }
    // eslint-disable-next-line no-console
    console.log()
    // eslint-disable-next-line no-console
    console.log(gray(italic(`Powered by @uozi-admin/create-admin.`)))
  }).catch(() => {
    spinner.fail('\nFailed to create the project!\n')
  })
}

async function createProject(options: {
  targetDir: string
  root: string
  result: prompts.Answers<
    'projectName' | 'packageManager' | 'overwrite' | 'packageName'
  >
}) {
  // 模拟用户输入的配置
  const { overwrite, packageName } = options.result

  try {
    // 根据 overwrite 设置是否清空目录
    if (overwrite === 'yes') {
      await emptyDir(options.root) // 异步清空目录
    }
    else if (!await fs.pathExists(options.root)) { // 异步检查路径是否存在
      await fs.mkdir(options.root, { recursive: true }) // 异步创建目录
    }

    const templateDir = path.resolve(
      fileURLToPath(import.meta.url),
      '../..',
      'template',
    )

    const write = async (file: string, content?: string) => {
      const targetPath = path.join(options.root, renameFiles[file] ?? file)
      if (content) {
        await fs.writeFile(targetPath, content) // 异步写入文件
      }
      else {
        await fs.copy(path.join(templateDir, file), targetPath) // 异步复制文件
      }
    }

    // 异步读取模板文件（确保以字符串编码返回，避免 Buffer 联合类型）
    const files = await fs.readdir(templateDir, { encoding: 'utf8' })
    for (const file of files.filter((f): f is string => typeof f === 'string' && f !== 'package.json')) {
      await write(file) // 异步写入文件
    }

    // 异步读取并修改 package.json
    const pkg = JSON.parse(
      await fs.readFile(path.join(templateDir, 'package.json'), 'utf8'), // 异步读取文件
    )

    pkg.name = packageName || getProjectName(options.targetDir)

    await write('package.json', `${JSON.stringify(pkg, null, 2)}\n`) // 异步写入 package.json
  }
  catch (error) {
    console.error(error)
  }
}

function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, '')
}

function copy(src: string, dest: string) {
  const stat = fs.statSync(src)
  if (stat.isDirectory())
    copyDir(src, dest)
  else
    fs.copyFileSync(src, dest)
}

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName,
  )
}

function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-')
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

function isEmpty(path: string) {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

async function emptyDir(dir: string) {
  if (!(await fs.exists(dir)))
    return

  for (const file of fs.readdirSync(dir)) {
    if (file === '.git')
      continue

    await fs.rm(path.resolve(dir, file), { recursive: true, force: true })
  }
}

function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent)
    return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  }
}

init().catch((e) => {
  console.error(e)
})
