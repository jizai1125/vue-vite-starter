const TokenKey = 'Admin-Token'

// token相关
export function getToken() {
  return localStorage.getItem(TokenKey) as string
}

export function setToken(token: string) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
