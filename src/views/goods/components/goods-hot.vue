<template>
<div class="goods-hot">
  <h3 v-if="type === 1">24小时热销榜</h3>
  <h3 v-else-if="type === 2">热销周榜</h3>
  <h3 v-else-if="type === 3">热销总榜</h3>
  <category-goods v-for="item in list" :key="item.id" :goods="item"></category-goods>
</div>
</template>

<script>
import { ref } from 'vue'
import { findHotGoods } from '@/api/product'
import CategoryGoods from '@/views/category/components/category-goods'

export default {
  name: 'GoodsHot',
  components: {
    CategoryGoods
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
    goodsId: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const list = ref([])
    findHotGoods(props.goodsId, props.type).then(({ result }) => {
      list.value = result
    })
    console.log(list)
    return { list }
  }
}
</script>

<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  :deep(.category-goods) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
