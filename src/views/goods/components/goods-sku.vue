<template>
  <div class="goods-sku">
    <dl v-for="specs in goods.specs" :key="specs.id">
      <dt>{{ specs.name }}</dt>
      <dd>
        <template v-for="item in specs.values" :key="item.name">
          <img
            v-if="item.picture"
            :class="{selected: item.selected, disabled: item.disabled}"
            :src="item.picture"
            :title="item.name"
            @click="clickSpecs(specs, item)"
            alt="">
          <span v-else :class="{selected: item.selected, disabled: item.disabled}" @click="clickSpecs(specs, item)">{{ item.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<script>
import bwPowerSet from '@/vendor/power-set'

const spliter = '&'
// 根据skus数据得到路径字典对象
const getPathSet = (skus) => {
  const pathSet = {}
  skus.forEach(sku => {
    // 过滤出有库存有效的sku
    if (sku.inventory > 0) {
      // 得到 sku 属性值数组
      const specs = sku.specs.map(specs => specs.valueName)
      // 得到 sku 属性值数组的子集
      const powerSet = bwPowerSet(specs)
      // console.log(powerSet)
      // 设置给路径字典对象
      powerSet.forEach(set => {
        const key = set.join(spliter)
        if (pathSet[key]) {
          // 有 key 往数组里追加
          pathSet[key].push(sku.id)
        } else {
          // 没有的话设置一个数组
          pathSet[key] = [sku.id]
        }
      })
    }
  })
  return pathSet
}
// 得到当前选中的集合
const getSelectedArr = specs => {
  const selectedArr = []
  // console.log(specs)
  specs.forEach(spec => {
    const selectedVal = spec.values.find(val => val.selected)
    selectedArr.push(selectedVal ? selectedVal.name : undefined)
  })
  return selectedArr
}
// 更新按钮的禁用状态
const updateDisableStatus = (specs, pathSet) => {
  specs.forEach((spec, i) => {
    const selectedArr = getSelectedArr(specs)
    spec.values.forEach(val => {
      // 已经选中的按钮不用判断
      if (val.name === selectedArr[i]) {
        return false
      }
      // 未选中的替换对应的值
      selectedArr[i] = val.name
      // 过滤掉 undefined 然后拼接得到 key
      const key = selectedArr.filter(v => v).join(spliter)
      console.log(!pathSet[key])
      // 设置禁用状态
      val.disabled = !pathSet[key]
    })
  })
}
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({
        specs: [],
        skus: []
      })
    }
  },
  setup (props) {
    // 获取路径字典
    const pathSet = getPathSet(props.goods.skus)
    console.log(pathSet)
    // console.log(props.goods)
    // 初始化时更新禁用按钮
    updateDisableStatus(props.goods.specs, pathSet)
    const clickSpecs = (specs, item) => {
      if (item.disabled) return false
      if (item.selected) {
        item.selected = false
      } else {
        specs.values.map(p => {
          p.selected = false
        })
        item.selected = true
      }
      // 选择后更新禁用按钮
      updateDisableStatus(props.goods.specs, pathSet)
    }
    return { clickSpecs }
  }
}
</script>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin: 2px 0;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
