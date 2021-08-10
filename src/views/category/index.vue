<template>
  <div class="category-page">
    <div class="container">
      <!-- 面包屑导航 -->
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <transition name="fade-right" mode="out-in">
          <xtx-bread-item :key="topCategory.id">{{ topCategory.name }}</xtx-bread-item>
        </transition>
      </xtx-bread>
      <!-- 轮播图 -->
      <xtx-carousel :slider="sliders" auto-play style="height: 500px"></xtx-carousel>
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="sub in topCategory.children" :key="sub.id">
            <a href="javascript:;">
              <img :src="sub.picture" alt=""/>
              <p>{{ sub.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="item in goods" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">小兔鲜儿 品质之选</p>
          <xtx-more></xtx-more>
        </div>
        <div class="body">
          <category-goods v-for="list in item.goods" :key="list.id" :goods="list"></category-goods>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { findBanner } from '@/api/home'
import { findTopCategory } from '@/api/category'
import CategoryGoods from './components/category-goods'

export default {
  name: 'TopCategory',
  components: {
    CategoryGoods
  },
  setup () {
    // 获取轮播图数据
    const sliders = ref([])
    findBanner().then(data => {
      sliders.value = data.result
    })
    // 根据 url 的 param 获取分类数据
    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      return store.state.category.list.find(item => {
        return item.id === route.params.id
      }) || {}
    })
    // 获取一级类目数据
    const goods = ref(null)
    const getGoods = () => {
      findTopCategory(route.params.id).then(data => {
        // console.log(data)
        goods.value = data.result.children
      })
    }
    // 使用 watch 监听 params.id 的变化
    watch(() => route.params.id, (newValue) => {
      // newValue && getGoods()
      // 防止进入二级类目也发请求，添加发请求的条件
      newValue && `/category/${newValue}` === route.path && getGoods()
    }, { immediate: true })
    // console.log(goods)
    return { sliders, topCategory, goods }
  }
}
</script>

<style scoped lang="less">
.category-page {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
