<template>
  <div class="cart-none">
    <img src="@/assets/images/none.png" alt="" />
    <p>购物车内暂时没有商品</p>
    <div class="btn">
      <xtx-button type="primary" @click="$router.push('/')">去首页逛逛</xtx-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartNone'
}
</script>

<style scoped lang="less">
.cart-none {
  text-align: center;
  padding: 150px 0;
  background: #fff;
  img {
    width: 180px;
  }
  p {
    color: #999999;
    padding: 20px 0;
  }
}
</style>
