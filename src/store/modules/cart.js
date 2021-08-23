// 购物车模块
import { getNewCartGoods } from '@/api/cart'

export default {
  namespaced: true,
  state () {
    return {
      list: []
    }
  },
  mutations: {
    // 加入购物车
    insertCart (state, payload) {
      const index = state.list.findIndex(goods => goods.skuId === payload.skuId)
      if (index > -1) {
        // 有相同的商品则数量增加
        const count = state.list[index].count
        payload.count += count
        // 删除原来的商品
        state.list.splice(index, 1)
      }
      state.list.unshift(payload)
    },
    // 修改购物车商品
    updateCart (state, goods) {
      // goods中字段有可能不完整，goods有的信息才去修改
      const updateGoods = state.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        if (goods[key] !== null && goods[key] !== undefined && goods[key] !== '') {
          updateGoods[key] = goods[key]
        }
      }
    },
    // 删除购物车商品
    deleteCart (state, skuId) {
      const deleteIndex = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(deleteIndex, 1)
    }
  },
  actions: {
    insertCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.token) {
          // 已登录
        } else {
          // 未登录
          ctx.commit('insertCart', payload)
          resolve()
        }
      })
    },
    // 获取购物车列表
    findCart (ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          const promiseArr = ctx.state.list.map(item => {
            return getNewCartGoods(item.skuId)
          })
          // Promise.all() 可以并列发送多个请求，等所有请求成功，调用then
          // Promise.race() 可以并列发送多个请求，等最快的请求成功，调用then
          Promise.all(promiseArr).then(dataArr => {
            dataArr.forEach((data, index) => {
              ctx.commit('updateCart', { skuId: ctx.state.list[index].skuId, ...data.result })
            })
            resolve()
          }).catch(e => {
            reject(e)
          })
        }
      })
    },
    // 删除购物车商品
    deleteCart (ctx, skuId) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          ctx.commit('deleteCart', skuId)
          resolve()
        }
      })
    }
  },
  getters: {
    // 有效商品列表
    validList (state) {
      // 库存大于 0，商品有标识
      return state.list.filter(goods => goods.stock > 0 && goods.isEffective)
    },
    // 有效商品总个数
    validTotal (state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总金额
    validAmount (state, getters) {
      return getters.validList.reduce((p, c) => p + c.count * Math.round(c.nowPrice * 100), 0) / 100
    },
    // 无效商品列表
    invalidList (state) {
      return state.list.filter(item => !(item.stock > 0 && item.isEffective))
    },
    // 选中商品列表
    selectedList (state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 选中商品件数
    selectedTotal (state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 选中商品总金额
    selectedAmount (state, getters) {
      return getters.selectedList.reduce((p, c) => p + (c.nowPrice * 100 * c.count), 0) / 100
    },
    // 是否全选
    isCheckAll (state, getters) {
      return getters.validList.length === getters.selectedList.length && getters.selectedList.length !== 0
    }
  }
}
