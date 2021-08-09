<template>
  <div class="category-page">
    <div class="container">
      <!-- 面包屑导航 -->
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <xtx-bread-item to="/">家具</xtx-bread-item>
        <xtx-bread-item>椅子</xtx-bread-item>
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
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { findBanner } from '@/api/home'

export default {
  name: 'TopCategory',
  setup () {
    // 获取轮播图数据
    const sliders = ref([])
    findBanner().then(data => {
      sliders.value = data.result
    })
    console.log(sliders)
    // 根据 url 的 param 获取分类数据
    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      return store.state.category.list.find(item => {
        return item.id === route.params.id
      }) || {}
    })
    return { sliders, topCategory }
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
}
</style>
