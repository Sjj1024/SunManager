import request from '@/utils/request'

function getList(data) {
  return request({
    url: '/api1/tang98/list',
    method: 'post',
    data
  })
}

function getUpdateList(params) {
  return request({
    url: '/api1/tang98/updateList',
    method: 'get',
    params
  })
}

function addUser(data) {
  return request({
    url: '/api1/tang98/addUser',
    method: 'post',
    data
  })
}

function tempAddUser(data) {
  return request({
    url: '/api1/tang98/tempAddUser',
    method: 'post',
    data
  })
}

function delUser(data) {
  return request({
    url: '/api1/tang98/delUser',
    method: 'DELETE',
    data
  })
}

function addUpdateUser(data) {
  return request({
    url: '/api1/tang98/addUpdateUser',
    method: 'POST',
    data
  })
}


function addCheckUser(data) {
  return request({
    url: '/api1/tang98/addCheckUser',
    method: 'POST',
    data
  })
}


function updateUserInfo(data) {
  return request({
    url: '/api1/tang98/updateUserInfo',
    method: 'POST',
    data
  })
}


function saveUserInfo(data) {
  return request({
    url: '/api1/tang98/saveUserInfo',
    method: 'POST',
    data
  })
}


function getUserById(data) {
  return request({
    url: '/api1/tang98/getUserById',
    method: 'POST',
    data
  })
}


function delUpdateUser(data) {
  return request({
    url: '/api1/tang98/delUpdateUser',
    method: 'DELETE',
    data
  })
}


function delCheckUser(data) {
  return request({
    url: '/api1/tang98/delCheckUser',
    method: 'DELETE',
    data
  })
}



function getUserInfoByCookie(data) {
  return request({
    url: '/api1/tang98/queryUser',
    method: 'POST',
    data
  })
}


function queryUsername(data) {
  return request({
    url: '/api1/tang98/queryUsername',
    method: 'POST',
    data
  })
}


function getInvcodeList(data) {
  return request({
    url: '/api1/tang98/getInvcodeList',
    method: 'POST',
    data
  })
}


function getArticleList(data) {
  return request({
    url: '/api1/tang98/getArticleList',
    method: 'POST',
    data
  })
}


function getCommitList(data) {
  return request({
    url: '/api1/tang98/getCommitList',
    method: 'POST',
    data
  })
}


function getRefCommitList(data) {
  return request({
    url: '/api1/tang98/getRefCommitList',
    method: 'POST',
    data
  })
}



function payInvcodeSome(data) {
  return request({
    url: '/api1/tang98/payInvcode',
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