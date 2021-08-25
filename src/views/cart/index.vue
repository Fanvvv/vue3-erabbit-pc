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
            <th width="120">
              <xtx-checkbox
                :modelValue="$store.getters['cart/isCheckAll']"
                @change="checkAllBtn"
              >
                全选
              </xtx-checkbox>
            </th>
            <th width="400">商品信息</th>
            <th width="220">单价</th>
            <th width="180">数量</th>
            <th width="180">小计</th>
            <th width="140">操作</th>
          </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
          <tr v-if="$store.getters['cart/validList'].length === 0">
            <td colspan="6">
              <cart-none></cart-none>
            </td>
          </tr>
          <tr v-for="item in $store.getters['cart/validList']" :key="item.skuId">
            <td>
              <xtx-checkbox
                v-model="item.selected"
                @change="$store.dispatch('cart/updateCart', item)"
              >
              </xtx-checkbox>
            </td>
            <td>
              <div class="goods">
                <router-link :to="`/product/${item.id}`">
                  <img :src="item.picture"  alt="">
                </router-link>
                <div>
                  <p class="name ellipsis">{{ item.name }}</p>
                  <!-- 选择规格组件 -->
                  <cart-sku
                    :attrs-text="item.attrsText"
                    :sku-id="item.skuId"
                    @change="($event) => updateCartSku(item.skuId, $event)"
                  ></cart-sku>
                </div>
              </div>
            </td>
            <td class="tc">
              <p>&yen;{{ item.nowPrice }}</p>
              <p v-if="item.price - item.nowPrice > 0">
                比加入时降价 <span class="red">&yen;{{ item.price - item.nowPrice }}</span>
              </p>
            </td>
            <td class="tc">
              <xtx-numbox
                v-model="item.count"
                :max="item.stock"
                @change="$store.dispatch('cart/updateCart', item)">
              </xtx-numbox>
            </td>
            <td class="tc"><p class="f16 red">&yen;{{ item.nowPrice * 100 * item.count / 100 }}</p></td>
            <td class="tc">
              <p><a href="javascript:;">移入收藏夹</a></p>
              <p><a class="green" href="javascript:;" @click="deleteBtn(item.skuId)">删除</a></p>
              <p><a href="javascript:;">找相似</a></p>
            </td>
          </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody v-if="$store.getters['cart/invalidList'].length > 0">
          <tr><td colspan="6"><h3 class="tit">失效商品</h3></td></tr>
          <tr v-for="item in $store.getters['cart/validList']" :key="item.skuId">
            <td><xtx-checkbox style="color: #eee;"></xtx-checkbox></td>
            <td>
              <div class="goods">
                <router-link :to="`/product/${item.id}`">
                  <img :src="item.picture" alt="">
                </router-link>
                <div>
                  <p class="name ellipsis">{{ item.name }}</p>
                  <p class="attr">{{ item.attrsText }}</p>
                </div>
              </div>
            </td>
            <td class="tc"><p>&yen;{{ item.nowPrice }}</p></td>
            <td class="tc">{{ item.count }}</td>
            <td class="tc"><p>&yen;{{ item.nowPrice * 100 * item.count / 100 }}</p></td>
            <td class="tc">
              <p><a class="green" href="javascript:;" @click="deleteBtn(item.skuId)">删除</a></p>
              <p><a href="javascript:;">找相似</a></p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <xtx-checkbox
            :modelValue="$store.getters['cart/isCheckAll']"
            @change="checkAllBtn"
          >
            全选
          </xtx-checkbox>
          <a href="javascript:;" @click="batchDeleteBtn()">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;" @click="batchDeleteBtn(true)">清空失效商品</a>
        </div>
        <div class="total">
          共 {{$store.getters['cart/validTotal']}} 件商品，已选择 {{$store.getters['cart/selectedTotal']}} 件，商品合计：
          <span class="red">&yen;{{$store.getters['cart/selectedAmount']}}</span>
          <xtx-button type="primary" @click="goCheckout">下单结算</xtx-button>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <goods-relevant></goods-relevant>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Message from '@/components/library/Message'
import Confirm from '@/components/library/Confirm'
import GoodsRelevant from '@/views/goods/components/goods-relevant'
import CartNone from './components/cart-none'
import CartSku from './components/cart-sku'
export default {
  name: 'CartPage',
  components: {
    GoodsRelevant,
    CartNone,
    CartSku
  },
  setup () {
    const store = useStore()
    // 全选
    const checkAllBtn = (selected) => {
      store.dispatch('cart/checkAllCart', selected)
    }
    // 删除
    const deleteBtn = (skuId) => {
      Confirm({ text: '您确定从购物车删除该商品吗？' }).then(() => {
        store.dispatch('cart/deleteCart', skuId).then(() => {
          Message({ type: 'success', text: '删除成功' })
        })
      }).catch(e => {
        return e
      })
    }
    // 批量删除
    const batchDeleteBtn = (isClear) => {
      Confirm({ text: `您确定从购物车删除${isClear ? '失效' : '选中'}的商品吗？` }).then(() => {
        store.dispatch('cart/batchDeleteCart', isClear).then(() => {
          Message({ type: 'success', text: '删除成功' })
        })
      }).catch(e => {
        return e
      })
    }
    // 修改规格
    const updateCartSku = (oldSkuId, newSku) => {
      store.dispatch('cart/updateCartSku', { oldSkuId, newSku })
    }
    // 下单结算
    const router = useRouter()
    const goCheckout = () => {
      // 1. 判断是否选择有效商品
      // 2. 判断是否已经登录，未登录 弹窗提示
      // 3. 进行跳转 （需要做访问权限控制）
      if (store.getters['cart/selectedTotal'] === 0) return Message({ text: '至少选中一件商品才能结算' })
      if (!store.state.user.profile.token) {
        Confirm({ text: '下单结算需要登录，您是否去登录？' }).then(() => {
          // 点击确认
          router.push('/member/checkout')
        }).catch(e => {})
      } else {
        router.push('/member/checkout')
      }
    }
    return { checkAllBtn, deleteBtn, batchDeleteBtn, updateCartSku, goCheckout }
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
