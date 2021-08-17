import request from '@/utils/request'

/*
* 获取商品详情
* @param {String} id - 商品ID
* */
export const findGoods = (id) => {
  return request(
    '/goods',
    'get',
    { id }
  )
}

/**
 * 获取商品同类推荐
 * @param id 商品ID（传入代表查询相关商品，不传代表查询猜你喜欢）
 * @param limit 数量限制，默认值为 4
 */
export const findGoodsRelevant = (id, limit) => {
  return request(
    '/goods/relevant',
    'get',
    { id, limit }
  )
}

/**
 * 获取热榜商品
 * @param {String} id - 商品ID
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜 3代表总热销榜
 * @param {Number} limit - 获取个数
 */
export const findHotGoods = (id, type, limit = 3) => {
  return request(
    '/goods/hot',
    'get',
    { id, type, limit })
}

/**
 * 获取商品评价信息
 * @param {String} id - 商品ID
 */
export const findGoodsComment = (id) => {
  // return request('/goods/:id/evaluate', 'get')
  return request(
    `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`,
    'get',
    { id }
  )
}
