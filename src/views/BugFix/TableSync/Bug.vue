<script setup lang="ts">
import { ref } from 'vue'

const scrollPartRef = ref() // 当前滚动部分，值为 'head' 或 'body'
const headerRef = ref()
const bodyRef = ref()

function handleHeaderScroll() {
  console.log('<<< Header scroll start >>>', scrollPartRef.value)
  if (scrollPartRef.value === 'head') {
    syncScrollState()
  }
}

function handleBodyScroll() {
  console.log('<<< Body scroll start >>>', scrollPartRef.value)
  if (scrollPartRef.value === 'body') {
    syncScrollState()
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

function handleHeaderMouseenter() {
  scrollPartRef.value = 'head'
  console.log('[Header mouseenter] scrollPartRef', 'head')
}
function handleHeaderMouseleave() {
  scrollPartRef.value = 'body'
  console.log('[Header mouseleave] scrollPartRef', 'body')
}
function handleBodyMouseenter() {
  scrollPartRef.value = 'body'
  console.log('[Body mouseenter] scrollPartRef', 'body')
}
</script>

<template>
  <div>xxxxx</div>
  <div class="wrap">
    <p>scrollPart：{{ scrollPartRef }}</p>
    <div
      ref="headerRef"
      class="header"
      @mouseenter="handleHeaderMouseenter"
      @mouseleave="handleHeaderMouseleave"
      @scroll="handleHeaderScroll">
      <div class="content" tabIndex="-1">
        head-head-head-head-head-head-head-head-head-head-head-head-head-head-head-head-head-head-head-head-head-head-head
      </div>
    </div>
    <div ref="bodyRef" class="body" @mouseenter="handleBodyMouseenter" @scroll="handleBodyScroll">
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
