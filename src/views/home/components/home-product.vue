<template>
<div class="home-product" ref="target">
  <home-panel v-for="data in result" :title="data.name" :key="data.id">
    <template v-slot:right>
      <div class="sub">
        <router-link v-for="sub in data.children" :key="sub.id" to="/">{{ sub.name }}</router-link>
      </div>
      <xtx-more></xtx-more>
    </template>
    <div class="box">
      <router-link class="cover" to="/">
        <img :src="data.picture" alt="">
        <strong class="label">
          <span>{{ data.name }}馆</span>
          <span class="ellipsis">{{ data.saleInfo }}</span>
        </strong>
      </router-link>
      <ul class="goods-list">
        <li v-for="item in data.goods" :key="item.id">
          <home-goods :goods="item"></home-goods>
        </li>
      </ul>
    </div>
  </home-panel>
</div>
</template>

<script>
import { ref } from 'vue'
import { useLazyData } from '@/hooks'
import { findGoods } from '@/api/home'
import HomePanel from './home-panel'
import HomeGoods from './home-goods'

export default {
  name: 'HomeProduct',
  components: {
    HomePanel,
    HomeGoods
  },
  setup () {
    const target = ref(null)
    const result = useLazyData(target, findGoods)
    console.log(result)
    return { target, result }
  }
}
</script>

<style scoped lang="less">
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0,-50%,0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0,0,0,.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0,0,0,.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n+4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
