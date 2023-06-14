<script setup lang="ts">
import { ref } from 'vue'
import { FormInst } from 'naive-ui'
import { ExportOutlined as ExportIcon } from '@vicons/antd'
const formRef = ref<FormInst | null>(null)
const formValue = ref<{ name: string; time: [number, number] }>({
  name: '',
  time: [Date.now(), Date.now()]
})
const rules = {
  user: {
    name: {
      required: true,
      message: '请输入姓名',
      trigger: 'blur'
    },
    age: {
      required: true,
      message: '请输入年龄',
      trigger: ['input', 'blur']
    }
  },
  phone: {
    required: true,
    message: '请输入电话号码',
    trigger: ['input']
  }
}
const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (errors) return
  })
}
</script>

<template>
  <n-form
    ref="formRef"
    inline
    :label-width="80"
    label-align="right"
    label-placement="left"
    :model="formValue"
    :rules="rules">
    <n-grid :x-gap="24" item-responsive>
      <n-form-item-gi span="24 400:10 800:6" label="组件名称" path="name">
        <n-input v-model:value="formValue.name" placeholder="请输入" />
      </n-form-item-gi>
      <n-form-item-gi span="24 400:14 800:10" label="运行时间" path="time">
        <n-date-picker v-model:value="formValue.time" type="daterange" clearable />
      </n-form-item-gi>
      <n-form-item-gi span="24 400:24 800:8">
        <n-space>
          <n-button round type="info" @click="handleValidateClick"> 查询 </n-button>
          <n-button round @click="handleValidateClick"> 重置 </n-button>
          <n-button round type="info">
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
