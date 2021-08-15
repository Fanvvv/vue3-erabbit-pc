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
        <!-- 商品规格 -->
        <goods-sku :goods="goods" @change="changeSku"></goods-sku>
        <!-- 商品数量按钮 -->
        <xtx-numbox label="数量" v-model="num" :max="goods.inventory"></xtx-numbox>
        <!-- 加入购物车按钮 -->
        <xtx-button type="primary" style="margin-top: 20px">加入购物车</xtx-button>
      </div>
    </div>
    <!-- 商品推荐 -->
    <goods-relevant :goods-id="goods.id"></goods-relevant>
    <!-- 商品详情 -->
    <div class="goods-footer">
      <div class="goods-article">
        <!-- 商品+评价 -->
        <goods-tabs></goods-tabs>
        <!-- 注意事项 -->
        <div class="goods-warn"></div>
      </div>
      <!-- 24小时热榜 -->
      <div class="goods-aside">
        <goods-hot :type="1" :goods-id="goods.id"></goods-hot>
        <goods-hot :type="2" :goods-id="goods.id"></goods-hot>
      </div>
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
import GoodsSku from './components/goods-sku'
import GoodsHot from './components/goods-hot'
import GoodsTabs from './components/goods-tabs'

export default {
  name: 'GoodsPage',
  components: {
    GoodsRelevant,
    GoodsImage,
    GoodsSales,
    GoodsName,
    GoodsSku,
    GoodsHot,
    GoodsTabs
  },
  setup () {
    const goods = useGoods()
    // console.log(goods)
    const changeSku = (sku) => {
      // 修改商品的现价原价库存信息
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
    }
    const num = ref(1)
    return { goods, changeSku, num }
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
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
