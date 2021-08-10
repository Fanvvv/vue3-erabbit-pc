// 请求分类数据
import request from '@/utils/request'

/*
* 获取首页头部分类数据
* */
export function findAllCategory () {
  return request(
    '/home/category/head',
    'get'
  )
}

/*
* 获取一级类目数据
* @param id 一级类目id
* */
export const findTopCategory = (id) => {
  return request(
    '/category',
    'get',
    { id }
  )
}

/*
* 获取二级类目筛选条件数据
* @param id 二级类目id
* */
export const findSubCategoryFilter = (id) => {
  return request(
    '/category/sub/filter',
    'get',
    { id }
  )
}

/*
* 获取二级类目商品列表
* @param {Object} params 必须包含分类ID
* */
export const findSubCategoryGoods = (params) => {
  return request(
    '/category/goods',
    'post',
    params
  )
}
