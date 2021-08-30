<template>
  <div class="member-order">
    <xtx-tabs v-model="activeName" @click-tab="clickTab">
      <xtx-tabs-panel
        v-for="item in orderStatus"
        :key="item.id"
        :name="item.name"
        :label="item.label"
      >
        {{ item.label }}
      </xtx-tabs-panel>
    </xtx-tabs>
  </div>
</template>

<script>
import { ref } from 'vue'
import { orderStatus } from '@/api/constant/constant'

export default {
  name: 'MemberOrder',
  setup () {
    const activeName = ref('all')
    const clickTab = (name) => {
      console.log(name)
    }
    return { activeName, clickTab, orderStatus }
  }
}
</script>

<style scoped>

</style>
