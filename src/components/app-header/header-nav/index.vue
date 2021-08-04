<template>
  <ul class="header-nav">
    <li class="home"><router-link to="/">首页</router-link></li>
    <li v-for="item in list" :key="item.id">
      <router-link to="/">{{item.name}}</router-link>
      <div class="layer">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <router-link to="/">
              <img :src="sub.picture" alt="sub.name">
              <p>{{ sub.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'HeaderNav',
  setup () {
    const store = useStore()
    const list = computed(() => {
      return store.state.category.list
    })
    return { list }
  }
}
</script>

<style scoped lang="less">
.header-nav {
  position: relative;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  width: 820px;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      display: inline-block;
      font-size: 16px;
      height: 32px;
      line-height: 32px;
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 2px solid @xtxColor;
      }
      > .layer {
        height: 132px;
        opacity: 1;
      }
    }
  }
}
.layer {
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all .2s .1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
