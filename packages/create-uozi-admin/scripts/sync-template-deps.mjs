#!/usr/bin/env node
/**
 * Keep the scaffold template's dependency versions in sync with the monorepo.
 *
 * The template (packages/create-uozi-admin/template) is copied verbatim into
 * user projects and is intentionally NOT a pnpm workspace member, so it must
 * never contain `catalog:` or `workspace:` specifiers: pnpm cannot resolve
 * them outside this repository and npm/yarn do not understand them at all.
 *
 * Version sources:
 * - `@uozi-admin/*` packages that live in this repo: `^<current version>`
 *   from `packages/<name>/package.json`.
 * - Everything else: the default `catalog` in the root `pnpm-workspace.yaml`.
 *
 * Usage:
 *   node sync-template-deps.mjs          Rewrite the template package.json.
 *   node sync-template-deps.mjs --check  Fail if the template contains
 *                                        workspace-only specifiers or deps
 *                                        that cannot be synced. Does not
 *                                        require the versions to be current.
 *
 * When versions change, a Markdown list of the changes is printed to stdout.
 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const DEPENDENCY_FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']
const FORBIDDEN_PROTOCOLS = ['catalog:', 'workspace:', 'link:', 'file:', 'portal:']

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const packageDir = path.resolve(scriptDir, '..')
const repoRoot = path.resolve(packageDir, '../..')
const templatePackageJsonPath = path.join(packageDir, 'template', 'package.json')

const catalogHeaderRegex = /^catalog:\s*(?:#.*)?$/
const indentedLineRegex = /^\s+\S/
const catalogEntryRegex = /^\s+(?:'([^']+)'|"([^"]+)"|([^\s:'"][^:]*)):\s+(\S.*)$/
const trailingCommentRegex = /\s+#.*$/
const lineBreakRegex = /\r?\n/

function unquote(value) {
  const trimmed = value.trim()
  if (trimmed.startsWith('\'') && trimmed.endsWith('\''))
    return trimmed.slice(1, -1).replaceAll('\'\'', '\'')
  if (trimmed.startsWith('"') && trimmed.endsWith('"'))
    return JSON.parse(trimmed)
  return trimmed.replace(trailingCommentRegex, '')
}

/**
 * Read the default catalog from pnpm-workspace.yaml.
 *
 * Only the flat `catalog:` mapping is supported, which is all this repo uses.
 * Any line in that block that is not a plain `name: version` pair aborts the
 * sync instead of being silently skipped.
 */
function readDefaultCatalog() {
  const workspacePath = path.join(repoRoot, 'pnpm-workspace.yaml')
  const lines = fs.readFileSync(workspacePath, 'utf8').split(lineBreakRegex)
  const start = lines.findIndex(line => catalogHeaderRegex.test(line))
  if (start === -1)
    throw new Error(`No top-level "catalog:" block found in ${workspacePath}`)

  const catalog = new Map()
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim() || line.trim().startsWith('#'))
      continue
    if (!indentedLineRegex.test(line))
      break

    const match = catalogEntryRegex.exec(line)
    if (!match)
      throw new Error(`Cannot parse catalog entry at ${workspacePath}:${i + 1}: ${line}`)

    const name = match[1] ?? match[2] ?? match[3].trim()
    catalog.set(name, unquote(match[4]))
  }
  return catalog
}

/** Current `^version` of every publishable package in packages/*. */
function readLocalPackageVersions() {
  const versions = new Map()
  const packagesDir = path.join(repoRoot, 'packages')
  for (const entry of fs.readdirSync(packagesDir, { withFileTypes: true })) {
    if (!entry.isDirectory())
      continue
    const manifestPath = path.join(packagesDir, entry.name, 'package.json')
    if (!fs.existsSync(manifestPath))
      continue
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    if (manifest.private || !manifest.name || !manifest.version)
      continue
    versions.set(manifest.name, `^${manifest.version}`)
  }
  return versions
}

function resolveSpecifier(name, catalog, localVersions) {
  if (localVersions.has(name))
    return localVersions.get(name)
  if (catalog.has(name))
    return catalog.get(name)
  return undefined
}

function collectProblems(pkg, catalog, localVersions) {
  const problems = []
  for (const field of DEPENDENCY_FIELDS) {
    for (const [name, specifier] of Object.entries(pkg[field] ?? {})) {
      const protocol = FORBIDDEN_PROTOCOLS.find(p => specifier.startsWith(p))
      if (protocol) {
        problems.push(`${field}.${name} uses "${specifier}"; the template is not a workspace package and must use a plain semver range`)
      }
      const resolved = resolveSpecifier(name, catalog, localVersions)
      if (resolved === undefined) {
        problems.push(`${field}.${name} is neither a local @uozi-admin package nor in the pnpm-workspace.yaml catalog; add it to the catalog so it can be synced`)
      }
      else if (FORBIDDEN_PROTOCOLS.some(p => resolved.startsWith(p))) {
        problems.push(`${field}.${name} resolves to "${resolved}", which is not usable outside the workspace`)
      }
    }
  }
  if (pkg.pnpm?.overrides || pkg.overrides || pkg.resolutions) {
    for (const [name, specifier] of Object.entries({ ...pkg.pnpm?.overrides, ...pkg.overrides, ...pkg.resolutions })) {
      if (typeof specifier === 'string' && FORBIDDEN_PROTOCOLS.some(p => specifier.startsWith(p)))
        problems.push(`override ${name} uses "${specifier}"`)
    }
  }
  return problems
}

function sortObject(object) {
  return Object.fromEntries(Object.entries(object).sort(([a], [b]) => a.localeCompare(b, 'en')))
}

function main() {
  const isCheck = process.argv.includes('--check')
  const catalog = readDefaultCatalog()
  const localVersions = readLocalPackageVersions()
  const pkg = JSON.parse(fs.readFileSync(templatePackageJsonPath, 'utf8'))

  if (isCheck) {
    const problems = collectProblems(pkg, catalog, localVersions)
    if (problems.length) {
      console.error(`Template package.json is not a valid standalone project (${templatePackageJsonPath}):`)
      for (const problem of problems)
        console.error(`  - ${problem}`)
      console.error('Run `pnpm sync:template` to rewrite it from the catalog.')
      process.exit(1)
    }
    return
  }

  const changes = []
  const missing = []
  for (const field of DEPENDENCY_FIELDS) {
    if (!pkg[field])
      continue
    for (const [name, specifier] of Object.entries(pkg[field])) {
      const resolved = resolveSpecifier(name, catalog, localVersions)
      if (resolved === undefined) {
        missing.push(`${field}.${name}`)
        continue
      }
      if (resolved !== specifier) {
        changes.push({ name, from: specifier, to: resolved })
        pkg[field][name] = resolved
      }
    }
    pkg[field] = sortObject(pkg[field])
  }

  if (missing.length) {
    console.error(`Cannot sync template dependencies; not found in the catalog: ${missing.join(', ')}`)
    process.exit(1)
  }

  const problems = collectProblems(pkg, catalog, localVersions)
  if (problems.length) {
    console.error(problems.join('\n'))
    process.exit(1)
  }

  const next = `${JSON.stringify(pkg, null, 2)}\n`
  if (next !== fs.readFileSync(templatePackageJsonPath, 'utf8'))
    fs.writeFileSync(templatePackageJsonPath, next)

  for (const { name, from, to } of changes)
    process.stdout.write(`- ${name}: \`${from}\` -> \`${to}\`\n`)
}

main()
