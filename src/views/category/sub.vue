<template>
  <div class="sub-page">
    <div class="container">
      <!-- 面包屑 -->
      <sub-bread></sub-bread>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
export default {
  name: 'SubPage',
  components: {
    SubBread
  }
}
</script>

<style scoped>

</style>
