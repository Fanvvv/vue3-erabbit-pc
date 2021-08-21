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
  }
}
