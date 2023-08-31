<script setup lang="ts">
import type { DataTableColumn } from 'naive-ui'
import QueryForm, { type FormValue, formValue } from './QueryForm.vue'
import { ref } from 'vue'
import useCusTableRequest from '@/composables/useCusTableRequest'

const tableRef = ref()
const { queryTable, pagination } = useCusTableRequest(tableRef)

const columns: DataTableColumn[] = [
  {
    type: 'selection',
    disabled(row: any) {
      return row.name === 'Edward King 3'
    }
  },
  {
    title: '序号',
    key: 'no',
    render(_, i) {
      if (!pagination.value) return
      const { page = 1, pageSize } = pagination.value
      return i + 1 + (page - 1) * pageSize
    }
  },
  {
    title: '组件名称',
    key: 'name'
  },
  {
    title: '组件分类',
    key: 'name1'
  },
  {
    title: '运行状态',
    key: 'name2'
  },
  {
    title: '运行版本',
    key: 'name3'
  },
  {
    title: '开始运行时间',
    key: 'name4'
  },
  {
    title: '结束运行时间',
    key: 'name5'
  },
  {
    title: '运行速度（秒）',
    key: 'name6'
  },
  {
    title: '操作',
    key: 'name6'
  }
]
</script>

<template>
  <div class="table-root">
    <query-form @query="() => queryTable()" @clear="() => queryTable()"></query-form>
    <cus-table-request
      ref="tableRef"
      method="get"
      url="/customize-param/variables"
      :params="formValue"
      :columns="columns"></cus-table-request>
  </div>
</template>

<style lang="scss" scoped>
.table-root {
  padding: 20px 17px;
  background: #fff;
}
</style>
