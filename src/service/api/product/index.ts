import { request } from '@/service'
import { IResponseData } from '../user'

export const getProductList = (
  limit: number | string = 10,
  offset: number | string = 0,
  acs: number = 0,
  type?: number
): Promise<IResponseData> => {
  return request.get<IResponseData>({
    url: '/product',
    showLoading: true,
    params: { limit, offset, acs, type },
  })
}

// 新建
export const createProduct = (data: any): Promise<IResponseData> => {
  return request.post<IResponseData>({ url: '/product/create', showLoading: true, data})
}

// 编辑
export const editProduct = (data: any): Promise<IResponseData> => {
  return request.post<IResponseData>({ url: '/product/update', showLoading: true, data})
}

// 删除
export const deleteProduct = (id: string): Promise<any> => {
  return request.delete<any>({ url: '/product/delete', params: { id } })
}
