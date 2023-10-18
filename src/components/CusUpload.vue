<script setup lang="ts">
import { ref, computed, watchEffect, h } from 'vue'
import { useMessage, useDialog, type UploadFileInfo } from 'naive-ui'
import { getToken } from '@/utils/auth'
import { useAttrs } from 'vue'
// import { deleteFile } from '@/api'
// TODO delete file api
const deleteFile = (id: any) => {
  return Promise.resolve({})
}

const message = useMessage()
const dialog = useDialog()

const loadingRef = ref(false)
// 所有文件
const fileListRef = defineModel<UploadFileInfo[]>('fileList', { default: () => [] })

watchEffect(() => {
  loadingRef.value = fileListRef.value.some((item) => item.status === 'uploading')
})

function handleFinish(options: { file: UploadFileInfo; event?: ProgressEvent }) {
  console.log('[handleFinish]', options.file.status, options)
  if (options.file.status === 'finished') {
    console.log((options.event?.target as XMLHttpRequest).response)
    message.success(`${options.file.name} 上传成功！`)
    const response = (options.event?.target as XMLHttpRequest).response?.data
    options.file.url = response
  }
}
const attrs = useAttrs()
const ossDirRef = computed(() => {
  const s = /\/oss\/([^/]+)\/upload/.exec(attrs.action as string)
  return s ? s[1] : undefined
})
// 点击删除\取消按钮触发，返回 false 不会删除该文件
async function handleRemove(options: {
  file: UploadFileInfo
  fileList: Array<UploadFileInfo>
}): Promise<boolean> {
  console.log('[handleRemove]', options.file.status, options)
  const fileInfo = options.file
  // 如果是未上传成功，则不用请求删除接口
  if (fileInfo.status !== 'finished') return true
  await createConfirmDialog()

  let m = message.loading(`正在删除文件 ${fileInfo.name}...`, {
    duration: 0
  })

  const targetFileIdx = fileListRef.value.findIndex((it) => it.id === fileInfo.id)
  const targetFile = targetFileIdx > -1 ? fileListRef.value[targetFileIdx] : null
  console.log(targetFileIdx, targetFile)
  if (!targetFile) return true
  try {
    await deleteFile(`/${ossDirRef.value}/${targetFile.name}`)
    message.success(`${fileInfo.name} 删除成功！`)
    m.destroy()
    return true
  } catch (error: any) {
    console.log(error)
  }
  m.destroy()
  return false
}

function handleError(options: { file: UploadFileInfo; event?: ProgressEvent }) {
  console.log(options)
  message.error(`${options.file.name} 上传失败！`)
}

function normalizeHeaders() {
  return {
    Authorization: getToken()
  }
}

async function createConfirmDialog() {
  let doDeleteResolve: any
  const d = dialog.warning({
    title: '提示',
    content: () => h('h3', { style: { fontWeight: 400 } }, '确定删除该文件？'),
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      d.loading = true
      doDeleteResolve()
    }
  })
  await new Promise((r) => (doDeleteResolve = r))
  return d
}
</script>

<template>
  <n-upload
    v-model:file-list="fileListRef"
    :disabled="loadingRef"
    method="post"
    response-type="json"
    :headers="normalizeHeaders"
    name="file"
    list-type="image-card"
    show-download-button
    v-bind="$attrs"
    @finish="handleFinish"
    @remove="handleRemove"
    @error="handleError">
    <slot :loading="loadingRef"> </slot>
  </n-upload>
</template>
