<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle()">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <div class="loading" v-if="!goods"></div>
      <goods-sku v-if="goods" :skuId="skuId" :goods="goods" @change="changeSku"></goods-sku>
      <xtx-button v-if="goods" type="primary" size="mini" style="margin-left:60px" @click="submit">确认</xtx-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import GoodsSku from '@/views/goods/components/goods-sku'
import { getSpecsAndSkus } from '@/api/cart'

export default {
  name: 'CartSku',
  components: {
    GoodsSku
  },
  props: {
    attrsText: {
      type: String,
      default: ''
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const visible = ref(false)
    const goods = ref(null)
    // 显示
    const show = () => {
      visible.value = true
      getSpecsAndSkus(props.skuId).then(({ result }) => {
        goods.value = result
      })
    }
    // 隐藏
    const hide = () => {
      visible.value = false
      goods.value = null
    }
    const toggle = () => {
      visible.value ? hide() : show()
    }
    const target = ref(null)
    onClickOutside(target, () => {
      hide()
    })
    // 选择 SKU 的时候触发
    const currSku = ref(null)
    const changeSku = (sku) => {
      currSku.value = sku
    }
    const submit = () => {
      if (currSku.value && currSku.value.skuId && currSku.value.skuId !== props.skuId) {
        emit('change', currSku.value)
        hide()
      }
    }
    return { visible, goods, toggle, target, changeSku, submit }
  }
}
</script>

<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display:inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor,50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(.8,1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(~@/assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
