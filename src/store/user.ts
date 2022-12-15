import { defineStore } from 'pinia'
import { ref } from 'vue'

import { Login } from '@/service/api/user/index'
import Local from '@/utils/local'

interface IUserStore {
  token: string
  userInfo: Function
  userLogin: Function
}

export const useUserStore = defineStore('user', (): IUserStore => {
  const token = ref<any>(Local.get('TOKEN_KEY'))
  const userInfo = ref<any>(Local.get('USER_INFO'))

  const userLogin = async (payload: { phone: string; password: string }) => {
    const res = await Login(payload)
    token.value = res.token
    userInfo.value = res.data
    Local.set('TOKEN_KEY', res.token)
    Local.set('USER_INFO', res.data)
  }

  return {
    token,
    userInfo,
    userLogin,
  }
})
