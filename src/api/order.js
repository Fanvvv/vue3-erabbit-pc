import request from '@/utils/request'

/**
 * 获取结算信息
 */
export const findCheckoutInfo = () => {
  return request(
    '/member/order/pre',
    'get'
  )
}
