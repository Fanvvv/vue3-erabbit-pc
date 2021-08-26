<template>
  <div class="xtx-dialog" :class="{ fade: isFade }" v-show="isShow">
    <div class="wrapper" :class="{ fade: isFade }">
      <div class="header">
        <h3>{{ title }}</h3>
        <a href="JavaScript:;" class="iconfont icon-close-new" @click="closeDialog()"></a>
      </div>
      <div class="body">
        <slot></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'
export default {
  name: 'XtxDialog',
  props: {
    title: {
      type: String,
      default: '对话框'
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    // 双向绑定，值发生改变自动通知父组件
    const isShow = useVModel(props, 'modelValue', emit)
    // 用于动画效果的值
    const isFade = ref(false)
    // 监听 isShow 值的变化，产生动画效果
    watch(isShow, (val) => {
      // 让类名经历从无 fade 到有 fade 的变化，有变化才会产生过渡效果
      setTimeout(() => {
        isFade.value = val
      }, 20)
    })
    // 关闭按钮
    const closeBtn = () => {
      // useVModel 自动通知父组件，实现双向绑定
      isShow.value = false
    }
    // 自己关闭对话框，修改父组件数据状态
    const closeDialog = () => {
      emit('update:modelValue', false)
    }
    return { isFade, closeBtn, isShow, closeDialog }
  }
}
</script>

<style scoped lang="less">
.xtx-dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8887;
  background: rgba(0,0,0,0);
  &.fade {
    transition: all 0.4s;
    background: rgba(0,0,0,.5);
  }
  .wrapper {
    width: 600px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-60%);
    opacity: 0;
    &.fade {
      transition: all 0.4s;
      transform: translate(-50%,-50%);
      opacity: 1;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: center;
      padding: 10px 0 30px 0;
    }
    .header {
      position: relative;
      height: 70px;
      line-height: 70px;
      padding: 0 20px;
      border-bottom: 1px solid #f5f5f5;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 25px;
        top: 25px;
        font-size: 24px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
