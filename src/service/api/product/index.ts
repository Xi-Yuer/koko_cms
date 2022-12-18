import { request } from '@/service'
import { IResponseData } from '../user'

export const getProductList = (
  limit: number | string = 100,
  offset: number | string = 0,
  acs: number = 0,
  type?: number
): Promise<IResponseData> => {
  return request.get({
    url: '/product',
    showLoading: true,
    params: { limit, offset, acs, type },
  })
}

// 新建
export const createProduct = (data: any): Promise<IResponseData> => {
  return request.post({ url: '/product/create', showLoading: true }, data)
}
