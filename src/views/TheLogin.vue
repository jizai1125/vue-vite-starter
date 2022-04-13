<script setup lang="ts">
import { FormInst, useMessage, FormRules } from 'naive-ui'
import { reactive, ref } from 'vue'
import { UserOutlined as UserIcon, LockOutlined as LockIcon } from '@vicons/antd'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/store/user'
import { setToken } from '@/utils/auth'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const message = useMessage()
interface ModelType {
  username: string
  password: string
}
const formRef = ref<FormInst | null>(null)
const modelForm = reactive<ModelType>({
  username: '',
  password: ''
})
const rules: FormRules = {
  username: [
    {
      required: true,
      message: '请输入用户名'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码'
    },
    {
      min: 6,
      message: '密码最少6位'
    }
  ]
}
const login = (e: MouseEvent) => {
  e.preventDefault()
  console.log(modelForm)
  formRef.value?.validate(async (error) => {
    if (error) {
      return message.warning('哒咩~哒咩~')
    }
    // await loginApi(modelForm)
    const token = 'token_xxx'
    const userId = 1
    setToken(token)
    await userStore.getUserInfo(userId)
    const redirect = route.query.redirect?.toString()
    router.replace(redirect || '/')
  })
}
</script>

<template>
  <div class="login-container">
    <div class="login-form">
      <div class="title">vue3-admin-template</div>
      <n-form ref="formRef" size="large" :show-label="false" :model="modelForm" :rules="rules">
        <n-form-item path="username">
          <n-input v-model:value="modelForm.username" placeholder="请输入您的用户名">
            <template #prefix>
              <n-icon :component="UserIcon" color="#666" />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password">
          <n-input
            v-model:value="modelForm.password"
            type="password"
            placeholder="请输入您的密码"
            @keydown.enter="login">
            <template #prefix>
              <n-icon :component="LockIcon" color="#666" />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item>
          <n-button attr-type="button" type="info" style="width: 100%" @click="login">
            登录
          </n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  .login-form {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    height: 412px;
    padding: 50px 40px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    .title {
      font-size: 30px;
      color: #2299fe;
      text-align: center;
      margin-bottom: 30px;
    }
  }
}
</style>
