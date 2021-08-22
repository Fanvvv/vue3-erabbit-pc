// 购物车模块
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
    }
  }
}
