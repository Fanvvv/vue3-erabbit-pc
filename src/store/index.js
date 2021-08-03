import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'

// 创建 vuex 仓库并导出
export default createStore({
  modules: {
    user,
    cart,
    category
  },
  plugins: [
    // 使用持久化插件，对 user cart 的数据进行持久化
    createPersistedstate({
      key: 'erabbit-pc-store',
      paths: ['user', 'cart']
    })
  ]
})
