<script setup lang="ts">
import { FormInst, useMessage, FormRules } from 'naive-ui'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/store/user'

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
  username: 'admin',
  password: '123456'
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

const login = (e: Event) => {
  e.preventDefault()
  console.log(modelForm)
  formRef.value?.validate(async (error) => {
    if (error) {
      return message.warning('哒咩~哒咩~')
    }
    await userStore.login(modelForm)
    const redirect = route.query.redirect?.toString()
    router.replace(redirect || '/')
  })
}
</script>

<template>
  <div class="login-container">
    <div class="left-content"></div>
    <div class="right-content">
      <div class="logo">
        <svg-icon name="logo" :size="80" />
        <svg-icon name="sun" :size="40" />
      </div>
      <div class="title">vue-vite-starter</div>
      <n-form
        ref="formRef"
        size="large"
        :show-require-mark="false"
        :show-label="false"
        :model="modelForm"
        :rules="rules">
        <n-form-item path="username">
          <n-input v-model:value="modelForm.username" placeholder="请输入账号"> </n-input>
        </n-form-item>
        <n-form-item path="password">
          <n-input
            v-model:value="modelForm.password"
            type="password"
            placeholder="请输入密码"
            @keydown.enter="login">
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
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  .left-content {
    flex: 1;
    min-width: 400px;
    background: url(@/assets/login-bg2.png) 45% 160px/45vw auto no-repeat,
      url(@/assets/login-bg.png) -5px/100% 105% no-repeat;
  }
  .right-content {
    width: 546px;
    height: 100%;
    padding: 185px 75px 0;
    box-sizing: border-box;
    background: #fff;
    .logo {
      text-align: center;
    }
    .title {
      font-size: 16px;
      color: #47505e;
      letter-spacing: 4px;
      text-align: center;
      margin-bottom: 30px;
    }
  }
}
</style>
