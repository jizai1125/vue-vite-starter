<script lang="ts">
export default {
  name: 'TheList'
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
const list = ref<any>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const error = ref(false)

const handleLoad = async () => {
  console.log('load...', list.value)
  try {
    // 请求数据
    const res = await new Promise<number[]>((resolve) =>
      setTimeout(() => {
        const data = new Array(10).fill(null).map((i) => Math.random() * 10)
        resolve(data)
      }, 1000)
    )
    // 下拉刷新，
    if (refreshing.value) {
      list.value = []
      refreshing.value = false
    }
    // 全部加载完毕
    if (list.value.length >= 20) {
      finished.value = true
    }
    list.value.push(...res)
  } catch (err) {
    console.log(err)
    error.value = true
  }
  loading.value = false
}

const handleRefresh = () => {
  finished.value = false
  loading.value = true
  handleLoad()
}
</script>

<template>
  <div class="list-container g-container">
    <van-pull-refresh v-model="refreshing" @refresh="handleRefresh">
      <van-list
        v-model:loading="loading"
        v-model:error="error"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        offset="100"
        @load="handleLoad">
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style lang="scss" scoped>
.list-container {
}
</style>
