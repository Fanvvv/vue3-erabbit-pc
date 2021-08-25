// 购物车模块
import {
  deleteCart,
  findCartList,
  getNewCartGoods,
  insertCart,
  mergeLocalCart,
  updateCart,
  checkAllCart
} from '@/api/cart'

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
    },
    // 设置购物车列表
    setCartList (state, list) {
      state.list = list
    }
  },
  actions: {
    insertCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          insertCart(payload).then(() => {
            return findCartList()
          }).then(({ result }) => {
            ctx.commit('setCartList', result)
            resolve()
          })
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
          findCartList().then(({ result }) => {
            ctx.commit('setCartList', result)
            resolve()
          })
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
          deleteCart([skuId]).then(() => {
            return findCartList()
          }).then(({ result }) => {
            ctx.commit('setCartList', result)
            resolve()
          })
        } else {
          // 未登录
          ctx.commit('deleteCart', skuId)
          resolve()
        }
      })
    },
    // 修改购物车商品
    updateCart (ctx, goods) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          updateCart(goods).then(() => {
            return findCartList()
          }).then(({ result }) => {
            ctx.commit('setCartList', result)
            resolve()
          })
        } else {
          // 未登录
          ctx.commit('updateCart', goods)
          resolve()
        }
      })
    },
    // 全选商品
    checkAllCart (ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          const ids = ctx.getters.validList.map(item => item.skuId)
          checkAllCart({ selected, ids }).then(() => {
            return findCartList()
          }).then(({ result }) => {
            ctx.commit('setCartList', result)
            resolve()
          })
        } else {
          // 未登录
          ctx.getters.validList.forEach(item => {
            ctx.commit('updateCart', { skuId: item.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 批量删除选中商品
    batchDeleteCart (ctx, isClear) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          const ids = ctx.getters[isClear ? 'invalidList' : 'selectedList'].map(item => item.skuId)
          deleteCart(ids).then(() => {
            return findCartList()
          }).then(({ result }) => {
            ctx.commit('setCartList', result)
            resolve()
          })
        } else {
          // 未登录
          ctx.getters[isClear ? 'invalidList' : 'selectedList'].forEach(item => {
            ctx.commit('deleteCart', item.skuId)
          })
          resolve()
        }
      })
    },
    // 修改sku规格函数
    updateCartSku (ctx, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录
          // 1. 获取原先商品的数量
          // 2. 删除原先商品
          // 3. 获取修改的skuId 和 原先商品数量 做一个加入购物车操作
          // 4. 更新列表
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          deleteCart([oldSkuId]).then(() => {
            return insertCart({ skuId: newSku.skuId, count: oldGoods.count })
          }).then(() => {
            return findCartList()
          }).then(({ result }) => {
            ctx.commit('setCartList', result)
            resolve()
          })
        } else {
          // 本地
          // 但你修改了sku的时候其实skuId需要更改，相当于把原来的信息移出，创建一条新的商品信息。
          // 1. 获取旧的商品信息
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          // 2. 删除旧的商品
          ctx.commit('deleteCart', oldSkuId)
          // 3. 合并一条新的商品信息
          const { skuId, price: nowPrice, inventory: stock, specsText: attrsText } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, stock, attrsText }
          // 4. 去插入即可
          ctx.commit('insertCart', newGoods)
          resolve()
        }
      })
    },
    // 合并本地购物车
    async mergeLocalCart (store) {
      // 存储token后调用合并API接口函数进行购物合并
      const cartList = store.getters.validList.map(({ skuId, selected, count }) => {
        return { skuId, selected, count }
      })
      await mergeLocalCart(cartList)
      // 合并成功将本地购物车删除
      store.commit('setCartList', [])
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
