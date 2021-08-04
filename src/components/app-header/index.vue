<template>
<header class="app-header">
  <div class="container">
    <h1 class="logo"><RouterLink to="/">小兔鲜儿</RouterLink></h1>
    <header-nav></header-nav>
    <div class="search">
      <i class="iconfont icon-search"></i>
      <input type="text" placeholder="搜一搜">
    </div>
    <div class="cart">
      <a href="#" class="curr">
        <i class="iconfont icon-cart"></i>
        <em>2</em>
      </a>
    </div>
  </div>
</header>
</template>

<script>
import HeaderNav from './header-nav'
export default {
  name: 'AppHeader',
  components: {
    HeaderNav
  }
}
</script>

<style scoped lang="less">
.app-header {
  background-color: #fff;
  .container {
    display: flex;
    align-items: center;
    .logo {
      width: 200px;
      a {
        display: block;
        height: 132px;
        width: 100%;
        text-indent: -9999px;
        background: url("../../assets/images/logo.png") no-repeat center 18px / contain;
      }
    }
    .search {
      width: 170px;
      height: 32px;
      line-height: 32px;
      border-bottom: 1px solid #e7e7e7;
      .icon-search {
        font-size: 18px;
        margin-left: 5px;
      }
      input {
        width: 140px;
        padding-left: 5px;
        color: #666;
      }
    }
    .cart {
      width: 50px;
      .curr {
        position: relative;
        display: block;
        height: 32px;
        line-height: 32px;
        text-align: center;
        .icon-cart {
          font-size: 22px;
        }
        em {
          position: absolute;
          right: 0;
          top: 0;
          padding: 1px 6px;
          line-height: 1;
          font-family: Arial,serif;
          font-style: normal;
          font-size: 12px;
          color: #fff;
          background: @helpColor;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
