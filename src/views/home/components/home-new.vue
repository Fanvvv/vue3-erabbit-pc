<template>
<div class="home-new">
  <home-panel title="新鲜好物" sub-title="新鲜出炉 品质靠谱" ref="target">
    <template #right>
      <xtx-more path="/"></xtx-more>
    </template>
    <transition name="fade">
      <ul class="goods-list" v-if="goods.length">
        <li v-for="item in goods" :key="item.id">
          <router-link :to="`/product/${item.id}`">
            <img v-lazyload="item.picture" alt="">
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price}}</p>
          </router-link>
        </li>
      </ul>
      <home-skeleton v-else></home-skeleton>
    </transition>
  </home-panel>
</div>
</template>

<script>
import { ref } from 'vue'
import { findNew } from '@/api/home'
import HomePanel from './home-panel'
import HomeSkeleton from './home-skeleton'
import { useLazyData } from '@/hooks'

export default {
  name: 'HomeNew',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup () {
    // const goods = ref([])
    // findNew().then(data => {
    //   console.log(data)
    //   goods.value = data.result
    // })
    // 使用复用的钩子函数实现懒加载
    const target = ref(null)
    const result = useLazyData(target, findNew)
    return { goods: result, target }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
