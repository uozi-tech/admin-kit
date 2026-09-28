---
"@uozi-admin/curd": patch
---

StdForm、StdFormController、StdSelector 的 defineModel 对象/数组默认值改为工厂函数，避免多个实例共享同一个默认对象，并兼容新版 Vue 的类型检查。
