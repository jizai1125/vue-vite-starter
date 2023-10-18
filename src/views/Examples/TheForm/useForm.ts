import { reactive } from 'vue'
import { FormRules } from 'naive-ui'

export type FormState = Utils.PartialNullable<
  {
    productCategoryId: string
    name: string
    description: string
    price: number
    publishStatus: boolean
    spreadStartDate: string
    spreadEndDate: string
    pic: string
    douyinUrl: string
    shopName: string
    [key: string]: unknown
  },
  'publishStatus'
>

const initialFormState: FormState = {
  productCategoryId: null,
  name: null,
  description: null,
  price: null,
  publishStatus: true,
  spreadStartDate: null,
  spreadEndDate: null,
  pic: null,
  douyinUrl: null,
  shopName: null
}

export function useForm() {
  const formState = reactive<FormState>({ ...initialFormState })
  // 重置
  function resetFormState() {
    Object.assign(formState, initialFormState)
  }
  // 赋值
  function setFormState(
    value: FormState,
    format?: (key: keyof FormState, value: unknown) => unknown
  ) {
    Object.keys(initialFormState).forEach((key) => {
      formState[key] = format ? format(key, value[key]) : value[key]
    })
  }

  return {
    formState,
    resetFormState,
    setFormState
  }
}

export const formRules: FormRules = {
  name: {
    required: true,
    trigger: 'blur',
    message: '请输入商品名称'
  },
  description: {
    required: true,
    trigger: 'blur',
    message: '请输入商品介绍'
  },
  productCategoryId: {
    required: true,
    trigger: 'change',
    type: 'number',
    message: '请选择商品分类'
  },
  price: {
    required: true,
    trigger: 'blur',
    type: 'number',
    message: '请输入商品售价'
  },
  spreadStartDate: {
    required: true,
    trigger: 'change',
    message: '请选择推广起始时间'
  },
  spreadEndDate: {
    required: true,
    trigger: 'change',
    message: '请选择推广结束时间'
  }
}
