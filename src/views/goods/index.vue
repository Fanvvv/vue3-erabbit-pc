<template>
<div class="goods-page" v-if="goods">
  <div class="container">
    <!-- 面包屑导航 -->
    <xtx-bread>
      <xtx-bread-item to="/">首页</xtx-bread-item>
      <xtx-bread-item :to="`/category/${goods.categories[1].id}`">{{ goods.categories[1].name }}</xtx-bread-item>
      <xtx-bread-item :to="`/category/sub/${goods.categories[0].id}`">{{ goods.categories[0].name }}</xtx-bread-item>
      <xtx-bread-item>{{ goods.name }}</xtx-bread-item>
    </xtx-bread>
    <!-- 商品信息 -->
    <div class="goods-info">
      <!-- 商品信息左边 -->
      <div class="goods-info-left">
        <goods-image :images="goods.mainPictures"></goods-image>
        <goods-sales></goods-sales>
      </div>
      <!-- 商品信息右边 -->
      <div class="goods-info-right">
        <goods-name :goods="goods"></goods-name>
      </div>
    </div>
    <!-- 商品推荐 -->
    <goods-relevant></goods-relevant>
    <!-- 商品详情 -->
    <div class="goods-footer">
      <div class="goods-article">
        <!-- 商品+评价 -->
        <div class="goods-tabs"></div>
        <!-- 注意事项 -->
        <div class="goods-warn"></div>
      </div>
      <!-- 24小时热榜 -->
      <div class="goods-aside"></div>
    </div>
  </div>
</div>
</template>

<script>
import { ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { findGoods } from '@/api/product'
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image'
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'

export default {
  name: 'GoodsPage',
  components: {
    GoodsRelevant,
    GoodsImage,
    GoodsSales,
    GoodsName
  },
  setup () {
    const goods = useGoods()
    console.log(goods)
    return { goods }
  }
}
const useGoods = () => {
  const goods = ref(null)
  const route = useRoute()
  watch(() => route.params.id, (newVal) => {
    if (newVal && route.path === `/product/${newVal}`) {
      findGoods(route.params.id).then(({ result }) => {
        // 让商品数据为null 然后使用v-if的组件可以重新销毁和创建
        goods.value = null
        nextTick(() => {
          goods.value = result
        })
      })
    }
  }, { immediate: true })
  return goods
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  &-left {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  &-right {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
