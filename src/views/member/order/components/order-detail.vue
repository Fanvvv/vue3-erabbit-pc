<template>
  <div class="member-order-detail" v-if="order">
    <!-- 操作栏 -->
    <detail-action :order="order"></detail-action>
    <!-- 步骤条 组件xtx-steps.vue-->
    <detail-steps :order="order"></detail-steps>
    <!-- 物流栏 -->
    <Suspense>
      <!-- 组件加载完毕显示 -->
      <template #default>
        <detail-logistics v-if="[3,4,5].includes(order.orderState)" :order="order"></detail-logistics>
      </template>
      <!-- 组件加载中显示 -->
      <template #fallback>
        <div class="loading">loading...</div>
      </template>
    </Suspense>
    <!-- 订单商品信息 -->
    <detail-info :order="order"></detail-info>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { findOrder } from '@/api/order'
import DetailAction from './detail-action'
import DetailSteps from './detail-steps'
import DetailLogistics from './detail-logistics'
import DetailInfo from './detail-info'

export default {
  name: 'MemberOrderDetail',
  components: {
    DetailLogistics,
    DetailAction,
    DetailSteps,
    DetailInfo
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
