<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{ profile.account }}</a></li>
          <li><a href="javascript:;">退出登录</a></li>
        </template>
        <template v-else>
          <li><router-link to="/login">请先登录</router-link></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li><a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'AppTopnav',
  setup () {
    const store = useStore()
    const profile = computed(() => {
      return store.state.user.profile
    })
    return { profile }
  }
}
</script>

<style scoped lang="less">
.app-topnav {
  background-color: #333;
  ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 53px;
    li {
      a {
        display: inline-block;
        line-height: 1;
        padding: 0 15px;
        color: #cdcdcd;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      // ~ 选择器表示当前选择器后的所有元素
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
