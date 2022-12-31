import { useUserStore } from '@/store/user'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import { nextTick } from 'vue'

interface requestConfig extends AxiosRequestConfig {
  showLoading?: boolean
}

class Request {
  BASE_URL: string
  TIME_OUT: number
  INSTANCE: AxiosInstance
  constructor(baseURL: string, timeOut: number) {
    this.BASE_URL = baseURL
    this.TIME_OUT = timeOut
    this.INSTANCE = axios.create({
      baseURL: this.BASE_URL,
      timeout: this.TIME_OUT,
    })
    // 请求拦截
    this.INSTANCE.interceptors.request.use(config => {
      const { token } = useUserStore()
      if (token) {
        config.headers = {
          Authorization: token,
        }
      }
      return config
    })

    // 响应拦截
    this.INSTANCE.interceptors.response.use(data => {
      if (data.data.status != 200) {
        ElMessage({
          message: data?.data?.message,
          type: 'error',
        })
      } else {
        if(data?.data?.message !='ok'){
          ElMessage({
            message: data?.data?.message,
            type: 'success',
          })
        }
      }
      return data.data
    })
  }
  request<T>(config: requestConfig):Promise<T> {
    let loading: any
    if (config.showLoading) {
      loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    }
    return new Promise((resolve, reject) => {
      this.INSTANCE.request<any,T>({
        ...config,
      })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
        .finally(() => {
          nextTick(() => {
            if (loading) {
              loading.close()
            }
          })
        })
    })
  }
  get<T>(config: requestConfig): any {
    return this.request<T>({ ...config,  method: 'GET' })
  }
  post<T>(config: requestConfig,): any {
    return this.request<T>({ ...config,  method: 'POST' })
  }
  delete<T>(config: requestConfig): any {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export const request = new Request(
  import.meta.env.VITE_BASE_URL,
  import.meta.env.VITE_TIME_OUT
)
