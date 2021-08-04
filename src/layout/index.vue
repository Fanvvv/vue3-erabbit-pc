<template>
<!-- 导航栏 -->
  <app-topnav></app-topnav>
<!-- 头部 -->
  <header>header</header>
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
export default {
  name: 'Layout',
  components: {
    AppTopnav
  }
}
</script>
