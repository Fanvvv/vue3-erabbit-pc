<template>
<div class="goods-image">
  <div class="middle">
    <img :src="images[activeIndex]" alt="">
  </div>
  <ul class="small">
    <li v-for="(item, i) in images" :key="i">
      <img :src="item" alt="">
    </li>
  </ul>
</div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const activeIndex = ref(0)
    return { activeIndex }
  }
}
</script>

<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
