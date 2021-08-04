// 分类模块
import { topCategory } from '@/api/constant/category'
import { findAllCategory } from '@/api/category'

export default {
  namespaced: true,
  state () {
    return {
      list: topCategory.map(item => ({ name: item }))
    }
  },
  mutations: {
    setList (state, headCategory) {
      state.list = headCategory
    }
  },
  actions: {
    async getList ({ commit }) {
      const result = await findAllCategory()
      console.log(result)
      commit('setCategory', result)
    }
  }
}
