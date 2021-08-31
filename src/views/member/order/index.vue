<template>
  <div class="member-order">
    <xtx-tabs v-model="activeName" @click-tab="clickTab">
      <xtx-tabs-panel
        v-for="item in orderStatus"
        :key="item.id"
        :name="item.name"
        :label="item.label"
      >
        {{ item.label }}
      </xtx-tabs-panel>
    </xtx-tabs>
    <!-- 订单列表 -->
    <div class="order-list" v-if="orderList">
      <order-item v-for="item in orderList" :key="item.id" :order="item" />
    </div>
    <div v-else class="loading"></div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { orderStatus } from '@/api/constant/constant'
import OrderItem from '@/views/member/order/components/order-item'
import { findOrderList } from '@/api/order'

export default {
  name: 'MemberOrder',
  components: {
    OrderItem
  },
  setup () {
    const activeName = ref('all')
    const clickTab = (name) => {
      console.log(name)
    }
    // 查询订单参数
    const requestParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })
    // 订单列表
    const orderList = ref([])
    // 查询订单
    findOrderList(requestParams).then(data => {
      orderList.value = data.result.items
    })
    return { activeName, clickTab, orderStatus, orderList }
  }
}
</script>

<style scoped lang="less">
.member-order {
  height: 100%;
  background: #fff;
}
.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255,255,255,.9) url(../../../assets/images/loading.gif) no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
