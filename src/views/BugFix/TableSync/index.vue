<script setup lang="ts">
import Bug from './Bug.vue'
import Fix1 from './Fix-1.vue'
import Fix2 from './Fix-2.vue'

defineOptions({
  name: 'TheForm'
})
</script>

<template>
  <n-h2>表格表头、表体同步滚动（有遗留问题）</n-h2>
  <n-divider title-placement="left">问题复现</n-divider>
  <n-p>
    复现步骤：1. 鼠标点击表头，此时按键盘左右键，表格横向滚动没问题；
    2.再把鼠标移入表体，按键盘左右键，会发现表头滚动而表体没动。
  </n-p>
  <Bug />
  <n-divider title-placement="left">解决思路</n-divider>
  <n-p>
    第一种思路：在每次滚动中取 head 或 body 的 scrollLeft 和上一次滚动记录下的 lastScrollLeft
    （初始为 0）比较来判断当前主动滚动部分是哪个，这里取 head 部分的 scrollLeft，如果差值不为
    0，说明当前主动滚动部分为 head，否则为 body。
  </n-p>
  <Fix1 />
  <n-divider />
  <n-p>
    第二种思路：主动滚动部分肯定会先触发滚动事件，所以可以在 header \ body 的 scroll
    事件处理函数中判断 scrollPartRef 是否存在，不存在则将 scrollPartRef 设为对应的
    'head'\'body'（即为主动滚动部分），然后调用 syncScrollState 同步被动部分的 scrollLeft。
  </n-p>
  <Fix2 />
  <n-divider title-placement="left">遗留问题</n-divider>
  发现在 Safari 中滚动有弹性效果导致会有一点点小问题； <br />
  复现步骤：<br />
  1. 鼠标先点击表头，让焦点在表头上；<br />
  2. 鼠标移入表体，使用触控板快速滑动，有弹性效果； <br />
  3. 按键盘左键，第一下滚动表头会滚动，表体没动。<br />
  <n-image
    src="https://user-images.githubusercontent.com/33979706/250840659-050c301d-684f-4e7b-8269-dafb8b5299b3.gif"></n-image>
</template>
