<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useInterval } from '@vueuse/core'
import { watchEffect } from 'vue'

const router = useRouter()
const back = () => router.back()
const { counter, pause } = useInterval(1000, { controls: true })

watchEffect(() => {
  if (counter.value >= 5) {
    pause()
    back()
  }
})
</script>

<template>
  <n-result status="404" title="404 资源不存在" style="padding-top: 20vh">
    <template #footer>
      <n-button @click="back">返回上一页， {{ counter }} 秒后将自动跳转</n-button>
    </template>
  </n-result>
</template>

<style scoped></style>
