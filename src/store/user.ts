import { defineStore } from 'pinia'
import { ref } from 'vue'

import { Login } from '@/service/api/user/index'
import Local from '@/utils/local'

export interface IUserInfo {
  adress: string | null
  asign: string | null
  avatar: string | null
  birthday: string | null
  gender: number | null
  id: number | null
  is_admin: number | null
  is_vip: number | null
  name: string | null
  password: string | null
  phone_number: string | null
}

interface IUserStore {
  token: string
  userInfo: IUserInfo
  userLogin: Function
}

export const useUserStore = defineStore('User', (): IUserStore => {
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
