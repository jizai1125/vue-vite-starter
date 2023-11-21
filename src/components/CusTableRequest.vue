<script setup lang="ts">
import { ref, reactive, useAttrs, computed } from 'vue'
import type { AxiosRequestConfig } from 'axios'
import request, { type ExtRequestMethod } from '@/utils/request'
import { type PaginationInfo } from 'naive-ui'
import axios from 'axios'

const props = withDefaults(
  defineProps<{
    // 接口地址
    url: string
    // 请求方法， 默认 post
    method?: ExtRequestMethod
    // 请求额外参数
    params?: object
    // 每页条数字段名, 默认 pageSize
    pageSizeField?: string
    // 页码字段名，默认 pageNum
    pageIndexField?: string
    // 每页条数，默认 10
    pageSize?: number
    pageSizes?: number[]
    // 是否立即请求，默认 true
    immediate?: boolean
    // axios config
    config?: AxiosRequestConfig
    // 返回结果适配器
    resAdapter?(res: any): { list: []; total?: number; pages?: number }
  }>(),
  {
    method: 'post',
    params: undefined,
    pageSizeField: 'pageSize',
    pageIndexField: 'pageNum',
    pageSize: 10,
    pageSizes: () => [10, 20, 30, 40],
    immediate: true,
    resAdapter: (res: any) => {
      return {
        list: res.list,
        total: res.total,
        pages: res.page
      }
    }
  }
)
const pagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: props.pageSize,
  itemCount: 0,
  pageSizes: props.pageSizes,
  'show-size-picker': true,
  'show-quick-jumper': true,
  prefix({ itemCount }: PaginationInfo) {
    return `总共 ${itemCount} 条数据`
  }
})
const tableData = ref([])

const attrs = useAttrs()
const disablePaigination = computed(
  () => typeof attrs.pagination === 'boolean' && !attrs.pagination
)
const loading = ref(false)
let abortControllerInst: AbortController
const handlePageChange = async (currentPage: number = pagination.page) => {
  // 取消上次未响应请求
  if (abortControllerInst) {
    abortControllerInst.abort()
  }
  abortControllerInst = new AbortController()
  tableData.value = []
  if (!props.url) {
    console.warn('[CusTableRequest]: 未配置 url 属性')
    return
  }
  loading.value = true
  let params = props.params

  if (!disablePaigination.value) {
    params = {
      ...params,
      [props.pageSizeField]: pagination.pageSize,
      [props.pageIndexField]: currentPage
    }
  }
  try {
    const result = await request<any>(props.method, props.url, params, {
      ...props.config,
      signal: abortControllerInst.signal
    })
    const { list, total, pages } = props.resAdapter(result)
    tableData.value = list || []
    if (!disablePaigination.value) {
      pagination.page = currentPage
      pagination.pageCount = pages as number
      pagination.itemCount = total as number
    }
    loading.value = false
  } catch (err) {
    if (!axios.isCancel(err)) {
      loading.value = false
    }
    console.error(err)
  }
}
const handlePageSizeChnage = (pageSize: number) => {
  pagination.pageSize = pageSize
  handlePageChange(1)
}
if (props.immediate) {
  handlePageChange()
}

defineExpose({
  query: handlePageChange,
  data: tableData,
  pagination
})
</script>

<template>
  <n-data-table
    class="base-table-with-request"
    remote
    :loading="loading"
    :pagination="pagination"
    :data="tableData"
    :row-key="(r) => r.id"
    v-bind="$attrs"
    @update:page="handlePageChange"
    @update:page-size="handlePageSizeChnage"></n-data-table>
</template>

<style lang="scss" scoped>
.base-table-with-request {
  :deep(.n-data-table__pagination) {
    justify-content: center;
  }
}
</style>
