<template>
<div class="home-hot">
  <home-panel title="人气推荐" sub-title="人气爆款 不容错过">
    <ul class="goods-list">
      <li v-for="item in goods" :key="item.id">
        <router-link to="/"></router-link>
        <img :src="item.picture" alt="">
        <p class="name">{{ item.title }}</p>
        <p class="desc">{{ item.alt }}</p>
      </li>
    </ul>
  </home-panel>
</div>
</template>

<script>
import { ref } from 'vue'
import { findHot } from '@/api/home'
import HomePanel from './home-panel'

export default {
  name: 'home-hot',
  components: {
    HomePanel
  },
  setup () {
    const goods = ref([])
    findHot().then(data => {
      // console.log(data)
      goods.value = data.result
    })
    return { goods }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
