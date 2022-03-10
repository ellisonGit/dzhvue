import request from '@/js/ajax'

/** 获取菜品类目列表 */
export function queryPidList(data) {
  return request({
    url: '/dishmanage/queryDishList',
    method: 'post',
    data
  })

}

/** 获取菜品明细列表 */
export function queryDishDetailList(data) {
  return request({
    url: '/dishmanage/queryDishDetailList',
    method: 'post',
    data
  })

}


