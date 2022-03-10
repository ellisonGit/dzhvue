import request from '@/js/ajax'
/** 首页汇总查询 **/
export function queryHomeSum(data) {
  let corp_id= sessionStorage.getItem("corp_id")
  if(null!=corp_id && corp_id.length>0){
    data['corp_id']=corp_id;
  }
  return request({
    url: '/pub/manager/record/queryHomeSum',
    method: 'POST',
    data

  })
}

/** 查询日消费汇总列表 **/
export function queryDayMealSumList(data) {
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
    url: '/pub/manager/record/queryDayMealSumList',
    method: 'POST',
    data

  })
}

/** 日充值汇总列表 **/
export function queryDayMchargeSumList(data) {
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
    url: '/pub/manager/record/queryDayMchargeSumList',
    method: 'POST',
    data

  })
}

/** 终端消费汇总 **/
export function queryDayTermMealSumList(data) {
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
    url: '/pub/manager/record/queryDayTermMealSumList',
    method: 'POST',
    data

  })
}

/** 餐厅统计报表 **/
export function querydinroomSumList(data) {
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
    url: '/pub/manager/record/querydinroomSumList',
    method: 'POST',
    data

  })
}

/** 消费明细报表 **/
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
    url: 'pub/manager/record/queryMealRecordsList',
    method: 'POST',
    data

  })
}

/** 充值明细报表 **/
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
    url: '/pub/manager/record/queryMchargerecordsList',
    method: 'POST',
    data

  })
}

/** 卡余额信息查询 **/
export function queryCardBalanceList(data) {
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
    url: '/pub/manager/record/queryCardBalanceList',
    method: 'POST',
    data

  })
}

