<script setup lang="ts">
import BasicUpload from './BasicUpload.vue'
import CustomUpload from './CustomUpload.vue'
import CustomFileList from './CustomFileList.vue'
defineOptions({
  name: 'TheUpload'
})
</script>

<template>
  <n-space vertical>
    <n-card title="基础用法" hoverable>
      <n-p>
        1. 上传文件；通过设置上传地址
        <n-text code>action</n-text>，使用组件自带的上传请求方式；组件内部是通过创建 XMLHttpRequest
        来上传。
      </n-p>
      <n-p> 2. 取消上传；点击取消按钮时，组件内部会调用 xhr.abort() 方法取消上传请求。</n-p>
      <n-p> 3. 删除文件；在点击删除按钮时通过请求接口删除。 </n-p>
      <BasicUpload />
    </n-card>
    <n-card title="自定义上传" hoverable>
      <n-p>
        1. 上传文件；通过自定义上传方法
        <n-text code>custom-request</n-text>上传文件，在其中通过接口上传。
      </n-p>
      <n-p>
        2. 取消上传；通过 AbortController 取消上传请求，维护一个文件 id 及对应 abortController 的
        Map
        <n-text code>abortControllerMap(fileId => abortController)</n-text>，在点击取消按钮时会触发
        remove 事件，在其中获取对应的 abortController，然后调用 abortController.abort() 来取消请求。
      </n-p>
      <n-p> 3. 删除文件；在点击删除按钮时通过请求接口删除。 </n-p>
      <CustomUpload />
    </n-card>
    <n-card title="自定义文件列表" hoverable>
      <n-p>1. 上传文件：同基础用法</n-p>
      <n-p>2. 取消上传：由封装的文件列表组件实现</n-p>
      <n-p>3. 删除文件：由封装的文件列表组件实现</n-p>
      <CustomFileList />
    </n-card>
  </n-space>
</template>

<style lang="scss" scoped></style>
