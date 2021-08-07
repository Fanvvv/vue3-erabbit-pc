<template>
<div class="home-banner">
  <xtx-carousel auto-play :slider="slider"></xtx-carousel>
</div>
</template>

<script>
import { ref } from 'vue'
import { findBanner } from '@/api/home'

export default {
  name: 'home-banner',
  setup () {
    const slider = ref([])
    findBanner().then(data => {
      // console.log(data)
      slider.value = data.result
    })
    return { slider }
  }
}
</script>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98
}
.xtx-carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px !important;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>
