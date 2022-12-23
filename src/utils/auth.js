import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  console.log('setToken(token)--', token);
  localStorage.setItem(TokenKey, token)
  return
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
