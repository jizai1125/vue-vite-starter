<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useMessage, type UploadCustomRequestOptions, type UploadFileInfo } from 'naive-ui'
import axios from 'axios'
import { type UploadedFileInfo } from './interface'

const message = useMessage()
// 用于取消请求，file id => abortController
const abortControllerMap = new Map<UploadFileInfo['id'], AbortController>()
// 所有文件
const fileListRef = ref<UploadFileInfo[]>([])
// 已上传文件列表
const uploadedFileList = reactive<UploadedFileInfo[]>([])
const loadingRef = ref(false)

async function customRequest(options: UploadCustomRequestOptions) {
  console.log('[customRequest]', options)
  const fileInfo = options.file
  const file = fileInfo.file as File
  const abortController = new AbortController()
  abortControllerMap.set(fileInfo.id, abortController)
  loadingRef.value = true
  let formData = new FormData()
  formData.append('tfile', file, file.name)
  try {
    const res = await axios.post(
      '/api/api/application/upload?applicationId=SG20230407JKEAY9BSF6A&bizType=3',
      formData,
      {
        signal: abortController.signal,
        headers: {
          Authorization: 'Bearer 7df83894-fef1-4ff5-900a-0a6cbbd867eb'
        },
        // 上传进度
        onUploadProgress: (e) => {
          const percent = Math.ceil((e.loaded / e.total) * 100)
          options.onProgress({ percent })
        }
      }
    )
    console.log(res.data)
    // 上传失败
    if (res.data.isError) {
      throw new Error(res.data.error)
    }
    const response = res.data.data.pop()
    uploadedFileList.push({
      ...fileInfo,
      status: 'finished',
      response
    })
    options.onFinish()
    message.success('上传成功')
  } catch (error: any) {
    message.error(error.message)
    options.onError()
  }
  loadingRef.value = false
  abortControllerMap.delete(fileInfo.id)
}
// 点击删除\取消按钮触发，返回 false 不会删除该文件
async function handleRemove(options: {
  file: UploadFileInfo
  fileList: Array<UploadFileInfo>
}): Promise<boolean> {
  const fileInfo = options.file
  // 如果文件还在上传，则取消请求，并删除文件
  const abortController = abortControllerMap.get(fileInfo.id)
  if (abortController) {
    abortController.abort()
    return true
  }
  const targetFileIdx = uploadedFileList.findIndex((it) => it.id === fileInfo.id)
  const targetFile = targetFileIdx > -1 ? uploadedFileList[targetFileIdx] : null
  console.log(targetFileIdx, targetFile)
  if (!targetFile?.response) return true
  // 请求删除接口
  try {
    const res = await axios.get(`/api/fileStore/deleteById/${targetFile.response.id}`)
    if (res.data.isError) {
      throw new Error(res.data.error)
    }
    message.success('删除成功！')
    uploadedFileList.splice(targetFileIdx, 1)
    return true
  } catch (error: any) {
    message.error(error.message)
    return false
  }
}
</script>

<template>
  <n-upload
    v-model:file-list="fileListRef"
    show-download-button
    :custom-request="customRequest"
    @remove="handleRemove">
    <n-button :loading="loadingRef">上传文件</n-button>
  </n-upload>
  <n-divider>相关数据</n-divider>
  <n-collapse>
    <n-collapse-item title="fileListRef (所有文件)">
      <pre>{{ fileListRef }}</pre>
    </n-collapse-item>
    <n-collapse-item title="uploadedFileList（上传成功的文件）">
      包含自定义字段 <n-text code>response</n-text>（请求的响应数据）
      <pre>{{ uploadedFileList }}</pre>
    </n-collapse-item>
  </n-collapse>
</template>
