import { request } from '@/service'

interface IBanner {
  data: any[]
  status: number
}
interface IDeleteBanner {
  status: number
  message: string
}

export const getBannerList = (): Promise<IBanner> => {
  return request.get({ url: '/banners/getAll', showLoading: true })
}

export const deleteBanner = (id: string | number): Promise<IDeleteBanner> => {
  return request.delete({ url: `/banners/${id}`, showLoading: true })
}
export const updateBanner = (
  id: string | number,
  title: string
): Promise<IDeleteBanner> => {
  return request.post(
    {
      url: '/banners/update',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      showLoading: true,
    },
    { id, title }
  )
}
