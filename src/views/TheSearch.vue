<script lang="ts">
export default {
  name: 'TheSearch'
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { Toast } from 'vant'

const keyword = ref('')
const onSearch = (val: string) => {
  console.log(val)
  Toast(val)
}
const onSearchBtnClick = () => {
  onSearch(keyword.value)
}
</script>

<template>
  <div class="search-container g-container">
    <van-search v-model="keyword" show-action placeholder="请输入搜索关键词" @search="onSearch">
      <template #action>
        <div @click="onSearchBtnClick">搜索</div>
      </template>
    </van-search>
  </div>
</template>

<style lang="scss" scoped>
.search-container {
}
</style>
