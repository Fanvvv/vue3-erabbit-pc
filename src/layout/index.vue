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
  <app-footer></app-footer>
</template>

<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
export default {
  name: 'Layout',
  components: {
    AppTopnav,
    AppHeader,
    AppFooter
  }
}
</script>
