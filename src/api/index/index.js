import request from '@/js/ajax'
/** 用户解绑 **/
export function acctUserUnBind(data) {
  let corp_id= sessionStorage.getItem("corp_id")
  if(null!=corp_id && corp_id.length>0){
    data['corp_id']=corp_id;
  }
  return request({
    url: '/pub/acct/userUnBind',
    method: 'POST',
    data

  })
}
/** 卡片挂失 **/
export function acctCardLost(data) {
  let corp_id= sessionStorage.getItem("corp_id")
  if(null!=corp_id && corp_id.length>0){
    data['corp_id']=corp_id;
  }
  return request({
    url: '/pub/acct/cardLost',
    method: 'POST',
    data

  })
}

/** 查询员工账号信息 **/
export function acctQueryAcctInfo(data) {
  let corp_id= sessionStorage.getItem("corp_id")
  if(null!=corp_id && corp_id.length>0){
    data['corp_id']=corp_id;
  }
  return request({
    url: '/pub/acct/queryAcctInfo',
    method: 'POST',
    data

  })
}

/** 消费记录查询 **/
export function queryMealRecordsList(data) {
  if(undefined!=data.condition){
    let corp_id= sessionStorage.getItem("corp_id")
    if(null!=corp_id && corp_id.length>0){
      data.condition['corp_id']=corp_id;
    }

  }else{
    let corp_id= sessionStorage.getItem("corp_id")
    if(null!=corp_id && corp_id.length>0){
      const condition={
        corp_id:corp_id,
      }
      data['condition']=condition;
    }
  }
  return request({
    url: '/pub/queryMealRecordsList',
    method: 'POST',
    data

  })
}

/** 充值记录查询 **/
export function queryMchargerecordsList(data) {
  if(undefined!=data.condition){
    let corp_id= sessionStorage.getItem("corp_id")
    if(null!=corp_id && corp_id.length>0){
      data.condition['corp_id']=corp_id;
    }

  }else{
    let corp_id= sessionStorage.getItem("corp_id")
    if(null!=corp_id && corp_id.length>0){
      const condition={
        corp_id:corp_id,
      }
      data['condition']=condition;
    }
  }
  return request({
    url: '/pub/queryMchargerecordsList',
    method: 'POST',
    data

  })
}

/** 考勤记录查询 **/
export function queryAttendanceList(data) {
  if(undefined!=data.condition){
    let corp_id= sessionStorage.getItem("corp_id")
    if(null!=corp_id && corp_id.length>0){
      data.condition['corp_id']=corp_id;
    }

  }else{
    let corp_id= sessionStorage.getItem("corp_id")
    if(null!=corp_id && corp_id.length>0){
      const condition={
        corp_id:corp_id,
      }
      data['condition']=condition;
    }
  }
  return request({
    url: '/pub/queryAttendanceList',
    method: 'POST',
    data

  })
}

/** 门禁通行记录查询 **/
export function queryPasstimeList(data) {
  if(undefined!=data.condition){
    let corp_id= sessionStorage.getItem("corp_id")
    if(null!=corp_id && corp_id.length>0){
      data.condition['corp_id']=corp_id;
    }

  }else{
    let corp_id= sessionStorage.getItem("corp_id")
    if(null!=corp_id && corp_id.length>0){
      const condition={
        corp_id:corp_id,
      }
      data['condition']=condition;
    }
  }
  return request({
    url: '/pub/queryPasstimeList',
    method: 'POST',
    data

  })
}

/** 最近一次记录查询 **/
export function queryLastList(data) {
  return request({
    url: '/pub/acct/queryLastList',
    method: 'POST',
    data

  })
}

/** 充值 **/
export function wxJspay(data) {
  return request({
    url: 'http://yslduozuhupt.gdeastriver.com/trans/api/pay/wxJspay',
    method: 'POST',
    data
  })
}
