<template>
  <div class="member-order-detail" v-if="order">
    <!-- 操作栏 -->
    <detail-action :order="order"></detail-action>
    <!-- 步骤条 组件xtx-steps.vue-->
    <!-- 物流栏 -->
    <!-- 订单商品信息 -->
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { findOrder } from '@/api/order'
import DetailAction from './detail-action'

export default {
  name: 'MemberOrderDetail',
  components: {
    DetailAction
  },
  setup () {
    const order = ref(null)
    const route = useRoute()
    findOrder(route.params.id).then(data => {
      order.value = data.result
    })
    return { order }
  }
}
</script>

<style scoped lang="less">
.member-order-detail {
  background: #fff;
}
</style>
