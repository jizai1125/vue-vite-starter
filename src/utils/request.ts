import axios from 'axios'
import type { AxiosRequestConfig, Method } from 'axios'
import { getToken } from '@/utils/auth'

const baseURL = import.meta.env.VITE_API_URL

// 创建实例
export const service = axios.create({
  baseURL, // url = base api url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 6000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 根据需要自定义
    const token = getToken()
    const option = {
      headers: {
        token
      }
    }
    return Object.assign(config, option)
  },
  (error) => {
    console.log('[request error]', error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const resData = response.data
    // 自定义
    // if (resData?.status !== 200) {
    //   if (resData.status === 401) {
    //     // 登录超时,重新登录
    //   }
    //   return Promise.reject(resData)
    // }
    return Promise.resolve(resData)
  },
  (error) => {
    console.log('[reponse error]', error) // for debug
    return Promise.reject(error)
  }
)

type ExtMethod = Extract<Method, 'get' | 'post' | 'put' | 'delete'>

function request<R>(method: ExtMethod, url: string, params?: unknown, config?: AxiosRequestConfig) {
  let result
  switch (method) {
    case 'get':
      result = service.get<R, R>(url, {
        params,
        ...config
      })
      break
    case 'post':
      result = service.post<R, R>(url, params, config)
      break
    case 'put':
      result = service.put<R, R>(url, params, config)
      break
    case 'delete':
      result = service.delete<R, R>(url, {
        params,
        ...config
      })
      break
  }
  return result
}

export default request
