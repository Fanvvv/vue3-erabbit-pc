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
