<template>
<div class="home-page">
  <div class="home-entry">
    <div class="container">
      <!-- 左侧列表 -->
      <home-category></home-category>
    </div>
  </div>
</div>
</template>

<script>
import HomeCategory from './components/home-category'
export default {
  name: 'HomePage',
  components: {
    HomeCategory
  }
}
</script>

<style scoped lang="less">
.container {
  min-height: 800px;
}
</style>
