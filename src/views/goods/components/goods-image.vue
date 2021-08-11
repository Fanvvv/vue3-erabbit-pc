<template>
<div class="goods-image">
  <!-- 图片放大镜效果 -->
  <div class="large" v-show="show">
    <img :src="images[activeIndex]" :style="largePosition" alt="">
  </div>
  <div class="middle" ref="target">
    <img :src="images[activeIndex]" alt="">
    <div class="layer" v-show="show" :style="layerPosition"></div>
  </div>
  <ul class="small">
    <li v-for="(item, i) in images" :key="item" :class="{ active: i === activeIndex }">
      <img :src="item" @mouseenter="activeIndex = i" alt="">
    </li>
  </ul>
</div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'

export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    // 当前预览图的索引
    const activeIndex = ref(0)

    // 1. 是否显示遮罩和大图
    const show = ref(false)
    // 2. 遮罩的坐标(样式)
    const layerPosition = reactive({
      left: 0,
      top: 0
    })
    // 3. 大图背景定位(样式)
    const largePosition = reactive({
      left: 0,
      top: 0
    })
    // 4. 使用useMouseInElement得到基于元素左上角的坐标和是否离开元素数据
    const target = ref(null)
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    watch([elementX, elementY, isOutside], () => {
      // 5. 根据得到数据设置样式数据和是否显示数据
      show.value = !isOutside.value
      // 计算坐标
      const position = { x: 0, y: 0 }

      if (elementX.value < 100) position.x = 0
      else if (elementX.value > 300) position.x = 200
      else position.x = elementX.value - 100

      if (elementY.value < 100) position.y = 0
      else if (elementY.value > 300) position.y = 200
      else position.y = elementY.value - 100
      // 给样式赋值
      layerPosition.left = position.x + 'px'
      layerPosition.top = position.y + 'px'
      largePosition.left = -2 * position.x + 'px'
      largePosition.top = -2 * position.y + 'px'
    })

    return { activeIndex, show, layerPosition, largePosition, target }
  }
}
</script>

<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
    overflow: hidden;
    img {
      max-width: 800px;
      max-height: 800px;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0,0,0,.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,&.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
