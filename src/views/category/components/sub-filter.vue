<template>
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          href="javascript:;"
          v-for="item in filterData.brands" :key="item.id"
          :class="{ active: filterData.selectedBrand === item.id }"
          @click="changeBrand(item.id)">{{ item.name }}</a>
      </div>
    </div>
    <div class="item" v-for="p in filterData.saleProperties" :key="p.id">
      <div class="head">{{ p.name }}：</div>
      <div class="body">
        <a
          href="javascript:;"
          v-for="item in p.properties" :key="item.id"
          :class="{ active: p.selectedProp === item.id }"
          @click="changeProp(p, item.id)">{{ item.name }}</a>
      </div>
    </div>
  </div>
  <div class="sub-filter" v-else>
    <xtx-skeleton class="item" width="800px" height="40px" animated></xtx-skeleton>
    <xtx-skeleton class="item" width="800px" height="40px" animated></xtx-skeleton>
    <xtx-skeleton class="item" width="800px" height="40px" animated></xtx-skeleton>
    <xtx-skeleton class="item" width="800px" height="40px" animated></xtx-skeleton>
    <xtx-skeleton class="item" width="800px" height="40px" animated></xtx-skeleton>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/category'

export default {
  name: 'SubFilter',
  setup (props, { emit }) {
    // 1. 获取数据
    // 2. 数据中需要全部选中，需要预览将来点击激活功能。默认选中全部
    // 3. 完成渲染
    const route = useRoute()
    const filterData = ref(null)
    const filterLoading = ref(false)
    // 4. 分类发生变化的时候需要重新获取筛选数据，需要使用侦听器
    watch(() => route.params.id, (newValue, oldValue) => {
      if (newValue && route.path === `/category/sub/${newValue}`) {
        filterLoading.value = true
        findSubCategoryFilter(route.params.id).then(({ result }) => {
          // console.log(result)
          // 选中的值
          result.selectedBrand = null
          // 在品牌数据中加入一个数据
          result.brands.unshift({ id: null, name: '全部' })
          // 销售数据
          result.saleProperties.map(p => {
            // 选中的值
            p.selectedProp = null
            p.properties.unshift({ id: null, name: '全部' })
          })
          filterData.value = result
          filterLoading.value = false
        })
      }
    }, { immediate: true })
    // 获取筛选参数的函数
    const getFilterParams = () => {
      const obj = {
        brandId: null,
        attrs: []
      }
      filterData.value.saleProperties.map(item => {
        if (item.selectedProp) {
          const attrs = item.properties.find(attrs => {
            return attrs.id === item.selectedProp
          })
          obj.attrs.push({ groupName: item.name, propertyName: attrs.name })
        }
      })
      if (obj.attrs.length === 0) {
        obj.attrs = null
      }
      return obj
    }
    // 1. 记录当前选择的品牌
    const changeBrand = (brandId) => {
      if (filterData.value.selectedBrand === brandId) return
      filterData.value.selectedBrand = brandId
      emit('filter-change', getFilterParams())
    }
    // 2. 记录呢选择的销售属性
    const changeProp = (item, propId) => {
      if (item.selectedProp === propId) return
      item.selectedProp = propId
      emit('filter-change', getFilterParams())
    }
    return { filterData, filterLoading, changeBrand, changeProp }
  }
}
</script>

<style scoped lang="less">
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all .3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
.xtx-skeleton {
  padding: 10px 0;
}
</style>
