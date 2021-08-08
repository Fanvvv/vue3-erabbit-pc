<template>
<div class="home-brand">
  <home-panel title="热门品牌" sub-title="国际经典 品质保证" ref="target">
    <template v-slot:right>
      <a @click="activeIndex = 0" :class="{ disabled: activeIndex === 0 }" href="javascript:;" class="iconfont icon-angle-left"></a>
      <a @click="activeIndex = 1" :class="{ disabled: activeIndex === 1 }" href="javascript:;" class="iconfont icon-angle-right"></a>
    </template>
    <div class="box">
      <transition name="fade">
        <ul v-if="goods.length" class="list" :style="`transform: translateX(${ activeIndex ? '-50%' : 0 });`">
          <li v-for="item in goods" :key="item.id">
            <router-link to="/">
              <img v-lazyload="item.picture" alt="">
            </router-link>
          </li>
        </ul>
        <div v-else class="skeleton">
          <xtx-skeleton class="item" v-for="i in 5" :key="i" width="240px" height="305px" bg="#e4e4e4" animated></xtx-skeleton>
        </div>
      </transition>
    </div>
  </home-panel>
</div>
</template>

<script>
import { ref } from 'vue'
import { useLazyData } from '@/hooks'
import { findBrand } from '@/api/home'
import HomePanel from './home-panel'

export default {
  name: 'HomeBrand',
  components: {
    HomePanel
  },
  setup () {
    const target = ref(null)
    const result = useLazyData(target, () => findBrand(10))
    // console.log(result)
    // 切换效果，前提只有 0 1 两页
    const activeIndex = ref(0)
    return { goods: result, target, activeIndex }
  }
}
</script>

<style scoped lang="less">
.home-panel {
  background:#f5f5f5
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
.skeleton {
  width: 100%;
  display: flex;
  .item {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
