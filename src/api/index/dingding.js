import request from '@/js/ajax'
/** 通过code获取用户信息 **/
export function getUserInfo(data) {
  return request({
    url: '/dingCar/getUserInfo',
    method: 'POST',
    data
  })
}
/** 钉钉车辆预约登记 **/
export function reseRegister(data) {
  return request({
    url: '/dingCar/reseRegister',
    method: 'POST',
    data
  })
}



