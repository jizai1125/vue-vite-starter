<script lang="ts">
export type FormValue = { name: string; time: [number, number] | null }
const initialFormValue: FormValue = {
  name: '',
  time: null
}
export const formValue = reactive<FormValue>({ ...initialFormValue })
</script>
<script setup lang="ts">
import { reactive } from 'vue'
import { ExportOutlined as ExportIcon } from '@vicons/antd'

const emits = defineEmits<{
  query: [formValue: FormValue]
  clear: [formValue: FormValue]
}>()

function handleQuery() {
  emits('query', formValue)
}
function handleReset() {
  Object.assign(formValue, initialFormValue)
  emits('clear', formValue)
}
</script>

<template>
  <n-form inline :label-width="80" label-align="right" label-placement="left" :model="formValue">
    <n-grid :x-gap="24" item-responsive>
      <n-form-item-gi span="24 400:10 800:6" label="组件名称" path="name">
        <n-input v-model:value="formValue.name" placeholder="请输入" />
      </n-form-item-gi>
      <n-form-item-gi span="24 400:14 800:10" label="运行时间" path="time">
        <n-date-picker v-model:value="formValue.time" type="daterange" clearable />
      </n-form-item-gi>
      <n-form-item-gi span="24 400:24 800:8">
        <n-space>
          <n-button round type="primary" @click="handleQuery"> 查询 </n-button>
          <n-button round @click="handleReset"> 重置 </n-button>
          <n-button round type="primary">
            <template #icon>
              <n-icon :component="ExportIcon"> </n-icon>
            </template>
            导出
          </n-button>
        </n-space>
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<style lang="scss" scoped></style>
