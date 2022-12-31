import { request } from '@/service'
import { IUserInfo } from '@/store/user'
import md5 from 'md5'

export interface IResponseData {
  message: string
  status: number
  data?: any
  count?: number
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
  return request.post<ILoginInfoType>(
    { showLoading: true, url: '/user/login',data:{ phone: payload.phone, password: md5(payload.password) } },
  )
}

export const getAllUser = (): Promise<IResponseData> => {
  return request.get<IResponseData>({ url: '/user/getAllUsers', showLoading: true })
}

export const delUserById = (id: string): Promise<IResponseData> => {
  return request.delete<IResponseData>({
    url: '/user/delete',
    showLoading: true,
    params: { id },
  })
}
