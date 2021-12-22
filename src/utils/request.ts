import axios, { AxiosResponse, AxiosRequestConfig, Method } from 'axios'
import { getToken } from '@/utils/auth'

const baseURL = import.meta.env.VITE_API_URL

// 创建实例
const service = axios.create({
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
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const resData = response.data
    // 根绝业务自定义
    // if (resData?.status !== 200) {
    //   if (resData.status === 401) {
    //     // 登录超时,重新登录
    //   }
    //   return Promise.reject(resData)
    // }
    return Promise.resolve(resData)
  },
  (error) => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

function fetch(method: Method, url: string, params?: unknown, config?: AxiosRequestConfig) {
  let result
  switch (method) {
    case 'get':
      result = service.get(url, {
        params,
        ...config
      })
      break
    case 'post':
      result = service.post(url, params, config)
      break
    case 'put':
      result = service.put(url, params, config)
      break
    case 'delete':
      result = service.delete(url, {
        params,
        ...config
      })
      break
    default:
      result = service({
        method,
        url,
        ...config
      })
      break
  }
  return result
}
export default fetch
export const request = service
