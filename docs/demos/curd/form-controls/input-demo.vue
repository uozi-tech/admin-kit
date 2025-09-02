<script setup lang="ts">
import { ref } from 'vue'
import { StdForm } from '@uozi-admin/curd'
import { Button, Space, message, Card, Alert, Divider } from 'ant-design-vue'
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined } from '@ant-design/icons-vue'
import type { StdTableColumn } from '@uozi-admin/curd'

const formData = ref({
  // 基础输入框
  basicInput: '',
  
  // 带清除按钮
  clearableInput: '',
  
  // 带前缀图标
  prefixInput: '',
  
  // 带后缀图标  
  suffixInput: '',
  
  // 带前置标签
  addonBeforeInput: '',
  
  // 带后置标签
  addonAfterInput: '',
  
  // 密码输入框
  password: '',
  
  // 限制长度
  limitedInput: '',
  
  // 显示字数
  countInput: '',
  
  // 大尺寸输入框
  largeInput: '',
  
  // 小尺寸输入框
  smallInput: '',
  
  // 禁用状态
  disabledInput: '禁用状态的输入框',
  
  // 只读状态
  readonlyInput: '只读状态的输入框'
})

// 表单列配置
const columns: StdTableColumn[] = [
  {
    title: '基础输入框',
    dataIndex: 'basicInput',
    edit: {
      type: 'input',
      formItem: {
        help: '最简单的输入框用法'
      },
      input: {
        placeholder: '请输入内容'
      }
    }
  },
  {
    title: '带清除按钮',
    dataIndex: 'clearableInput',
    edit: {
      type: 'input',
      formItem: {
        help: '可以快速清空内容的输入框'
      },
      input: {
        placeholder: '输入内容后显示清除按钮',
        allowClear: true
      }
    }
  },
  {
    title: '带前缀图标',
    dataIndex: 'prefixInput',
    edit: {
      type: 'input',
      formItem: {
        help: '在输入框前面显示图标'
      },
      input: {
        placeholder: '请输入用户名',
        prefix: 'user' // 或者使用 h(UserOutlined)
      }
    }
  },
  {
    title: '带后缀图标',
    dataIndex: 'suffixInput',
    edit: {
      type: 'input',
      formItem: {
        help: '在输入框后面显示图标'
      },
      input: {
        placeholder: '请输入邮箱',
        suffix: '@'
      }
    }
  },
  {
    title: '带前置标签',
    dataIndex: 'addonBeforeInput',
    edit: {
      type: 'input',
      formItem: {
        help: '在输入框前面添加标签'
      },
      input: {
        placeholder: '请输入域名',
        addonBefore: 'https://'
      }
    }
  },
  {
    title: '带后置标签',
    dataIndex: 'addonAfterInput',
    edit: {
      type: 'input',
      formItem: {
        help: '在输入框后面添加标签'
      },
      input: {
        placeholder: '请输入邮箱用户名',
        addonAfter: '@example.com'
      }
    }
  },
  {
    title: '密码输入框',
    dataIndex: 'password',
    edit: {
      type: 'password',
      formItem: {
        help: '自动隐藏输入内容，带切换显示按钮'
      },
      password: {
        placeholder: '请输入密码'
      }
    }
  },
  {
    title: '限制长度',
    dataIndex: 'limitedInput',
    edit: {
      type: 'input',
      formItem: {
        help: '最多只能输入20个字符'
      },
      input: {
        placeholder: '最多输入20字符',
        maxLength: 20
      }
    }
  },
  {
    title: '显示字数',
    dataIndex: 'countInput',
    edit: {
      type: 'input',
      formItem: {
        help: '显示已输入字符数'
      },
      input: {
        placeholder: '输入内容查看字数',
        showCount: true,
        maxLength: 50
      }
    }
  },
  {
    title: '大尺寸输入框',
    dataIndex: 'largeInput',
    edit: {
      type: 'input',
      formItem: {
        help: '大尺寸的输入框'
      },
      input: {
        placeholder: '大尺寸输入框',
        size: 'large'
      }
    }
  },
  {
    title: '小尺寸输入框',
    dataIndex: 'smallInput',
    edit: {
      type: 'input',
      formItem: {
        help: '小尺寸的输入框'
      },
      input: {
        placeholder: '小尺寸输入框',
        size: 'small'
      }
    }
  },
  {
    title: '禁用状态',
    dataIndex: 'disabledInput',
    edit: {
      type: 'input',
      formItem: {
        help: '禁用状态不可编辑'
      },
      input: {
        disabled: true
      }
    }
  },
  {
    title: '只读状态',
    dataIndex: 'readonlyInput',
    edit: {
      type: 'input',
      formItem: {
        help: '只读状态不可编辑但可复制'
      },
      input: {
        readonly: true
      }
    }
  }
]

