<template>
<!-- 导航栏 -->
  <app-topnav></app-topnav>
<!-- 头部 -->
  <app-header></app-header>
<!-- 内容区域 -->
  <main>
<!-- 二级路由 -->
    <router-view/>
  </main>
<!-- 尾部 -->
  <footer>footer</footer>
</template>

<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
export default {
  name: 'Layout',
  components: {
    AppTopnav,
    AppHeader
  }
}
</script>
