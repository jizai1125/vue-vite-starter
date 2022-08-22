<script setup lang="ts">
import QueryForm from './QueryForm.vue'
const columns = [
  {
    type: 'selection',
    disabled(row: any) {
      return row.name === 'Edward King 3'
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
const tableData = Array.apply(null, { length: 45 }).map((_, index) => ({
  key: index,
  name: `Edward King`,
  name1: `Edward King`,
  name2: `Edward King`,
  name3: `Edward King`,
  name4: `Edward King`,
  name5: `Edward King`,
  name6: `Edward King`
}))
</script>

<template>
  <div class="widget-monitor">
    <query-form></query-form>
    <n-data-table
      :columns="columns"
      :data="tableData"
      :pagination="{
        pageSize: 10,
        'show-size-picker': true,
        'show-quick-jumper': true
      }"></n-data-table>
  </div>
</template>

<style lang="scss" scoped>
.widget-monitor {
  padding: 20px 17px;
  background: #fff;
}
</style>
