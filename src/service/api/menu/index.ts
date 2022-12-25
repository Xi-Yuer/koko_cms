import { request } from '@/service'

interface IQuery {
  limit: number
  offset: number
  asc: number
}

export interface IResponseData {
  create_time: string
  description: string
  discount: string
  id: string
  makein: string
  material: string
  menu_name: string
  picture: string
  price: string
  taste: string | string[]
  update_time: string
}

export interface IResponse {
  data: IResponseData[]
  message: string
  status: number
  count: number
}

export const getMenuList = (query: IQuery): Promise<IResponse> => {
  return request.get({ url: '/menu/list', showLoading: true, params: query })
}

export const createMenu = (data: any): Promise<any> => {
  return request.post({ url: '/menu/create' }, data)
}
export const editMenu = (data: any): Promise<any> => {
  return request.post({ url: '/menu/update' }, data)
}
export const deleteMenu = (id: string): Promise<any> => {
  return request.delete({ url: '/menu/delete', params: { id } })
}
