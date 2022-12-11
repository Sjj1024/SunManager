import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api1/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api1/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api1/user/logout',
    method: 'post'
  })
}
