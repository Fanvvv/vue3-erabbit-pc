<template>
<div class="xtx-carousel" @mouseenter="stop()" @mouseleave="start()">
  <ul class="carousel-body">
    <li class="carousel-item" v-for="(item, i) in slider" :key="i" :class="{ fade: index === i }">
      <router-link v-if="item.hrefUrl" :to="item.hrefUrl">
        <img :src="item.imgUrl" alt="item.name">
      </router-link>
      <div v-else class="slider">
        <router-link v-for="goods in item" :key="goods.id" :to="`/product/${goods.id}`">
          <img :src="goods.picture" alt="">
          <p class="name ellipsis">{{ goods.name }}</p>
          <p class="price">&yen;{{ goods.price }}</p>
        </router-link>
      </div>
    </li>
  </ul>
  <!-- 上一张 -->
  <a href="javascript:;" class="carousel-btn prev" @click="toggle(-1)">
    <i class="iconfont icon-angle-left"></i>
  </a>
  <!-- 下一张 -->
  <a href="javascript:;" class="carousel-btn next" @click="toggle(1)">
    <i class="iconfont icon-angle-right"></i>
  </a>
  <!-- 小圆点 -->
  <div class="carousel-indicator">
    <span v-for="(item, i) in slider" :key="i" :class="{ active: index === i }" @click="index = i"></span>
  </div>
</div>
</template>

<script>
import { onUnmounted, ref, watch } from 'vue'

export default {
  name: 'XtxCarousel',
  props: {
    slider: {
      type: Array,
      default: () => []
    },
    duration: {
      type: Number,
      default: 3000
    },
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const index = ref(0)
    // 切换上一张下一张逻辑
    const toggle = (step) => {
      const temp = index.value + step
      if (temp > props.slider.length - 1) {
        index.value = 0
        return
      }
      if (temp < 0) {
        index.value = props.slider.length - 1
        return
      }
      index.value = temp
    }
    // 自动轮播
    let timer = null
    const autoPaly = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        index.value++
        if (index.value > props.slider.length - 1) {
          index.value = 0
        }
      }, props.duration)
    }
    watch(() => {
      return props.slider
    }, newValue => {
      // 有数据和开启轮播，才执行函数
      if (newValue.length > 1 && props.autoPlay) {
        autoPaly()
      }
    }, {
      immediate: true
    })
    // 鼠标进入停止，移出开启自动，前提条件：autoPlay为true
    const stop = () => {
      if (timer) {
        clearInterval(timer)
      }
    }
    const start = () => {
      if (props.slider.length && props.autoPlay) {
        autoPaly()
      }
    }
    // 组件销毁时清除定时器
    onUnmounted(() => {
      clearInterval(timer)
    })
    return { index, toggle, stop, start }
  }
}
</script>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
      // 轮播商品
      .slider {
        display: flex;
        justify-content: space-around;
        padding: 0 40px;
        > a {
          width: 240px;
          text-align: center;
          img {
            padding: 20px;
            width: 230px!important;
            height: 230px!important;
          }
          .name {
            font-size: 16px;
            color: #666;
            padding: 0 40px;
          }
          .price {
            font-size: 16px;
            color: @priceColor;
            margin-top: 15px;
          }
        }
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
