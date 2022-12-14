<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import local from '@/utils/local'

const account = reactive({
  phone: local.get('ACCOUNT').phone || '',
  password: local.get('ACCOUNT').password || '',
})

const remenberPassword = ref(account.phone ? true : false)

const { userLogin } = useUserStore()
const router = useRouter()

const login = () => {
  if (account.phone == '' || account.password == '') {
    return ElMessage.error('账号或密码不能为空')
  } else {
    userLogin(account).then(() => {
      if (remenberPassword.value) {
        local.set('ACCOUNT', account)
      } else {
        local.remove('ACCOUNT')
      }
      router.push('/')
    })
  }
}
</script>

<template>
  <div class="bg">
    <div class="box">
      <div class="left">
        <div class="switch_circle switch__circle_top"></div>
        <div class="switch__circle_bot"></div>
        <div class="flex justify-around items-center info">
          <h1 class="title">欢迎回来</h1>
          <span class="subtitle">龙山生态甲鱼后台管理系统</span>
        </div>
      </div>
      <div class="flex justify-around items-center right">
        <div class="info text-center">
          <h1 class="title">登录</h1>
          <span class="subtitle text-xs"
            >请使用平台认证管理员手机号账号登录</span
          >
          <div class="flex flex-col">
            <input
              class="form__input"
              type="text"
              placeholder="手机号"
              v-model="account.phone"
            />
            <input
              class="form__input"
              type="password"
              placeholder="密码"
              v-model="account.password"
            />
          </div>
          <div class="float-left mt-2">
            <el-checkbox
              label="记住密码"
              name="type"
              v-model="remenberPassword"
            />
          </div>
          <div class="btn" @click="login">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.bg {
  @apply w-screen h-screen flex justify-center items-center bg-[#ecf0f3];
  .box {
    @apply relative flex;
    width: 1000px;
    min-width: 1000px;
    min-height: 600px;
    background-color: #ecf0f3;
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
    border-radius: 12px;
    overflow: hidden;
    .left {
      width: 300px;
      @apply flex justify-center items-center;
      .switch_circle {
        position: absolute;
        width: 500px;
        height: 500px;
        border-radius: 50%;
        background-color: #ecf0f3;
        box-shadow: inset 8px 8px 12px #d1d9e6, inset -8px -8px 12px #f9f9f9;
        bottom: -60%;
        left: -60%;
        transition: 1.25s;
      }
      .switch__circle_top {
        top: -30%;
        left: 30%;
        width: 300px;
        height: 300px;
      }
      .switch__circle_bot {
        position: absolute;
        background: linear-gradient(
          to bottom,
          rgba(255, 0, 0, 1) 0%,
          rgba(255, 0, 0, 0) 100%
        );
        width: 100px;
        height: 100px;
        border-radius: 50%;
        bottom: -10%;
      }
    }
    .info {
      flex-direction: column;
      margin-top: -150px;
      .title {
        font-size: 34px;
        font-weight: 700;
        line-height: 3;
        color: #181818;
      }
      .subtitle {
        color: #a0a5af;
      }
    }
    .right {
      position: relative;
      flex: 1;
      box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
      .form__input {
        width: 350px;
        height: 40px;
        margin: 4px 0;
        margin-top: 20px;
        padding-left: 25px;
        font-size: 13px;
        letter-spacing: 0.15px;
        border: none;
        outline: none;
        background-color: #ecf0f3;
        transition: 0.25s ease;
        border-radius: 8px;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
        &::placeholder {
          color: #a0a5a8;
        }
      }
      .btn {
        position: absolute;
        bottom: 30%;
        width: 350px;
        height: 40px;
        background-color: #4b70e2;
        color: white;
        @apply flex justify-center items-center rounded-full cursor-pointer hover:bg-blue-600 transition-colors;
      }
    }
  }
}
</style>
