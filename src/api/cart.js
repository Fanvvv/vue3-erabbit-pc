import request from '@/utils/request'

/**
 * 获取新的商品信息
 * @param {String} id - 商品SKUID
 * @returns Promise
 */
export const getNewCartGoods = (id) => {
  return request(
    `/goods/stock/${id}`,
    'get'
  )
}
