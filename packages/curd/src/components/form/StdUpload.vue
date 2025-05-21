<!-- TODO: 该组件未完成，请勿使用 -->
<script setup lang="ts">
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'
import type { UploadConfig } from '../../types'
import { DeleteOutlined, FileOutlined, FolderOutlined, InboxOutlined } from '@ant-design/icons-vue'
import { Button, Flex, Form, FormItemRest, Progress, RadioButton, RadioGroup, UploadDragger } from 'ant-design-vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { props } = defineProps<{ props?: UploadConfig & { placeholder?: string | number } }>()

const { t } = useI18n()

const formContext = Form.useInjectFormItemContext()

const fileList = defineModel<UploadChangeParam['fileList']>('value', { default: () => [] })

// 文件上传相关
const uploadLoading = ref<boolean>(false)
const uploadProgress = ref<number>(0)
const processingFiles = ref<number>(0)
const totalFiles = ref<number>(0)
const uploadStatus = ref<string>('')
const uploadMode = ref<'file' | 'directory'>('file') // 上传模式控制

const uploadProps = computed<UploadProps>(() => ({
  multiple: props?.multiple,
  directory: uploadMode.value === 'directory', // 根据模式决定是否支持文件夹
  fileList: fileList.value,
  beforeUpload: () => false, // 阻止自动上传
  onChange(info: UploadChangeParam) {
    fileList.value = info.fileList
    formContext.onFieldChange()
  },
  onRemove: (file) => {
    // 从fileList中移除选中的文件
    const index = fileList.value.findIndex(item => item.uid === file.uid)
    if (index !== -1) {
      const newFileList = fileList.value.slice()
      newFileList.splice(index, 1)
      fileList.value = newFileList
    }
    formContext.onFieldChange()
    return true
  },
  showUploadList: false, // 不使用默认的上传列表，我们自定义展示
}))

// 从上传文件列表中移除指定索引的文件
function removeFile(index: number) {
  const newFileList = fileList.value.slice()
  newFileList.splice(index, 1)
  fileList.value = newFileList
  formContext.onFieldChange()
}
</script>

<template>
  <FormItemRest>
    <RadioGroup
      v-if="props?.multiple"
      v-model:value="uploadMode"
      class="mb-4"
    >
      <RadioButton value="file">
        <FileOutlined /> {{ t('upload.uploadFiles') }}
      </RadioButton>
      <RadioButton value="directory">
        <FolderOutlined /> {{ t('upload.uploadFolders') }}
      </RadioButton>
    </RadioGroup>

    <UploadDragger v-bind="uploadProps">
      <Flex
        vertical
        justify="center"
        align="center"
        class="w-full h-full"
      >
        <p class="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p class="ant-upload-text">
          {{ uploadMode === 'file'
            ? t('upload.mainTipsForFiles')
            : t('upload.mainTipsForFolders')
          }}
        </p>
        <p class="ant-upload-hint max-w-80%">
          {{ uploadMode === 'file'
            ? t('upload.subTipsForFiles')
            : t('upload.subTipsForFolders')
          }}
        </p>
      </Flex>
    </UploadDragger>

    <!-- 已选文件列表 -->
    <div
      v-if="fileList.length > 0"
      class="mt-4"
    >
      <div class="flex justify-between items-center mb-2">
        <div class="font-medium">
          {{ t('upload.selectedFiles', { count: fileList.length }) }}
        </div>
      </div>

      <div class="max-h-60 overflow-y-auto border border-gray-200 rounded p-2">
        <Flex
          v-for="(file, index) in fileList"
          :key="index"
          justify="space-between"
          align="center"
          class="p-2 hover:bg-gray-50 border-b border-gray-100 last:border-0"
        >
          <Flex
            align="center"
            gap="8"
            class="overflow-hidden"
          >
            <FileOutlined class="text-blue-500" />
            <div class="truncate max-w-100">
              {{ file.name }}
              <div class="text-xs text-gray-500">
                <template v-if="file.originFileObj?.webkitRelativePath">
                  {{ t('upload.path') }}: {{ file.originFileObj?.webkitRelativePath }}
                </template>
                <template v-else>
                  {{ t('upload.size') }}: {{ ((file.size || file.originFileObj?.size || 0) / 1024).toFixed(1) }} KB
                </template>
              </div>
            </div>
          </Flex>
          <Button
            type="text"
            danger
            @click="removeFile(index)"
          >
            <DeleteOutlined />
          </Button>
        </Flex>
      </div>
    </div>

    <div
      v-if="uploadLoading"
      class="mt-4"
    >
      <Progress
        :percent="uploadProgress"
        status="active"
      />
      <div class="text-center text-gray-500 mt-2">
        {{ uploadStatus }}
      </div>
      <div class="text-center text-gray-500">
        {{ t('upload.processing', { count: processingFiles, total: totalFiles }) }}
      </div>
    </div>
  </FormItemRest>
</template>
