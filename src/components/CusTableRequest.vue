<script setup lang="ts">
import { ref, reactive, useAttrs, computed } from 'vue'
import type { AxiosRequestConfig } from 'axios'
import request, { type ExtRequestMethod } from '@/utils/request'
import { type PaginationInfo } from 'naive-ui'
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
    // 分页查询参数 pageSize \ pageIndex 是否在放在 query
    queryPagination?: boolean
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
    queryPagination: false,
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
const handlePageChange = async (currentPage: number = pagination.page) => {
  loading.value = true
  let params = props.params
  let queryParams

  if (!disablePaigination.value) {
    if (props.queryPagination) {
      queryParams = {
        [props.pageSizeField]: pagination.pageSize,
        [props.pageIndexField]: currentPage
      }
    } else {
      params = {
        ...params,
        [props.pageSizeField]: pagination.pageSize,
        [props.pageIndexField]: currentPage
      }
    }
  }
  try {
    tableData.value = []
    const result = await request<any>(props.method, props.url, params, {
      ...props.config,
      params: {
        ...props.config?.params,
        ...queryParams
      }
    })
    const { list, total, pages } = props.resAdapter(result)
    tableData.value = list || []
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
