<template>
  <div class="member-home">
    <!-- 概览 -->
    <home-overview></home-overview>
    <!-- 收藏 -->
    <home-panel title="我的收藏"></home-panel>
    <!-- 足迹 -->
    <home-panel title="我的足迹"></home-panel>
    <!-- 猜你 -->
    <goods-relevant></goods-relevant>
  </div>
</template>

<script>
import MemberHomeOverview from './components/home-overview'
import MemberHomePanel from './components/home-panel'
import GoodsRelevant from '@/views/goods/components/goods-relevant'

export default {
  name: 'MemberHome',
  components: {
    HomeOverview: MemberHomeOverview,
    HomePanel: MemberHomePanel,
    GoodsRelevant
  }
}
</script>

<style scoped lang="less">
:deep(.xtx-carousel) .carousel-btn.prev {
  left: 5px;
}
:deep(.xtx-carousel) .carousel-btn.next {
  right: 5px;
}
</style>
