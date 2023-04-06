import request from '@/utils/request'

export default {
  // 获取1024回家
  getHomes: ()=>{
    return request({
      url: '/api1/dashboard/homes',
      method: 'get'
    })
  },

  // 获取1024回家导航地址
  getGitHub:()=>{
    return request({
      url: "/api1/dashboard/navigation",
      method: "get"
    })
  }
}


