<script setup lang="ts">
import type { StdTableColumn } from '@uozi-admin/curd'
import { StdForm } from '@uozi-admin/curd'
import { Button } from 'ant-design-vue'
import { ref } from 'vue'
import { userApi } from '../mock/userApi'

const editId = ref()
const formData = ref({})

const columns: StdTableColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    edit: {
      type: 'input',
      formItem: {
        required: true,
        rules: [
          { min: 3, message: '用户名至少3个字符' },
          { max: 20, message: '用户名不能超过20个字符' },
        ],
      },
      placeholder: '请输入用户名',
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    edit: {
      type: 'input',
      formItem: {
        required: true,
        rules: [
          { type: 'email', message: '请输入正确的邮箱格式' },
        ],
      },
      placeholder: '请输入邮箱',
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    edit: {
      type: 'switch',
      switch: {
        checkedChildren: '启用',
        unCheckedChildren: '禁用',
        defaultValue: 1,
      },
    },
  },
  {
    title: '角色',
    dataIndex: 'roles',
    edit: {
      type: 'checkboxGroup',
      checkboxGroup: {
        options: [
          { label: '管理员', value: 'admin' },
          { label: '编辑者', value: 'editor' },
          { label: '查看者', value: 'viewer' },
        ],
      },
    },
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    edit: {
      type: 'upload',
      upload: {
        accept: 'image/*',
        maxCount: 1,
        listType: 'picture-card',
      },
    },
  },
]

function handleSuccess(data) {
  console.error('保存成功:', data)
  formData.value = data
}

function handleError(error) {
  console.error('保存失败:', error)
}

function loadEditData() {
  editId.value = 1 // 模拟编辑用户ID为1的数据
}

function resetForm() {
  editId.value = undefined
  formData.value = {}
}
</script>

<template>
  <div>
    <h3>StdForm 组件示例</h3>

    <div style="margin-bottom: 16px;">
      <Button
        style="margin-right: 8px;"
        @click="resetForm"
      >
        新增模式
      </Button>
      <Button
        type="primary"
        @click="loadEditData"
      >
        编辑模式
      </Button>
    </div>

    <div style="max-width: 600px;">
      <StdForm
        :id="editId"
        v-model:data="formData"
        :api="userApi"
        :columns="columns"
        @success="handleSuccess"
        @error="handleError"
      />
    </div>

    <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 6px;">
      <h4>表单状态:</h4>
      <p>模式: {{ editId ? '编辑' : '新增' }}</p>
      <p>编辑ID: {{ editId || '无' }}</p>

      <h4>最后提交的数据:</h4>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>
