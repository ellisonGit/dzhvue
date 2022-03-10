import request from '@/js/ajax'

/** 用户端学生登陆 **/
export function userBind(data) {
  return request({
    url: '/pub/acct/userBind',
    method: 'POST',
    data
  })
}

/** 管理端管理员登陆 **/
export function adminBindLogin(data) {
  // let corp_id = sessionStorage.getItem("corp_id")
  // if (corp_id != '' && corp_id.length > 0) {
  //   data['corp_id'] = corp_id;
  // }
  return request({
    url: '/pub/manager/adminBind',
    method: 'POST',
    data
  })
}

/** 查询所有企业列表 **/
export function queryCorpList(data) {
  return request({
    url: '/pub/manager/queryCorpList',
    method: 'POST',
    data
  })
}


/** 根据登录企业查询分公司 **/
export function querySubOfficeList(data) {
  return request({
    url: '/pub/manager/querySubOfficeList',
    method: 'POST',
    data
  })
}












