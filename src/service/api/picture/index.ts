import { request } from '@/service'

export interface IDataType {
  id: string
  menu_id: string
  pic_url: string
  title: string
}

interface IResponse {
  data: IDataType[]
  message: string
  status: number
}

export const getBannerList = (
  type: string,
  id: string | number
): Promise<IResponse> => {
  return request.get<IResponse>({
    url: `${type}/banner/list`,
    params: { id },
    showLoading: true,
  })
}

export const delBannerById = (
  type: string,
  id: string | number
): Promise<any> => {
  return request.delete<any>({
    url: `${type}/banner`,
    params: { id },
    showLoading: true,
  })
}
