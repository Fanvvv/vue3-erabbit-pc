<template>
  <xtx-bread>
    <xtx-bread-item to="/">首页</xtx-bread-item>
    <xtx-bread-item v-if="category.top" :to="`/category/${category.top.id}`">{{ category.top.name }}</xtx-bread-item>
    <transition name="fade-right" mode="out-in">
      <xtx-bread-item v-if="category.sub" :key="category.sub.id">{{ category.sub.name }}</xtx-bread-item>
    </transition>
  </xtx-bread>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
  name: 'SubBread',
  setup () {
    const store = useStore()
    const route = useRoute()
    // console.log(store.state.category.list)
    // console.log(route.params.id)
    const category = computed(() => {
      const obj = {}
      store.state.category.list.map(top => {
        top.children && top.children.map(sub => {
          if (sub.id === route.params.id) {
            // 一级类目
            obj.top = { id: top.id, name: top.name }
            // 二级类目
            obj.sub = { id: sub.id, name: sub.name }
          }
        })
      })
      return obj
    })
    return { category }
  }
}
</script>

<style scoped>

</style>
