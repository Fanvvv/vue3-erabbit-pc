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
</div>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner
  }
}
</script>

<style scoped lang="less">
.container {
  min-height: 800px;
}
</style>
