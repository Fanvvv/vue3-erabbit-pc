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
