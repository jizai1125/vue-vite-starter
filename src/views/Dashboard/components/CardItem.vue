<script setup lang="ts">
import { resolveAssetFile } from '@/utils'
import { computed } from 'vue'
import CountUp from 'vue-countup-v3'

const props = defineProps<{
  title: string
  value: string | number
  suffix?: string
  color?: string
  titleStyle?: object
  valueString?: object
  bgImg?: string
}>()
const bgImage = computed(() => props.bgImg && resolveAssetFile(props.bgImg))
</script>

<template>
  <div
    class="card-item"
    :style="{
      background: `url(${bgImage}) 0 0/100% 100% no-repeat`
    }">
    <div class="title">{{ title }}</div>
    <div class="content">
      <count-up class="value" :end-val="value" :options="{ suffix: suffix || '' }"></count-up>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-item {
  width: 260px;
  max-width: 20%;
  height: 100px;
  padding: 15px 24px 0;
  color: v-bind('props.color');
  .title {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .value {
      font-size: 42px;
      font-family: DINPro-Bold, DINPro;
      font-weight: bold;
    }
  }
}
</style>
