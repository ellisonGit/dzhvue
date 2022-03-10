import request from '@/js/ajax'

/** 获取菜品类目列表 */
export function queryDishList(data) {
  return request({
    url: '/dishmanage/queryDishList',
    method: 'post',
    data
  })

}

/* 查询采购订单汇总报表 */
export function queryPurOrderSumReport(data) {
  let corp_id = sessionStorage.getItem("corp_id");
  if (undefined != data.condition) {
    data.condition['upCorpId'] = corp_id;

  } else {
    const condition = {
      upCorpId: corp_id,
    }
    data['condition'] = condition;
  }
  return request({
    url: '/purOrderReportManage/queryPurOrderSumReport',
    method: 'post',
    data
  });
}

/* 查询采购订单汇总明细报表 */
export function queryPurOrderSumDetailReport(data) {
  let corp_id = sessionStorage.getItem("corp_id");
  if (undefined != data.condition) {
    data.condition['upCorpId'] = corp_id;

  } else {
    const condition = {
      upCorpId: corp_id,
    }
    data['condition'] = condition;
  }
  return request({
    url: '/purOrderReportManage/queryPurOrderSumDetailReport',
    method: 'post',
    data
  });
}





