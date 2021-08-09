<!-- 使用 render 函数 创建组件-->
<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',
  render () {
    // 1. 创建xtx-bread父容器
    // 2. 获取默认插槽内容
    // 3. 去除xtx-bread-item组件的i标签，因该由render函数来组织
    // 4. 遍历插槽中的item，得到一个动态创建的节点，最后一个item不加i标签
    // 5. 把动态创建的节点渲染再xtx-bread标签中
    // 获取插槽内容
    const slotsValue = this.$slots.default()
    // console.log(slotsValue)
    // 创建动态节点
    const dymanicItems = []
    // 遍历插槽内容
    slotsValue.forEach((item, index) => {
      // 对插槽节点进行判断（是XtxBreadItem和Transition才进行组装）
      if (item.type.name === 'XtxBreadItem' || item.type.name === 'Transition') {
        dymanicItems.push(item)
      }
      // 是否添加右箭头
      if (index < slotsValue.length - 1) {
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    // h() 函数参数，1.节点名称  2. 属性|数据 是对象  3. 子节点
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  }
}
</script>

<style lang="less">
// 去除 scoped 属性，目的：然样式作用到xtx-bread-item组件
.xtx-bread{
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
