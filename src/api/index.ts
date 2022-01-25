import request from 'utils/request'
import { ExpressData } from './resType'

export const getList = () =>
  request<ExpressData>('get', '/query', {
    type: 'shunfeng',
    postid: 'SF6091240032008'
  })
