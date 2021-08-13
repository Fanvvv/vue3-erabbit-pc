<template>
  <div class="goods-sku">
    <dl v-for="specs in goods.specs" :key="specs.id">
      <dt>{{ specs.name }}</dt>
      <dd>
        <template v-for="item in specs.values" :key="item.name">
          <img
            v-if="item.picture"
            :class="{selected: item.selected}"
            :src="item.picture"
            :title="item.name"
            @click="clickSpecs(specs, item)"
            alt="">
          <span v-else :class="{selected: item.selected}" @click="clickSpecs(specs, item)">{{ item.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<script>
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
    // console.log(props.goods)
    const clickSpecs = (specs, item) => {
      if (item.selected) {
        item.selected = false
      } else {
        specs.values.map(p => {
          p.selected = false
        })
        item.selected = true
      }
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
