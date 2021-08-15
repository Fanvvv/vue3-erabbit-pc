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
