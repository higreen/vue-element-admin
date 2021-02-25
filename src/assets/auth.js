// 授权
const obj = window.sessionStorage
const key = 'Authorization'

export function getAuth() {
  return obj.getItem(key)
}

export function setAuth(auth) {
  return obj.setItem(key, auth)
}

export function removeAuth() {
  return obj.removeItem(key)
}