// 表单引用
const formRef = ref()

// 重置表单
function handleReset() {
  formData.value = {
    basicInput: '',
    clearableInput: '',
    prefixInput: '',
    suffixInput: '',
    addonBeforeInput: '',
    addonAfterInput: '',
    password: '',
    limitedInput: '',
    countInput: '',
    largeInput: '',
    smallInput: '',
    disabledInput: '禁用状态的输入框',
    readonlyInput: '只读状态的输入框'
  }
  message.info('表单已重置')
}

// 填充示例数据
function fillSampleData() {
  formData.value = {
    basicInput: '这是基础输入框的内容',
    clearableInput: '这里有清除按钮',
    prefixInput: 'johnsmith',
    suffixInput: 'example.com',
    addonBeforeInput: 'www.example.com',
    addonAfterInput: 'username',
    password: '123456789',
    limitedInput: '限制20字符的内容',
    countInput: '这里会显示字符计数',
    largeInput: '大尺寸输入框内容',
    smallInput: '小尺寸内容',
    disabledInput: '禁用状态的输入框',
    readonlyInput: '只读状态的输入框'
  }
  message.success('已填充示例数据')
}

// 显示表单数据
function showFormData() {
  console.log('当前表单数据:', formData.value)
  message.info('表单数据已输出到控制台')
}
</script>

<template>
  <div>
    <Alert 
      message="输入框控件演示" 
      description="展示各种输入框的配置选项和使用场景，包括基础输入框、密码框、带图标的输入框等。" 
      type="info" 
      show-icon 
      style="margin-bottom: 16px;"
    />

    <!-- 操作按钮 -->
    <Card size="small" style="margin-bottom: 16px;">
      <Space>
        <Button @click="handleReset">重置表单</Button>
        <Button type="dashed" @click="fillSampleData">填充示例数据</Button>
        <Button type="primary" @click="showFormData">查看数据</Button>
      </Space>
    </Card>

    <!-- 表单 -->
    <Card title="输入框控件展示">
      <StdForm
        ref="formRef"
        v-model:data="formData"
        :columns="columns"
        label-align="right"
        layout="vertical"
      />
    </Card>

    <!-- 配置说明 -->
    <Card title="配置参数说明" size="small" style="margin-top: 16px;">
      <div style="line-height: 1.6;">
        <h4>基础属性:</h4>
        <ul>
          <li><code>placeholder</code>: 输入框占位符文本</li>
          <li><code>allowClear</code>: 是否显示清除按钮</li>
          <li><code>maxLength</code>: 最大输入长度</li>
          <li><code>showCount</code>: 是否显示字符计数</li>
          <li><code>disabled</code>: 是否禁用</li>
          <li><code>readonly</code>: 是否只读</li>
        </ul>

        <Divider />

        <h4>样式属性:</h4>
        <ul>
          <li><code>size</code>: 输入框尺寸 (large | middle | small)</li>
          <li><code>prefix</code>: 前缀图标或文本</li>
          <li><code>suffix</code>: 后缀图标或文本</li>
          <li><code>addonBefore</code>: 前置标签</li>
          <li><code>addonAfter</code>: 后置标签</li>
        </ul>

        <Divider />

        <h4>特殊类型:</h4>
        <ul>
          <li><code>type: 'input'</code>: 普通输入框</li>
          <li><code>type: 'password'</code>: 密码输入框，自动隐藏内容</li>
          <li><code>type: 'textarea'</code>: 多行文本输入</li>
        </ul>

        <div style="margin-top: 12px; padding: 8px; background: #f6f8fa; border-radius: 4px;">
          <strong>提示:</strong> 所有 Ant Design Vue Input 组件的属性都可以通过 <code>input</code> 或 <code>password</code> 配置项传递。
        </div>
      </div>
    </Card>

    <!-- 表单数据预览 -->
    <Card title="表单数据预览" size="small" style="margin-top: 16px;">
      <pre style="background: #f6f8fa; padding: 12px; border-radius: 4px; overflow-x: auto; font-size: 12px;">{{ JSON.stringify(formData, null, 2) }}</pre>
    </Card>
  </div>
</template>

<style scoped>
:deep(.ant-card-head) {
  min-height: auto;
}

:deep(.ant-card-body) {
  padding: 16px;
}

:deep(.ant-form-item-label) {
  font-weight: 500;
}

:deep(.ant-form-item-explain) {
  font-size: 12px;
  color: #666;
}

pre {
  margin: 0;
  line-height: 1.4;
}
</style>