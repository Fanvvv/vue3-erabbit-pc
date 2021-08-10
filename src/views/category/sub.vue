<template>
  <div class="sub-page">
    <div class="container">
      <!-- 面包屑 -->
      <sub-bread></sub-bread>
      <!-- 筛选区 -->
      <sub-filter></sub-filter>
      <!-- 结果区 -->
      <div class="goods-list">
        <!-- 排序 -->
        <sub-sort></sub-sort>
        <!-- 列表 -->
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
import SubSort from './components/sub-sort'
export default {
  name: 'SubPage',
  components: {
    SubBread,
    SubFilter,
    SubSort
  }
}
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
