<template>
<div class="xtx-bread-item">
  <router-link v-if="to" :to="to"><slot></slot></router-link>
  <span v-else><slot></slot></span>
</div>
</template>

<script>
export default {
  name: 'XtxBreadItem',
  props: {
    to: {
      type: [String, Object],
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
