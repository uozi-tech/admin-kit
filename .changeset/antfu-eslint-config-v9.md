---
"create-uozi-admin": patch
---

脚手架模板的 `@antfu/eslint-config` 升级到 `^9.5.1`，并按其新的 `pnpm-workspace.yaml` 规则调整模板的 `pnpm-workspace.yaml`：补充 `minimumReleaseAgeExcludePrune: true`（pnpm ≥ 11.21 生效，`@uozi-admin/*` 这类名称模式不会被清理），并按规则要求重新排列设置项，新项目 `pnpm lint` 可直接通过。
