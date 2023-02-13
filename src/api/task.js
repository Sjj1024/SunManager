import request from '@/utils/request'

export default {
  // 添加自动评论任务
  addCommitTask(data) {
    return request({
      url: '/api1/task/addCaoliuCommit',
      method: 'post',
      data
    })
  },

  // 删除自动评论任务
  delCommitTask(data) {
    return request({
      url: '/api1/task/delCaoliuCommit',
      method: 'delete',
      data
    })
  },

  // 添加自动签到任务
  addSignTask(data) {
    return request({
      url: '/api1/task/addCaoliuSign',
      method: 'post',
      data
    })
  },

  // 删除自动签到任务
  delSignTask(data) {
    return request({
      url: '/api1/task/delCaoliuSign',
      method: 'delete',
      data
    })
  }

}