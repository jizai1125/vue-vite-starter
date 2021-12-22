import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

// token相关
export function getToken() {
  return Cookies.get(TokenKey) as string
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
