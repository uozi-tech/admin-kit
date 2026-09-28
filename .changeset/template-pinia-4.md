---
"create-uozi-admin": patch
---

脚手架模板的 `pinia` 升级到 `^4.0.3`。Pinia 4 起 `@vue/devtools-api` 改为必须由项目自行安装的 peer 依赖，模板因此新增 `@vue/devtools-api: ^8.2.1`，避免在不会自动安装 peer 的包管理器（如 Yarn）下缺依赖。`pinia-plugin-persistedstate@4.7.1` 的 peer 范围为 `pinia >=3.0.0`，无需调整。
