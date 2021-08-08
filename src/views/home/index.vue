<template>
<div class="home-page">
  <div class="home-entry">
    <div class="container">
      <!-- 左侧列表 -->
      <home-category></home-category>
      <!-- 轮播图 -->
      <home-banner></home-banner>
    </div>
  </div>
  <!-- 新鲜好物 -->
  <home-new></home-new>
  <!-- 人气推荐 -->
  <home-hot></home-hot>
  <!-- 热门品牌 -->
  <home-brand></home-brand>
</div>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new'
import HomeHot from './components/home-hot'
import HomeBrand from './components/home-brand'

export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand
  }
}
</script>
