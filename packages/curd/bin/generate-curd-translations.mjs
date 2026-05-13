#!/usr/bin/env node

import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const pkgRoot = path.join(here, '..')
const compiled = path.join(pkgRoot, 'dist/scripts/scripts/generateTranslations.js')

function ensureBuilt() {
  if (existsSync(compiled))
    return

  const require = createRequire(path.join(pkgRoot, 'package.json'))
  let tsc
  try {
    tsc = require.resolve('typescript/bin/tsc', { paths: [pkgRoot] })
  }
  catch {
    console.error(
      '@uozi-admin/curd: TypeScript not found. Install dependencies or run pnpm run build:scripts in packages/curd.',
    )
    process.exit(1)
  }

  const r = spawnSync(process.execPath, [tsc, '-p', path.join(pkgRoot, 'tsconfig.scripts.json')], {
    cwd: pkgRoot,
    stdio: 'inherit',
  })
  if (r.error)
    throw r.error
  if (r.status !== 0)
    process.exit(r.status ?? 1)

  if (!existsSync(compiled)) {
    console.error('@uozi-admin/curd: build:scripts did not produce generateTranslations.js')
    process.exit(1)
  }
}

ensureBuilt()
await import(pathToFileURL(compiled).href)
