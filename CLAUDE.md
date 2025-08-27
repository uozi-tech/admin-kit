# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Admin Kit** - a modern, batteries-included frontend solution for admin dashboards built with Vue 3, TypeScript, and pnpm workspaces. It's a monorepo containing multiple packages that work together to provide a complete admin development toolkit.

## Architecture

The project uses a **monorepo structure with pnpm workspaces**:

- **`packages/curd`** - CRUD component library based on Ant Design Vue
- **`packages/request`** - Axios-based HTTP client with CRUD API helpers  
- **`packages/layout-antdv`** - Admin layout components using Ant Design Vue
- **`packages/shared-config`** - Shared Vite configuration and plugins
- **`packages/create-uozi-admin`** - CLI scaffolding tool
- **`packages/directives`** - Vue custom directives
- **`playground/`** - Development playground for testing packages
- **`docs/`** - VitePress documentation site

### Key Technologies

- **Vue 3** + **TypeScript** + **Vite**
- **Ant Design Vue** for UI components
- **pnpm** for package management and workspaces
- **UnoCSS** for atomic CSS
- **Vue I18n** for internationalization
- **Vitest** for testing

## Development Commands

### Root Level Commands

```bash
# Start development playground
pnpm dev

# Build all packages (respects dependency order)
pnpm build

# Build with parallel processing where possible  
pnpm build --parallel

# Run linting across all packages
pnpm lint

# Run type checking across all packages
pnpm typecheck

# Run tests (currently only curd package)
pnpm test

# Start documentation development
pnpm docs:dev

# Build documentation
pnpm docs:build

# Release packages (build + changeset publish)
pnpm release
```

### Package-Specific Commands

```bash
# Work on specific package (example with curd)
pnpm -F curd build
pnpm -F curd typecheck  
pnpm -F curd test

# Start playground development
pnpm -F playground dev

# Generate CURD package translations
pnpm -F curd generate-translations
```

## Build System

The build system uses a **custom dependency-aware build script** (`scripts/build.ts`):

- Automatically resolves build order based on package dependencies
- Supports parallel building for packages without interdependencies
- Provides detailed build timing and progress feedback
- Handles build failures gracefully

### Package Dependencies

Build order is managed automatically, but the key dependencies are:
- `shared-config` → built first (no dependencies)
- `request`, `layout-antdv`, `curd` → depend on `shared-config`
- `create-uozi-admin` → standalone

## Key Package Details

### @uozi-admin/curd
- **Main functionality**: Standardized CRUD components (StdTable, StdForm, StdSearch, etc.)
- **Testing**: Uses Vitest with jsdom environment
- **Build**: Vite library mode with TypeScript declarations
- **Key files**: `src/components/` for main components, `src/composables/` for reusable logic

### @uozi-admin/request  
- **Main functionality**: Axios wrapper with CRUD API helpers
- **Key composables**: `useCurdApi()` for standard CRUD operations

### @uozi-admin/layout-antdv
- **Main functionality**: Admin layout components (header, sidebar, breadcrumb)
- **Theme support**: Built-in dark/light mode switching

### @uozi-admin/shared-config
- **Main functionality**: Shared Vite configuration with preconfigured plugins
- **Plugins included**: UnoCSS, auto-imports, Vue components, devtools

## Code Style & Linting

Uses **@antfu/eslint-config** with custom overrides:
- Vue template formatting with 2-space indentation
- Warns on unused imports/variables rather than erroring
- Console statements allowed only for errors
- TypeScript strict rules with some relaxed constraints

## Testing

- **Framework**: Vitest with jsdom environment
- **Setup**: Global test setup in `vitest.setup.ts`
- **Coverage**: Tests currently exist in `packages/curd/src/__tests__/`
- **Run tests**: `pnpm test` (runs curd package tests)

## Internationalization

- Uses **Vue I18n** with **vue3-gettext** for translation extraction
- Translation files in JSON format
- Supports Chinese (zh-CN, zh-HK, zh-TW) and English (en-US)
- Extract translations: `pnpm -F playground gettext:extract`

## Development Workflow

1. **Make changes** to packages in `packages/`
2. **Test locally** using `pnpm -F playground dev`
3. **Run tests** with `pnpm test`
4. **Type check** with `pnpm typecheck`  
5. **Lint code** with `pnpm lint`
6. **Build packages** with `pnpm build` before committing

## Package Versioning

Uses **Changesets** for version management:
- `pnpm version-packages` - bump versions based on changesets
- `pnpm release` - build and publish to npm

When working on this codebase, always consider the monorepo structure and package interdependencies. Test changes in the playground before building, and ensure all packages build successfully before committing.