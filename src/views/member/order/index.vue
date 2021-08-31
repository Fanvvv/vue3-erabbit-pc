<template>
  <div class="member-order">
    <xtx-tabs v-model="activeName" @tab-click="tabClick">
      <xtx-tabs-panel
        v-for="item in orderStatus"
        :key="item.id"
        :name="item.name"
        :label="item.label"
      ></xtx-tabs-panel>
    </xtx-tabs>
    <!-- 订单列表 -->
    <div class="order-list">
      <div v-if="loading" class="loading"></div>
      <div v-if="!loading && orderList.length === 0" class="none">暂无数据</div>
      <order-item
        v-for="item in orderList"
        :key="item.id"
        :order="item"
        @on-cancel="onCancelOrder(item)"
      ></order-item>
    </div>
    <!-- 分页 -->
    <xtx-pagination
      v-if="total > requestParams.pageSize"
      @current-change="requestParams.page=$event"
      :total="total"
      :page-size="requestParams.pageSize"
      :current-page="requestParams.page"></xtx-pagination>
    <!-- 取消订单组件 -->
    <order-cancel ref="orderCancelCom"></order-cancel>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { orderStatus } from '@/api/constant/constant'
import { findOrderList } from '@/api/order'
import OrderItem from './components/order-item'
import OrderCancel from './components/order-cancel'

export default {
  name: 'MemberOrder',
  components: {
    OrderItem,
    OrderCancel
  },
  setup () {
    const activeName = ref('all')
    // 查询订单参数
    const requestParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })
    // 订单列表
    const orderList = ref([])
    // 是否在加载
    const loading = ref(false)
    // 订单总数
    const total = ref(0)
    // 查询订单，参数改变时重新发请求
    watch(requestParams, () => {
      loading.value = true
      findOrderList(requestParams).then(({ result }) => {
        // console.log(result)
        orderList.value = result.items
        total.value = result.counts
        loading.value = false
      })
    }, { immediate: true })
    const tabClick = (tab) => {
      // console.log(tab)
      // 此时：tab.index 就是订单的状态
      requestParams.orderState = tab.index
      requestParams.page = 1
    }
    return {
      activeName,
      tabClick,
      orderStatus,
      orderList,
      loading,
      requestParams,
      total,
      ...useCancelOrder()
    }
  }
}
// 封装逻辑-取消订单
const useCancelOrder = () => {
  const orderCancelCom = ref(null)
  const onCancelOrder = (item) => {
    // item 就是你要取消的订单
    orderCancelCom.value.open(item)
  }
  return { onCancelOrder, orderCancelCom }
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
