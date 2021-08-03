<template>
  <router-view/>
  <div>
    app{{$store.state.user.profile.account}}
    <button @click="$store.commit('user/setUser',{ account: 'fan'})">持久化</button>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
