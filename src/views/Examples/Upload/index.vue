<script setup lang="ts">
import { type UploadFileInfo } from 'naive-ui'
import { ref } from 'vue'
const onchange = (options: {
  file: UploadFileInfo
  fileList: Array<UploadFileInfo>
  event?: Event
}) => {
  console.log(options.file.status, options.file, options.fileList)
  if (options.file.status === 'finished') {
    //
  }
}
const fileListRef = ref<UploadFileInfo[]>([])
const handleFinish = (options: { file: UploadFileInfo }) => {
  console.log('handleFinish', options.file)
  fileListRef.value.push(options.file)
}
</script>

<template>
  <div class="upload-root">
    <n-upload
      action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
      @change="onchange"
      @finish="handleFinish">
      <n-button>上传文件</n-button>
    </n-upload>
    {{ fileListRef }}
  </div>
</template>

<style lang="scss" scoped>
.upload-root {
}
</style>
