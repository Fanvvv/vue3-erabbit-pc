<template>
  <div class="sub-page">
    <div class="container">
      <!-- 面包屑 -->
      <sub-bread></sub-bread>
      <!-- 筛选区 -->
      <sub-filter @filter-change="filterChange"></sub-filter>
      <!-- 结果区 -->
      <div class="goods-list">
        <!-- 排序 -->
        <sub-sort @sort-change="sortChange"></sub-sort>
        <!-- 列表 -->
        <ul>
          <li v-for="item in goodsList" :key="item.id" >
            <category-goods :goods="item"></category-goods>
          </li>
        </ul>
        <!-- 加载动画 -->
        <xtx-infinite-loading :loading="loading" :finished="finished" @infinite="getData"></xtx-infinite-loading>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryGoods } from '@/api/category'
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
import SubSort from './components/sub-sort'
import CategoryGoods from '@/views/category/components/category-goods'
export default {
  name: 'SubPage',
  components: {
    SubBread,
    SubFilter,
    SubSort,
    CategoryGoods
  },
  setup () {
    // 1. 基础布局
    // 2. 无限加载组件
    // 3. 动态加载数据且渲染
    // 4. 任何筛选条件变化需要更新列表
    const route = useRoute()
    const loading = ref(false)
    const finished = ref(false)
    const goodsList = ref([])
    // 查询参数
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    const getData = () => {
      loading.value = true
      reqParams.categoryId = route.params.id
      // 分页查询
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          goodsList.value.push(...result.items)
          reqParams.page++
        } else {
          // 加载完毕
          finished.value = true
        }
        // 请求结束
        loading.value = false
      })
    }
    watch(() => route.params.id, (newId) => {
      if (newId && route.path === `/category/sub/${newId}`) {
        goodsList.value = []
        reqParams = {
          page: 1,
          pageSize: 20
        }
        finished.value = false
      }
    })
    // 监听排序改变
    const sortChange = (sortParams) => {
      finished.value = false
      // 合并请求参数，保留之前参数
      // console.log(sortParams)
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodsList.value = []
    }
    // 监听筛选改变
    const filterChange = (filterParams) => {
      finished.value = false
      // 合并请求参数，保留之前参数
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
    }
    return { loading, finished, goodsList, getData, sortChange, filterChange }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
