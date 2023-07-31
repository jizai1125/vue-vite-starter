<script setup lang="ts">
import { ref, shallowRef, reactive, useAttrs, computed } from 'vue'
import request, { type ExtRequestMethod } from '@/utils/request'
defineOptions({
  name: 'CusTableWithRequest'
})
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
    // 是否立即请求，默认 true
    immediate?: boolean
    // 返回结果适配器
    resAdapter?(res: object): { list: []; total?: number; pages?: number }
  }>(),
  {
    method: 'post',
    params: undefined,
    pageSizeField: 'pageSize',
    pageIndexField: 'pageNum',
    pageSize: 10,
    immediate: true,
    resAdapter: (res: any) => {
      return {
        list: res.records,
        total: res.total,
        pages: res.pages
      }
    }
  }
)
const pagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: props.pageSize,
  itemCount: 0,
  pageSizes: [10, 20, 30, 40],
  'show-size-picker': true,
  'show-quick-jumper': true
})
const tableData = shallowRef([])

const attrs = useAttrs()
const disablePaigination = computed(
  () => typeof attrs.pagination === 'boolean' && !attrs.pagination
)
const loading = ref(false)
const handlePageChange = async (currentPage: number = pagination.page) => {
  loading.value = true
  let params = {
    ...props.params
  }
  if (!disablePaigination.value) {
    params = {
      ...params,
      [props.pageSizeField]: pagination.pageSize,
      [props.pageIndexField]: currentPage
    }
  }
  try {
    tableData.value = []
    const result = await request<any>(props.method, props.url, params)
    const { list, total, pages } = props.resAdapter(result)
    tableData.value = list
    if (!disablePaigination.value) {
      pagination.page = currentPage
      pagination.pageCount = pages as number
      pagination.itemCount = total as number
    }
  } catch (err) {
    console.error(err)
  }
  loading.value = false
}
const handlePageSizeChnage = (pageSize: number) => {
  pagination.pageSize = pageSize
  handlePageChange()
}
if (props.immediate) {
  handlePageChange()
}

defineExpose({
  query: handlePageChange,
  data: tableData
})
</script>

<template>
  <n-data-table
    class="base-table-with-request"
    remote
    :loading="loading"
    :pagination="pagination"
    :data="tableData"
    :row-key="(row: any) => row.id"
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
