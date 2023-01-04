import request from '@/utils/request'

function getList(data) {
  return request({
    url: '/api1/table/list',
    method: 'post',
    data
  })
}

function getUpdateList(params) {
  return request({
    url: '/api1/table/updateList',
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


function addCheckUser(data) {
  return request({
    url: '/api1/table/addCheckUser',
    method: 'POST',
    data
  })
}


function updateUserInfo(data) {
  return request({
    url: '/api1/table/newUserInfo',
    method: 'POST',
    data
  })
}


function getUserById(data) {
  return request({
    url: '/api1/table/getUserById',
    method: 'POST',
    data
  })
}


function delUpdateUser(data) {
  return request({
    url: '/api1/table/delUpdateUser',
    method: 'DELETE',
    data
  })
}


function delCheckUser(data) {
  return request({
    url: '/api1/table/delCheckUser',
    method: 'DELETE',
    data
  })
}



function getUserInfoByCookie(data) {
  return request({
    url: '/api1/table/queryUser',
    method: 'POST',
    data
  })
}


function queryUsername(data) {
  return request({
    url: '/api1/table/queryUsername',
    method: 'POST',
    data
  })
}

export default {
  getList,
  addUser,
  delUser,
  addUpdateUser,
  getUserInfoByCookie,
  getUpdateList,
  delUpdateUser,
  queryUsername,
  addCheckUser,
  delCheckUser,
  updateUserInfo,
  getUserById
}