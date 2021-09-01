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
        @on-delete="onDeleteOrder(item)"
        @on-confirm="onConfirmOrder(item)"
        @on-logistics="onLogisticsOrder(item)"
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
    <!-- 查看物流组件 -->
    <order-logistics ref="orderLogisticsCom"></order-logistics>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { orderStatus } from '@/api/constant/constant'
import { findOrderList, deleteOrder, confirmOrder } from '@/api/order'
import OrderItem from './components/order-item'
import OrderCancel from './components/order-cancel'
import OrderLogistics from './components/order-logistics'
import Confirm from '@/components/library/Confirm'
import Message from '@/components/library/Message'

export default {
  name: 'MemberOrder',
  components: {
    OrderItem,
    OrderCancel,
    OrderLogistics
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
    // 监听 requestParams 的改变
    const findOrderListFn = () => {
      loading.value = true
      findOrderList(requestParams).then(({ result }) => {
        // console.log(result)
        orderList.value = result.items
        total.value = result.counts
        loading.value = false
      })
    }
    // 查询订单，参数改变时重新发请求
    watch(requestParams, () => {
      findOrderListFn()
    }, { immediate: true })
    const tabClick = (tab) => {
      // console.log(tab)
      // 此时：tab.index 就是订单的状态
      requestParams.orderState = tab.index
      requestParams.page = 1
    }
    // 删除订单
    const onDeleteOrder = (item) => {
      Confirm({ text: '您确定删除该条订单吗？' }).then(() => {
        deleteOrder([item.id]).then(() => {
          Message({ type: 'success', text: '删除订单成功' })
          findOrderListFn()
        })
      }).catch(e => {})
    }
    return {
      activeName,
      tabClick,
      orderStatus,
      orderList,
      loading,
      requestParams,
      total,
      onDeleteOrder,
      ...useCancelOrder(),
      ...useConfirmOrder(),
      ...useLogisticsOrder()
    }
  }
}
// 封装逻辑-取消订单
export const useCancelOrder = () => {
  const orderCancelCom = ref(null)
  const onCancelOrder = (item) => {
    // item 就是你要取消的订单
    orderCancelCom.value.open(item)
  }
  return { onCancelOrder, orderCancelCom }
}
// 封装逻辑-确认收货
const useConfirmOrder = () => {
  const onConfirmOrder = (item) => {
    // item 就是你要确认收货的订单
    Confirm({ text: '您确认收到货吗？确认后货款将会打给卖家。' }).then(() => {
      confirmOrder(item.id).then(() => {
        Message({ text: '确认收货成功', type: 'success' })
        // 确认收货后状态变成 待评价
        item.orderState = 4
      })
    }).catch(e => {})
  }
  return { onConfirmOrder }
}
// 封装逻辑-查看物流
export const useLogisticsOrder = () => {
  const orderLogisticsCom = ref(null)
  const onLogisticsOrder = (item) => {
    orderLogisticsCom.value.open(item)
  }
  return { onLogisticsOrder, orderLogisticsCom }
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
