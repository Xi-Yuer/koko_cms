import { request } from '@/service'
import { IUserInfo } from '@/store/user'
import md5 from 'md5'

export interface IResponseData {
  message: string
  status: number
  data?: any
}

interface ILoginInfoType extends IResponseData {
  token: string
  data: IUserInfo
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

export const getAllUser = (): Promise<IResponseData> => {
  return request.get({ url: '/user/getAllUsers', showLoading: true })
}

export const delUserById = (id: string): Promise<IResponseData> => {
  return request.delete({
    url: '/user/delete',
    showLoading: true,
    params: { id },
  })
}
