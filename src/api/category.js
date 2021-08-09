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
