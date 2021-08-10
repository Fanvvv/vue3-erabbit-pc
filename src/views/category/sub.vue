<template>
  <div class="sub-page">
    <div class="container">
      <!-- 面包屑 -->
      <sub-bread></sub-bread>
      <!-- 筛选区 -->
      <sub-filter></sub-filter>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
export default {
  name: 'SubPage',
  components: {
    SubBread,
    SubFilter
  }
}
</script>

<style scoped>

</style>
