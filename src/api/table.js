import request from '@/utils/request'

function getList(data) {
  return request({
    url: '/api1/caoliu/list',
    method: 'post',
    data
  })
}

function getUpdateList(params) {
  return request({
    url: '/api1/caoliu/updateList',
    method: 'get',
    params
  })
}

function addUser(data) {
  return request({
    url: '/api1/caoliu/addUser',
    method: 'post',
    data
  })
}

function tempAddUser(data) {
  return request({
    url: '/api1/caoliu/tempAddUser',
    method: 'post',
    data
  })
}

function delUser(data) {
  return request({
    url: '/api1/caoliu/delUser',
    method: 'DELETE',
    data
  })
}

function addUpdateUser(data) {
  return request({
    url: '/api1/caoliu/addUpdateUser',
    method: 'POST',
    data
  })
}


function addCheckUser(data) {
  return request({
    url: '/api1/caoliu/addCheckUser',
    method: 'POST',
    data
  })
}


function updateUserInfo(data) {
  return request({
    url: '/api1/caoliu/updateUserInfo',
    method: 'POST',
    data
  })
}


function saveUserInfo(data) {
  return request({
    url: '/api1/caoliu/saveUserInfo',
    method: 'POST',
    data
  })
}


function getUserById(data) {
  return request({
    url: '/api1/caoliu/getUserById',
    method: 'POST',
    data
  })
}


function delUpdateUser(data) {
  return request({
    url: '/api1/caoliu/delUpdateUser',
    method: 'DELETE',
    data
  })
}


function delCheckUser(data) {
  return request({
    url: '/api1/caoliu/delCheckUser',
    method: 'DELETE',
    data
  })
}



function getUserInfoByCookie(data) {
  return request({
    url: '/api1/caoliu/queryUser',
    method: 'POST',
    data
  })
}


function queryUsername(data) {
  return request({
    url: '/api1/caoliu/queryUsername',
    method: 'POST',
    data
  })
}


function getInvcodeList(data) {
  return request({
    url: '/api1/caoliu/getInvcodeList',
    method: 'POST',
    data
  })
}


function getArticleList(data) {
  return request({
    url: '/api1/caoliu/getArticleList',
    method: 'POST',
    data
  })
}


function getCommitList(data) {
  return request({
    url: '/api1/caoliu/getCommitList',
    method: 'POST',
    data
  })
}


function getRefCommitList(data) {
  return request({
    url: '/api1/caoliu/getRefCommitList',
    method: 'POST',
    data
  })
}



function payInvcodeSome(data) {
  return request({
    url: '/api1/caoliu/payInvcode',
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