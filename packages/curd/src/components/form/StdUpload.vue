<script setup lang="ts">
import type { UploadChangeParam, UploadFile, UploadProps } from 'ant-design-vue'
import type { FileType } from 'ant-design-vue/es/upload/interface'
import type { UploadConfig } from '../../types'
import { DeleteOutlined, FileOutlined, FolderOutlined, InboxOutlined } from '@ant-design/icons-vue'
import { Button, Flex, Form, FormItemRest, Progress, RadioButton, RadioGroup, UploadDragger } from 'ant-design-vue'
import { computed, ref, watch } from 'vue'
import { useLocale } from '../../composables'

const { props } = defineProps<{
  props?: UploadConfig
  placeholder?: string | number
  disabled?: boolean
}>()

const { beforeUpload, ...restProps } = props ?? {}

const { t } = useLocale()

const formContext = Form.useInjectFormItemContext()

// 支持字符串、字符串数组或文件对象数组
const modelValue = defineModel<string | string[] | UploadFile[]>('value', { default: () => [] })

// 内部文件列表状态
const internalFileList = ref<UploadFile[]>([])

watch(modelValue, (value) => {
  internalFileList.value = convertToFileList(value)
})

function convertToFileList(value: string | string[] | UploadFile[]) {
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === 'string') {
        return {
          uid: item,
          name: item,
          status: 'done',
          thumbUrl: item,
          url: item,
        }
      }
      return item
    })
  }
  else if (typeof value === 'string') {
    return [{
      uid: value,
      name: value,
      status: 'done',
      thumbUrl: value,
      url: value,
    }]
  }
  return [value]
}

// 文件上传相关
const uploadLoading = ref<boolean>(false)
const uploadProgress = ref<number>(0)
const processingFiles = ref<number>(0)
const totalFiles = ref<number>(0)
const uploadStatus = ref<string>('')
const uploadMode = ref<'file' | 'directory'>('file') // 上传模式控制

const uploadProps = computed<UploadProps>(() => ({
  directory: uploadMode.value === 'directory', // 根据模式决定是否支持文件夹
  fileList: internalFileList.value,
  beforeUpload: (file: FileType, fileList: FileType[]) => beforeUpload?.(file, fileList, modelValue),
  onChange(info: UploadChangeParam) {
    if (props?.multiple) {
      internalFileList.value = info.fileList
    }
    else {
      internalFileList.value = [info.file]
    }
    formContext.onFieldChange()
  },
  onRemove: (file) => {
    // 从fileList中移除选中的文件
    const index = internalFileList.value.findIndex(item => item.uid === file.uid)
    if (index !== -1) {
      const newFileList = internalFileList.value.slice()
      newFileList.splice(index, 1)
      internalFileList.value = newFileList
    }
    formContext.onFieldChange()
    return true
  },
  showUploadList: false, // 不使用默认的上传列表，我们自定义展示
  ...restProps,
}))

// 从上传文件列表中移除指定索引的文件
function removeFile(index: number) {
  const newFileList = internalFileList.value.slice()
  newFileList.splice(index, 1)
  internalFileList.value = newFileList
  formContext.onFieldChange()
}
</script>

<template>
  <FormItemRest>
    <RadioGroup
      v-if="props?.multiple"
      v-model:value="uploadMode"
      class="mb-4"
      :disabled
    >
      <RadioButton value="file">
        <FileOutlined /> {{ t('upload.uploadFiles') }}
      </RadioButton>
      <RadioButton value="directory">
        <FolderOutlined /> {{ t('upload.uploadFolders') }}
      </RadioButton>
    </RadioGroup>

    <UploadDragger
      :disabled
      v-bind="uploadProps"
    >
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
      v-if="!props?.showUploadList && internalFileList.length > 0"
      class="mt-4"
    >
      <div class="flex justify-between items-center mb-2">
        <div class="font-medium">
          {{ t('upload.selectedFiles', { count: internalFileList.length }) }}
        </div>
      </div>

      <div class="max-h-60 overflow-y-auto border border-gray-200 rounded p-2">
        <Flex
          v-for="(file, index) in internalFileList"
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
                <template v-else-if="file.url">
                  {{ t('upload.url') }}: {{ file.url }}
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
