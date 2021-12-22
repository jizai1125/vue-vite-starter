<script setup lang="ts">
import { getList } from 'api/index'
import useAppStore from '@/store'
import { storeToRefs } from 'pinia'

const store = useAppStore()
// 解构会失去响应，可以用 storeToRefs 包裹，类似 vue 的 toRefs
const { title, user } = storeToRefs(store)

getList().then((res) => {
  console.log('getList result', res)
})
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
  <h1>{{ title }}</h1>
  <p>name: {{ user.username }} | role: {{ store.userRole }}</p>
  <button @click="store.changeTitle">store action changeTitle</button>
  <button @click="changName('test')">change username</button>
  <button @click="changeUserData({ username: 'test', role: 'test' })">change user</button>
  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Docs </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
