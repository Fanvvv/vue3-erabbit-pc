<template>
  <div class="cart-page">
    <div class="container">
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <xtx-bread-item>购物车</xtx-bread-item>
      </xtx-bread>
      <div class="cart">
        <table>
          <thead>
          <tr>
            <th width="120"><xtx-checkbox>全选</xtx-checkbox></th>
            <th width="400">商品信息</th>
            <th width="220">单价</th>
            <th width="180">数量</th>
            <th width="180">小计</th>
            <th width="140">操作</th>
          </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
          <tr v-for="i in 3" :key="i">
            <td><xtx-checkbox></xtx-checkbox></td>
            <td>
              <div class="goods">
                <router-link to="/"><img src="https://yanxuan-item.nosdn.127.net/13ab302f8f2c954d873f03be36f8fb03.png" alt=""></router-link>
                <div>
                  <p class="name ellipsis">和手足干裂说拜拜 ingrams手足皲裂修复霜</p>
                  <!-- 选择规格组件 -->
                  <p class="attr">颜色：白色柠檬（防污） 尺码：160cm</p>
                </div>
              </div>
            </td>
            <td class="tc">
              <p>&yen;200.00</p>
              <p>比加入时降价 <span class="red">&yen;20.00</span></p>
            </td>
            <td class="tc">
              <xtx-numbox></xtx-numbox>
            </td>
            <td class="tc"><p class="f16 red">&yen;200.00</p></td>
            <td class="tc">
              <p><a href="javascript:;">移入收藏夹</a></p>
              <p><a class="green" href="javascript:;">删除</a></p>
              <p><a href="javascript:;">找相似</a></p>
            </td>
          </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody>
          <tr><td colspan="6"><h3 class="tit">失效商品</h3></td></tr>
          <tr v-for="i in 3" :key="i">
            <td><xtx-checkbox style="color:#eee;"></xtx-checkbox></td>
            <td>
              <div class="goods">
                <router-link to="/"><img src="https://yanxuan-item.nosdn.127.net/13ab302f8f2c954d873f03be36f8fb03.png" alt=""></router-link>
                <div>
                  <p class="name ellipsis">和手足干裂说拜拜 ingrams手足皲裂修复霜</p>
                  <p class="attr">颜色：粉色 尺寸：14cm 产地：中国</p>
                </div>
              </div>
            </td>
            <td class="tc"><p>&yen;200.00</p></td>
            <td class="tc">1</td>
            <td class="tc"><p>&yen;200.00</p></td>
            <td class="tc">
              <p><a class="green" href="javascript:;">删除</a></p>
              <p><a href="javascript:;">找相似</a></p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <xtx-checkbox>全选</xtx-checkbox>
          <a href="javascript:;">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;">清空失效商品</a>
        </div>
        <div class="total">
          共 7 件商品，已选择 2 件，商品合计：
          <span class="red">¥400</span>
          <xtx-button type="primary">下单结算</xtx-button>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <goods-relevant></goods-relevant>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from '@/views/goods/components/goods-relevant'
export default {
  name: 'CartPage',
  components: {
    GoodsRelevant
  }
}
</script>

<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,td{
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
