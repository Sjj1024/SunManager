import request from '@/utils/request'

function getPayLink(data) {
  return request({
    url: '/api1/pay/getPayLink',
    method: 'post',
    data
  })
}


export default {
  getPayLink
}