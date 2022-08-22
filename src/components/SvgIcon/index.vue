<script lang="ts">
export default {
  name: 'SvgIcon'
}
</script>
<script setup lang="ts">
import { computed, withDefaults } from 'vue'

interface Props {
  prefix?: string
  name: string
  color?: string
  size?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  name: '',
  color: undefined,
  size: 16
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
// CSSProperties
const svgStyle = computed(() => {
  const { size } = props
  let s = `${size}`
  s = `${s.replace('px', '')}px`
  return {
    width: s,
    height: s,
    fill: props.color
  }
})
</script>

<template>
  <svg aria-hidden="true" :style="svgStyle">
    <use :xlink:href="symbolId" />
  </svg>
</template>
