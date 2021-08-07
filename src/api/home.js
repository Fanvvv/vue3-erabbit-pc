import request from '@/utils/request'

/*
* 获取热门品牌
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
* distributionSite
* */
export const findBanner = (distributionSite) => {
  return request(
    '/home/banner',
    'get',
    { distributionSite }
  )
}
