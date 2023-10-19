<script setup lang="ts" generic="T">
/**
 * 远程分页加载 + 搜索
 */
import { ref } from 'vue'
import { SelectOption } from 'naive-ui'
import { watchEffect } from 'vue'

type ApiResult = { list: []; finished: boolean }

const props = withDefaults(
  defineProps<{
    api: (keyword?: string) => Promise<T>
    resAdapter?: (res: T, options: SelectOption[]) => ApiResult
    extraOption?: SelectOption
  }>(),
  {}
)

const loadingRef = ref(false)
const finishedRef = ref(false)
const optionsRef = ref<SelectOption[]>([])

loadOptions()
watchEffect(() => {
  if (props.extraOption) {
    optionsRef.value = optionsRef.value.filter((it) => it.value === props.extraOption!.value)
    optionsRef.value.unshift(props.extraOption)
  }
})

function handleSelectSearch(value: string) {
  console.log('[handleSearch]', value)
  if (!value || !value.trim()) {
    console.warn('query is empty, not load options', value)
    return
  }
  loadOptions(value)
}
function handleSelectScroll(e: Event) {
  const currentTarget = e.currentTarget as HTMLElement
  // 触底加载数据
  if (currentTarget.scrollTop + currentTarget.offsetHeight >= currentTarget.scrollHeight) {
    loadOptions()
  }
}
function handleSelectClear() {
  finishedRef.value = false
  optionsRef.value = []
  loadOptions()
}
async function loadOptions(keyword?: string) {
  if (loadingRef.value || finishedRef.value) {
    console.warn('in loading or finished, not load options')
    return
  }
  loadingRef.value = true
  console.log('fetch data...')
  const res = await props.api(keyword)
  const { finished, list } = props.resAdapter
    ? props.resAdapter(res, optionsRef.value)
    : (res as ApiResult)
  loadingRef.value = false
  if (keyword) {
    optionsRef.value = list
  } else {
    finishedRef.value = finished
    optionsRef.value.push(...list)
  }
}
</script>

<template>
  <n-select
    :options="optionsRef"
    :loading="loadingRef"
    filterable
    clearable
    remote
    :reset-menu-on-options-change="false"
    @search="handleSelectSearch"
    @clear="handleSelectClear"
    @scroll="handleSelectScroll" />
</template>
