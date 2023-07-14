<script setup lang="ts">
/** head & body 同步滚动思路： 有 head、body 两个滚动部分，当前主动滚动部分肯定会先触发滚动事件，
所以取 head\body 部分的 scrollLeft 和上一次滚动记录下的 lastScrollLeft
比较来判断当前主动滚动部分是哪个， 这里取 head 部分的 scrollLeft，如果差值不为
0，说明当前主动滚动部分为 head，否则为 body， 然后取当前主动滚动部分的 scrollLeft
来同步被动滚动部分的 scrollLeft 值 */
import { ref } from 'vue'

const scrollPart = ref() // 当前主动滚动部分
const headerRef = ref()

function handleHeaderScroll() {
  console.log('handleHeaderScroll', scrollPart.value)
  if (scrollPart.value !== 'body') {
    console.log('<<< head scroll start >>>')
    syncScrollState()
  } else {
    scrollPart.value = undefined
    console.log('<<< body scroll end >>>')
    console.log('\n')
  }
}

const bodyRef = ref()
function handleBodyScroll() {
  console.log('handleBodyScroll', scrollPart.value)
  if (scrollPart.value !== 'head') {
    console.log('<<< body scroll start >>>')
    syncScrollState()
  } else {
    scrollPart.value = undefined
    console.log('<<< head scroll end >>>')
    console.log('\n')
  }
}

let lastScrollLeft = 0
function syncScrollState() {
  console.log('syncScrollState before', scrollPart.value)
  // const directionBody = lastScrollLeft - bodyRef.value.scrollLeft;
  if (!scrollPart.value) {
    const directionHead = lastScrollLeft - headerRef.value.scrollLeft
    scrollPart.value = directionHead !== 0 ? 'head' : 'body'
  }
  console.log('syncScrollState after', scrollPart.value)
  if (scrollPart.value === 'head') {
    lastScrollLeft = headerRef.value.scrollLeft
    bodyRef.value.scrollLeft = lastScrollLeft
  } else {
    lastScrollLeft = bodyRef.value.scrollLeft
    headerRef.value.scrollLeft = lastScrollLeft
  }
  console.log('final scrollLeft', lastScrollLeft)
}
</script>

<template>
  <div class="wrap">
    <p>scrollPart：{{ scrollPart }}</p>
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
