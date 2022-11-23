import request from '@/utils/request'

export const getExpressData = (data: any) => request<ApiUser.ExpressData>('get', '/query', data)
