<template>
  <div class="container">
    <xtx-member-aside></xtx-member-aside>
    <article class="article">
      <router-view></router-view>
    </article>
  </div>
</template>

<script>
export default {
  name: 'MemberLayout'
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  padding-top: 20px;
  .article {
    width: 1000px;
  }
}
</style>
