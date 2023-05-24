<script setup lang="ts">
import CustomUpload from './components/CustomUpload.vue'
defineOptions({
  name: 'TheUpload'
})
</script>

<template>
  <n-space vertical>
    <n-card title="示例1：自定义上传 custom-request" hoverable>
      <CustomUpload />
    </n-card>
  </n-space>
</template>

<style lang="scss" scoped></style>
