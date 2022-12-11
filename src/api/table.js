import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api1/table/list',
    method: 'get',
    params
  })
}
