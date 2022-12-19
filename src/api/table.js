import request from '@/utils/request'

function getList(params) {
  return request({
    url: '/api1/table/list',
    method: 'get',
    params
  })
}

function addUser(data) {
  return request({
    url: '/api1/table/addUser',
    method: 'post',
    data
  })
}

function delUser(data) {
  return request({
    url: '/api1/table/delUser',
    method: 'DELETE',
    data
  })
}

function addUpdateUser(data) {
  return request({
    url: '/api1/table/addUpdateUser',
    method: 'POST',
    data
  })
}

export default {
  getList,
  addUser,
  delUser,
  addUpdateUser
}