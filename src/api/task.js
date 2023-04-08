import request from '@/utils/request'

export default {
  // 添加98自动评论任务
  add98CommitTask(data) {
    return request({
      url: '/api1/task/addTangCommit',
      method: 'post',
      data
    })
  },


  add1024CommitTask(data) {
    return request({
      url: '/api1/task/addCaoliuCommit',
      method: 'post',
      data
    })
  },

  // 删除自动评论任务
  del1024CommitTask(data) {
    return request({
      url: '/api1/task/delCaoliuCommit',
      method: 'delete',
      data
    })
  },

  // 删除自动评论任务
  del98CommitTask(data) {
    return request({
      url: '/api1/task/delTangCommit',
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


  // 添加98自动签到任务
  add98SignTask(data) {
    return request({
      url: '/api1/task/addTangSign',
      method: 'post',
      data
    })
  },

  // 立即运行98自动签到任务
  run98SignTask(data) {
    return request({
      url: '/api1/task/runTangSign',
      method: 'post',
      data
    })
  },


  // 立即运行98自动签到任务
  run98CommitTask(data) {
    return request({
      url: '/api1/task/runTangCommit',
      method: 'post',
      data
    })
  },

  // 删除自动签到任务
  del98SignTask(data) {
    return request({
      url: '/api1/task/delTangSign',
      method: 'delete',
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