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

/**
 * 获取商品的specs和skus
 * @param {String} id - 商品SKUID
 * @returns Promise
 */
export const getSpecsAndSkus = (id) => {
  return request(
    `/goods/sku/${id}`,
    'get'
  )
}

/**
 * 合并本地购物车
 * @param {Array<object>} cartList - 本地购物车数组
 */
export const mergeLocalCart = (cartList) => {
  return request(
    '/member/cart/merge',
    'post',
    cartList
  )
}

/**
 * 获取登录后的购物车列表
 * @returns Promise
 */
export const findCartList = () => {
  return request(
    '/member/cart',
    'get'
  )
}

/**
 * 加入购物车
 * @param {String} skuId - 商品SKUID
 * @param {Integer} count - 商品数量
 * @returns Promise
 */
export const insertCart = ({ skuId, count }) => {
  return request(
    '/member/cart',
    'post',
    { skuId, count }
  )
}

/**
 * 删除商品（支持批量删除）
 * @param {Array<string>} ids - skuId集合
 * @returns Promise
 */
export const deleteCart = (ids) => {
  return request(
    '/member/cart',
    'delete',
    { ids }
  )
}
