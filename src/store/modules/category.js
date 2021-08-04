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
    },
    // 修改一级分类的 open 属性为 true
    show (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = true
    },
    // 修改一级分类的 open 属性为 false
    hide (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }
  },
  actions: {
    async getList ({ commit }) {
      const { result } = await findAllCategory()
      // console.log(result)
      // 给一级分类添加一个 open 属性，用来控制二级分类的显示隐藏
      result.forEach(item => { item.open = false })
      commit('setList', result)
    }
  }
}
