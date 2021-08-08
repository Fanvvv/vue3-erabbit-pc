import request from '@/utils/request'

/*
* 获取热门品牌
* limit 指定响应数据中商品的数量
* */
export const findBrand = (limit) => {
  return request(
    '/home/brand',
    'get',
    { limit }
  )
}

/*
* 获取轮播图
* distributionSite 广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
* */
export const findBanner = (distributionSite) => {
  return request(
    '/home/banner',
    'get',
    { distributionSite }
  )
}

/*
* 获取新鲜好物
* limit 指定响应数据中商品的数量 默认为 4
* */
export const findNew = (limit) => {
  return request(
    '/home/new',
    'get',
    { limit }
  )
}

/*
* 获取人气推荐
* */
export const findHot = () => {
  return request(
    'home/hot',
    'get'
  )
}

/*
* 获取产品区块数据
* */
export const findGoods = () => {
  return request(
    'home/goods',
    'get'
  )
}

/*
* 获取最新专题数据
* @param {Number} limit 数量限制
* */
export const findSpecial = (limit) => {
  return request(
    '/home/special',
    'get',
    { limit }
  )
}
