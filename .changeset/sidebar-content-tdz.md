---
"@uozi-admin/layout-antdv": patch
---

修复 SidebarContent 初始化时计算展开菜单访问尚未声明的正则常量，导致侧边栏抛出 `Cannot access ... before initialization` 而无法渲染的问题。
