import { request } from '@/service'
import md5 from 'md5'

interface ILoginInfoType {
  message: string
  status: number
  token: string
  data: any
}

// 用户登录
export function Login(payload: {
  phone: string
  password: string
}): Promise<ILoginInfoType> {
  return request.post(
    { showLoading: true, url: '/user/login' },
    { phone: payload.phone, password: md5(payload.password) }
  )
}
