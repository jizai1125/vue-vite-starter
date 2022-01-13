import fetch from 'utils/request'

export const getList = () => fetch('get', '/query?type=shunfeng&postid=SF6091240032008')
