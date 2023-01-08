import request from '@/utils/request'

export default {
  getHomes: ()=>{
    return request({
      url: '/api1/dashboard/homes',
      method: 'get'
    })
  }
}