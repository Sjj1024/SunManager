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

function tempAddUser(data) {
  return request({
    url: '/api1/table/tempAddUser',
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
    url: '/api1/table/updateUserInfo',
    method: 'POST',
    data
  })
}


function saveUserInfo(data) {
  return request({
    url: '/api1/table/saveUserInfo',
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


function getInvcodeList(data) {
  return request({
    url: '/api1/table/getInvcodeList',
    method: 'POST',
    data
  })
}


function getArticleList(data) {
  return request({
    url: '/api1/table/getArticleList',
    method: 'POST',
    data
  })
}


function getCommitList(data) {
  return request({
    url: '/api1/table/getCommitList',
    method: 'POST',
    data
  })
}


function getRefCommitList(data) {
  return request({
    url: '/api1/table/getRefCommitList',
    method: 'POST',
    data
  })
}



function payInvcodeSome(data) {
  return request({
    url: '/api1/table/payInvcode',
    method: 'POST',
    data
  })
}


function updateAllUser(data) {
  return request({
    url: '/api1/task/updateCaoliu',
    method: 'get',
    data
  })
}

export default {
  getList,
  addUser,
  tempAddUser,
  delUser,
  addUpdateUser,
  getUserInfoByCookie,
  getUpdateList,
  delUpdateUser,
  queryUsername,
  addCheckUser,
  delCheckUser,
  updateUserInfo,
  getUserById,
  saveUserInfo,
  updateAllUser,
  getInvcodeList,
  payInvcodeSome,
  getArticleList,
  getCommitList,
  getRefCommitList
}