import fetch, { request } from '@/utils/request'

export const login = () => request.get('/test')

export const getList = () => fetch('get', '/query?type=shunfeng&postid=SF6091240032008')
