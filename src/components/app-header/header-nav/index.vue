<template>
  <ul class="header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li>
      <a href="#">居家</a>
    </li>
    <li>
      <a href="#">美食</a>
      <div class="layer">
        <ul>
          <li v-for="i in 10" :key="i">
            <a href="#">
              <img src="https://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(4).png" alt="">
              <p>果干</p>
            </a>
          </li>
        </ul>
      </div>
    </li>
    <li><a href="#">服饰</a></li>
    <li><a href="#">母婴</a></li>
    <li><a href="#">个护</a></li>
    <li><a href="#">严选</a></li>
    <li><a href="#">数码</a></li>
    <li><a href="#">运动</a></li>
    <li><a href="#">杂项</a></li>
  </ul>
</template>

<script>
export default {
  name: 'HeaderNav'
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
