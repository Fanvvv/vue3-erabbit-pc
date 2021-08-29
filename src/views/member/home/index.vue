<template>
  <div class="member-home">
    <!-- 概览 -->
    <home-overview></home-overview>
    <!-- 收藏 -->
    <home-panel title="我的收藏">
      <category-goods v-for="i in 4" :key="i" :goods="goods"></category-goods>
    </home-panel>
    <!-- 足迹 -->
    <home-panel title="我的足迹">
      <category-goods v-for="i in 4" :key="i" :goods="goods"></category-goods>
    </home-panel>
    <!-- 猜你 -->
    <goods-relevant></goods-relevant>
  </div>
</template>

<script>
import MemberHomeOverview from './components/home-overview'
import MemberHomePanel from './components/home-panel'
import GoodsRelevant from '@/views/goods/components/goods-relevant'
import CategoryGoods from '@/views/category/components/category-goods'

export default {
  name: 'MemberHome',
  components: {
    HomeOverview: MemberHomeOverview,
    HomePanel: MemberHomePanel,
    GoodsRelevant,
    CategoryGoods
  },
  setup () {
    const goods = {
      id: '1',
      name: '自煮火锅不排队 麦饭石不粘鸳鸯火锅',
      picture: 'https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg',
      desc: '清汤鲜香 红汤劲爽',
      price: '159.00'
    }
    return { goods }
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
