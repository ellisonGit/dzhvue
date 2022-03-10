import request from '@/js/ajax'
/* 添加采购订单 */
export function addPurOrder(data) {
  return request({
    url: '/purOrderManage/addPurOrder',
    method: 'post',
    data
  });
}

/* 查询采购订单列表 */
export function queryPurOrderList(data) {
  if (undefined != data.condition) {
    data.condition['corpId'] =  sessionStorage.getItem("corp_id");

  } else {
    const condition = {
      corpId: sessionStorage.getItem("corp_id"),
    }
    data['condition'] = condition;
  }

  return request({
    url: '/purOrderManage/queryPurOrderList',
    method: 'post',
    data
  });
}

/* 查询采购订单详情 */
export function queryPurOrderDetailList(data) {
  if (undefined != data.condition) {
    data.condition['corpId'] =  sessionStorage.getItem("corp_id");

  } else {
    const condition = {
      corpId:  sessionStorage.getItem("corp_id"),
    }
    data['condition'] = condition;
  }
  return request({
    url: '/purOrderManage/queryPurOrderDetailList',
    method: 'post',
    data
  });
}


