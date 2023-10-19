<script setup lang="ts">
import { ref, computed, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { FormInst, useMessage, type UploadFileInfo, type SelectOption } from 'naive-ui'
import { useForm, formRules, type FormState } from './useForm'
defineOptions({
  name: 'TheForm'
})
const route = useRoute()
const message = useMessage()
const isEditRef = computed(() => !!route.path.match('/examples/form/edit'))

const formRef = ref<FormInst | null>(null)
const { formState, setFormState, resetFormState } = useForm()
const loadingRef = ref(false)
// 编辑时获取详情
const productIdRef = computed(() => (route.query.productId as string) || '110')
const goodsInfoRef = ref<FormState>({})
watchEffect(() => {
  if (isEditRef.value && productIdRef.value) {
    // get goods info api
    const getGoodsInfo = (id: any) => {
      return Promise.resolve<FormState>({
        productCategoryId: 1,
        name: '洗洁精',
        description: '立白洗洁精，嘎嘎好用！',
        price: 3,
        publishStatus: true,
        spreadStartDate: '2023-10-13 16:22:41',
        spreadEndDate: '2023-10-28 16:22:44',
        pic: null,
        douyinUrl: 'https://lai.gou.cv',
        shopName: '立白',
        asyncSelectValue: 1,
        asyncSelectLabel: 'label-1'
      })
    }
    getGoodsInfo(productIdRef.value).then((res) => {
      goodsInfoRef.value = res
      setFormState(res)
      console.log(formState)
      if (formState.pic) {
        const matcher = /([^/]*)$/.exec(formState.pic)
        const s = matcher ? matcher[0] : ''
        goodsMainPicRef.value = [
          {
            id: s,
            name: s,
            status: 'finished',
            url: formState.pic
          }
        ]
      }
    })
  }
})

// 主图
const goodsMainPicRef = ref<UploadFileInfo[]>([])
watchEffect(() => {
  formState.pic = goodsMainPicRef.value[0] ? goodsMainPicRef.value[0].url : null
})

// 因为编辑、添加为同个页面，这里相互跳转时需重置下
watch(() => route.path, reset)

function reset() {
  resetFormState()
  goodsMainPicRef.value = []
}

async function handleAddBtnClick() {
  await formRef.value?.validate()
  loadingRef.value = true
  console.log(formState)
  try {
    const formData = {
      ...formState,
      publishStatus: Number(formState.publishStatus)
    }
    // add goods info api
    const addGoods = (id: any) => {
      return Promise.resolve({})
    }
    // update goods info api
    const updateGoods = (id: any) => {
      return Promise.resolve({})
    }
    isEditRef.value
      ? await updateGoods({ ...formData, productId: productIdRef.value })
      : await addGoods(formData)
    message.success(isEditRef.value ? '编辑成功！' : '添加成功！')
  } catch (err) {}
  loadingRef.value = false
}
function handleCancelBtnClick() {
  console.log(1)
}

function fetchOptsApi(keyword: string) {
  return new Promise<{ total: number; data: Array<{ label: string; value: any }> }>((r) =>
    setTimeout(() => {
      let res = []
      if (keyword) {
        res = [{ label: keyword, value: keyword }]
      } else {
        res = new Array(10)
          .fill(null)
          .map((_, i) => ({ label: 'label' + i, value: Date.now() + i }))
      }
      r({
        total: 100,
        data: res
      })
    }, 1000)
  )
}
// 编辑时，添加一个选项
const extraOption = computed(() => {
  if (isEditRef.value && goodsInfoRef.value.asyncSelectValue) {
    return {
      label: goodsInfoRef.value.asyncSelectLabel,
      value: goodsInfoRef.value.asyncSelectValue
    }
  }
  return null
})

function selectResAdapter(res: any, options: SelectOption[]) {
  return { finished: options.length > 20, list: res.data }
}
</script>

<template>
  <n-form
    ref="formRef"
    :model="formState"
    :rules="formRules"
    label-placement="left"
    label-width="200"
    style="max-width: 1000px; margin: 0 auto">
    <n-grid :cols="2" :x-gap="24">
      <n-form-item-gi label="商品名称" path="name">
        <n-input v-model:value="formState.name" clearable />
      </n-form-item-gi>
      <n-form-item-gi label="店铺名称" path="shopName">
        <n-input v-model:value="formState.shopName" clearable />
      </n-form-item-gi>
      <n-form-item-gi span="2" label="商品介绍" path="description">
        <n-input
          v-model:value="formState.description"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 20
          }"
          clearable />
      </n-form-item-gi>
      <n-form-item-gi label="下拉（异步搜索分页加载）" span="2" path="asyncSelectValue">
        <cus-remote-select
          v-model:value="formState.asyncSelectValue"
          :api="fetchOptsApi"
          :res-adapter="selectResAdapter"
          :extra-option="extraOption">
        </cus-remote-select>
      </n-form-item-gi>
      <n-form-item-gi label="商品链接" span="2" path="douyinUrl">
        <n-input v-model:value="formState.douyinUrl" clearable />
      </n-form-item-gi>
      <n-form-item-gi label="商品分类" path="productCategoryId">
        <n-select
          v-model:value="formState.productCategoryId"
          :options="[
            {
              label: '服饰内衣',
              value: 1
            }
          ]" />
      </n-form-item-gi>
      <n-form-item-gi label="商品售价" path="price">
        <n-input-number v-model:value="formState.price" :precision="2" clearable />
      </n-form-item-gi>
      <n-form-item-gi label="推广起始时间" path="spreadStartDate">
        <n-date-picker
          v-model:formatted-value="formState.spreadStartDate"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          clearable />
      </n-form-item-gi>
      <n-form-item-gi label="推广结束时间" path="spreadEndDate">
        <n-date-picker
          v-model:formatted-value="formState.spreadEndDate"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          clearable />
      </n-form-item-gi>
      <n-form-item-gi span="2" label="商品是否上架" path="publishStatus">
        <n-switch v-model:value="formState.publishStatus" />
      </n-form-item-gi>
      <n-form-item-gi label="商品主图" path="pic">
        <cus-upload v-model:fileList="goodsMainPicRef" action="/api/oss/product/upload" :max="1">
        </cus-upload>
      </n-form-item-gi>
      <n-gi span="2">
        <n-space justify="center" size="large" style="width: 100%">
          <n-button
            :loading="loadingRef"
            style="width: 100px"
            type="primary"
            @click="handleAddBtnClick">
            确认
          </n-button>
          <n-button style="width: 100px" @click="handleCancelBtnClick"> 取消 </n-button>
        </n-space>
      </n-gi>
    </n-grid>
  </n-form>
</template>
