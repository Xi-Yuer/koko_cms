import { request } from '@/service'

interface IBanner {
  data: any[]
  status: number
}

export const getBannerList = (): Promise<IBanner> => {
  return request.get({ url: '/banners/getAll' })
}
