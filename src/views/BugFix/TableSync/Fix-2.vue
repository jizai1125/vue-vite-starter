<script setup lang="ts">
import { ref } from 'vue'

const scrollPartRef = ref() // 当前滚动部分，值为 'head' 或 'body'
const headerRef = ref()
const bodyRef = ref()

function handleHeaderScroll() {
  console.log('[handleHeaderScroll]', scrollPartRef.value)
  if (!scrollPartRef.value) {
    console.log('<<< head scroll start >>>')
    scrollPartRef.value = 'head'
  }
  if (scrollPartRef.value === 'head') {
    syncScrollState()
  } else {
    scrollPartRef.value = undefined
    console.log('<<< body scroll end >>>')
    console.log('\n')
  }
}

function handleBodyScroll() {
  console.log('[handleBodyScroll]', scrollPartRef.value)
  if (!scrollPartRef.value) {
    console.log('<<< body scroll start >>>')
    scrollPartRef.value = 'body'
  }
  if (scrollPartRef.value === 'body') {
    syncScrollState()
  } else {
    scrollPartRef.value = undefined
    console.log('<<< head scroll end >>>')
    console.log('\n')
  }
}

let scrollLeft = 0
function syncScrollState() {
  if (scrollPartRef.value === 'head') {
    scrollLeft = headerRef.value.scrollLeft
    bodyRef.value.scrollLeft = scrollLeft
  } else {
    scrollLeft = bodyRef.value.scrollLeft
    headerRef.value.scrollLeft = scrollLeft
  }
  console.log('final scrollLeft', scrollLeft)
}
</script>

<template>
  <div class="wrap">
    <p>scrollPart：{{ scrollPartRef }}</p>
    <div ref="headerRef" class="header" @scroll="handleHeaderScroll">
      <div class="content" tabIndex="-1">
        head-head-head-head-head-head-head-head-head-head-head-head-head-head-head-head-head-head-head-head-head-head-head
      </div>
    </div>
    <div ref="bodyRef" class="body" @scroll="handleBodyScroll">
      <div class="content" tabIndex="-1">
        body-body-body-body-body-body-body-body-body-body-body-body-body-body-body-body-body-body-body-body-body-body-body
      </div>
    </div>
  </div>
</template>

<style>
.wrap {
  width: 600px;
}
.content {
  width: 1000px;
  height: 80px;
  background-color: lightblue;
}
.header {
  padding: 10px;
  background-color: lightgray;
  overflow: auto;
  margin-bottom: 20px;
}
.body {
  padding: 10px;
  background-color: lightgray;
  overflow: auto;
}
.content {
  border: 1px solid orange;
}
</style>
