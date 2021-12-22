<script setup lang="ts">
import useAppStore from '@/store'
import { storeToRefs } from 'pinia'

const store = useAppStore()
// 解构会失去响应，可以用 storeToRefs 包裹，类似 vue 的 toRefs
const { title, user } = storeToRefs(store)

const changName = (name: string) => {
  store.user.username = name
}
const changeUserData = (user: object) => {
  // 使用 $patch 修改数据
  store.$patch({
    user
  })
  // 只修改某个属性
  // store.$patch((state) => {
  //   state.user.username = 'test'
  // })
}
</script>

<template>
  <div class="home-container">
    <h2 class="title">{{ title }}</h2>
    <van-row>
      <van-col span="5"> <van-icon name="https://vitejs.cn/logo.svg" /></van-col>
      <van-col span="5"><van-icon name="https://pinia.vuejs.org/logo.svg" /></van-col>
      <van-col span="4"><van-icon name="https://v3.cn.vuejs.org/logo.png" /></van-col>
      <van-col span="5">
        <van-icon
          name="https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae" />
      </van-col>
      <van-col span="5"> <van-icon name="https://img.yzcdn.cn/vant/logo.png" /></van-col>
    </van-row>
    <p>name: {{ user.username }} | role: {{ store.userRole }}</p>
    <van-button type="primary" block @click="store.changeTitle">
      store action changeTitle
    </van-button>
    <p></p>
    <van-button type="success" plain @click="changName('test')">change name</van-button>
    <van-button type="warning" plain @click="changeUserData({ username: 'test', role: 'test' })">
      change user
    </van-button>
  </div>
</template>

<style scoped>
.home-container {
  height: 100%;
  width: 100%;
  background-color: #fefef8;
  text-align: center;
}
.title {
  margin: 0;
  padding: 20px 0;
  text-align: center;
}
</style>
