<template>
<div class="xtx-city" ref="target">
  <div class="select" :class="{ active }" @click="toggleDialog">
    <span class="placeholder" v-if="!fullLocation">{{ placeholder }}</span>
    <span class="value" v-else>{{ fullLocation }}</span>
    <i class="iconfont icon-angle-down"></i>
  </div>
  <div class="option" v-if="active">
    <div class="loading" v-if="loading"></div>
    <template v-else>
      <span v-for="item in currList" :key="item.code" @click="changeItem(item)" class="ellipsis">{{ item.name }}</span>
    </template>
  </div>
</div>
</template>

<script>
import { computed, ref, reactive } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'

export default {
  name: 'XtxCity',
  props: {
    placeholder: {
      type: String,
      default: '请选择配送地址'
    },
    fullLocation: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const target = ref(null)
    // 显示隐藏
    const active = ref(false)
    // 加载数据
    const loading = ref(false)
    // 显示的数据
    const cityData = ref([])
    // 显示隐藏函数
    const openDialog = () => {
      active.value = true
      loading.value = true
      getCityData().then(data => {
        cityData.value = data
        loading.value = false
      })
      // 清空选择结果
      for (const key in changeResult) {
        changeResult[key] = ''
      }
    }
    const closeDialog = () => {
      active.value = false
    }
    const toggleDialog = () => {
      active.value ? closeDialog() : openDialog()
    }
    // 如果点击其他地方，关闭弹层
    onClickOutside(target, () => {
      closeDialog()
    })
    // 显示点击后的数据
    const currList = computed(() => {
      // 默认
      let list = cityData.value
      // console.log(list)
      // 市一级
      if (changeResult.provinceCode && changeResult.provinceName) {
        list = list.find(p => p.code === changeResult.provinceCode).areaList
      }
      // 县地区一级
      if (changeResult.cityCode && changeResult.cityName) {
        list = list.find(p => p.code === changeResult.cityCode).areaList
      }
      return list
    })
    // 定义选择的省市区数据
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })
    const changeItem = item => {
      // 省份
      if (item.level === 0) {
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      // 市
      if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      // 地区
      if (item.level === 2) {
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
        closeDialog()
        emit('change', changeResult)
      }
    }
    return { target, toggleDialog, active, loading, currList, changeItem }
  }
}
// 获取城市地区数据函数
const getCityData = () => {
  return new Promise((resolve, reject) => {
    if (window.cityData) {
      // 假如有缓存
      resolve(window.cityData)
    } else {
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(res => {
        window.cityData = res.data
        resolve(window.cityData)
      })
    }
  })
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
