<template>
  <p class="goods-name">{{ goods.name }}</p>
  <p class="goods-desc">{{ goods.desc }}</p>
  <p class="goods-price">
    <span>{{ goods.price }}</span>
    <span>{{ goods.oldPrice }}</span>
  </p>
  <div class="goods-service">
    <dl>
      <dt>促销</dt>
      <dd>12月好物放送，App领券购买直降120元</dd>
    </dl>
    <dl>
      <dt>配送</dt>
      <dd>至 <xtx-city :full-location="fullLocation" @change="changeCity"></xtx-city></dd>
    </dl>
    <dl>
      <dt>服务</dt>
      <dd>
        <span>无忧退货</span>
        <span>快速退款</span>
        <span>免费包邮</span>
        <a href="javascript:;">了解详情</a>
      </dd>
    </dl>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'GoodsName',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    // 默认情况
    const provinceCode = ref('110000')
    const cityCode = ref('119900')
    const countyCode = ref('110101')
    const fullLocation = ref('北京市 市辖区 东城区')
    // 有默认地址
    if (props.goods.userAddresses) {
      const defaultAddr = props.goods.userAddresses.find(addr => addr.isDefault === 1)
      if (defaultAddr) {
        provinceCode.value = defaultAddr.provinceCode
        cityCode.value = defaultAddr.cityCode
        countyCode.value = defaultAddr.countyCode
        fullLocation.value = defaultAddr.fullLocation
      }
    }
    // 选择城市
    const changeCity = (result) => {
      provinceCode.value = result.provinceCode
      cityCode.value = result.cityCode
      countyCode.value = result.countyCode
      fullLocation.value = result.fullLocation
    }
    return { fullLocation, changeCity }
  }
}
</script>

<style scoped lang="less">
.goods-name {
  font-size: 22px
}
.goods-desc {
  color: #999;
  margin-top: 10px;
}
.goods-price {
  margin-top: 10px;
  span {
    &::before {
      content: "¥";
      font-size: 14px;
    }
    &:first-child {
      color: @priceColor;
      margin-right: 10px;
      font-size: 22px;
    }
    &:last-child {
      color: #999;
      text-decoration: line-through;
      font-size: 16px;
    }
  }
}
.goods-service {
  background: #f5f5f5;
  width: 500px;
  padding: 20px 10px 0 10px;
  margin-top: 10px;
  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      color: #666;
      &:last-child {
        span {
          margin-right: 10px;
          &::before {
            content: "•";
            color: @xtxColor;
            margin-right: 2px;
          }
        }
        a {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
