const TokenKey = 'Admin-Token'

export function getToken() {
  return ''
}

export function setToken(token) {
  return 'Cookies.set(TokenKey, token)'
}

export function removeToken() {
  return 'Cookies.remove(TokenKey)'
}
