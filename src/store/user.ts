import { defineStore } from 'pinia'
import { ref } from 'vue'

import { Login } from '@/service/api/user/index'
import Local from '@/utils/local'

export const useUserStore = defineStore('user', () => {
  const token = ref(Local.get('TOKEN_KEY'))

  const userLogin = (payload: { phone: string; password: string }) => {
    return Login(payload).then(res => {
      token.value = res.token
      Local.set('TOKEN_KEY', res.token)
    })
  }

  return {
    token,
    userLogin,
  }
})
