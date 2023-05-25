<script setup lang="ts">
import { useMessage, useDialog, type UploadFileInfo } from 'naive-ui'
import axios from 'axios'
import { ref, reactive, watchEffect, h } from 'vue'
import { type UploadedFileInfo } from './interface'

const message = useMessage()
const dialog = useDialog()

const loadingRef = ref(false)
// 所有文件
const fileListRef = ref<UploadFileInfo[]>([])
// 已上传文件列表
const uploadedFileList = reactive<UploadedFileInfo[]>([])

watchEffect(() => {
  loadingRef.value = fileListRef.value.some((item) => item.status === 'uploading')
})

function handleFinish(options: { file: UploadFileInfo; event?: ProgressEvent }) {
  console.log('[handleFinish]', options.file.status, options)
  if (options.file.status === 'finished') {
    console.log((options.event?.target as XMLHttpRequest).response)
    message.success(`${options.file.name} 上传成功！`)
    const response = (options.event?.target as XMLHttpRequest).response?.data.pop()
    uploadedFileList.push({
      ...options.file,
      response
    })
  }
}

// 点击删除\取消按钮触发，返回 false 不会删除该文件
async function handleRemove(options: {
  file: UploadFileInfo
  fileList: Array<UploadFileInfo>
}): Promise<boolean> {
  console.log('[handleRemove]', options)
  const fileInfo = options.file
  // 如果是点击取消按钮，则不用请求删除接口
  if (fileInfo.status !== 'finished') return true
  await createConfirmDialog()

  let m = message.loading(`正在删除文件 ${fileInfo.name}...`, {
    duration: 0
  })
  // 请求删除接口
  const targetFileIdx = uploadedFileList.findIndex((it) => it.id === fileInfo.id)
  const targetFile = targetFileIdx > -1 ? uploadedFileList[targetFileIdx] : null
  console.log(targetFileIdx, targetFile)
  if (!targetFile?.response) return true
  try {
    const res = await axios.get(`/api/fileStore/deleteById/${targetFile.response.id}`)
    if (res.data.isError) {
      throw new Error(res.data.error)
    }
    m.destroy()
    message.success(`${fileInfo.name} 删除成功！`)
    uploadedFileList.splice(targetFileIdx, 1)
    return true
  } catch (error: any) {
    message.error(error.message)
  }
  m.destroy()
  return false
}

function handleError(options: { file: UploadFileInfo; event?: ProgressEvent }) {
  console.log(options)
  message.error(`${options.file.name} 上传失败！`)
}

function handleDownload(file: UploadFileInfo) {
  console.log('[handleDownload]', file)
  message.success(`下载成功：${file.name}`)
}

function normalizeHeaders() {
  return {
    Authorization: 'Bearer 7df83894-fef1-4ff5-900a-0a6cbbd867eb'
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
      return false
    }
  })
  await new Promise((r) => (doDeleteResolve = r))
  return d
}
</script>

<template>
  <n-upload
    v-model:file-list="fileListRef"
    action="/api/api/application/upload?applicationId=SG20230407JKEAY9BSF6A&bizType=3"
    method="post"
    response-type="json"
    :headers="normalizeHeaders"
    name="tfile"
    show-download-button
    @finish="handleFinish"
    @remove="handleRemove"
    @error="handleError"
    @download="handleDownload">
    <n-button :loading="loadingRef">上传文件</n-button>
  </n-upload>
  <n-divider>相关数据</n-divider>
  <n-collapse>
    <n-collapse-item title="fileListRef (所有文件)">
      <pre>{{ fileListRef }}</pre>
    </n-collapse-item>
    <n-collapse-item title="uploadedFileList (上传成功的文件)">
      包含自定义字段 <n-text code>response</n-text>（请求的响应数据）
      <pre>{{ uploadedFileList }}</pre>
    </n-collapse-item>
  </n-collapse>
</template>
