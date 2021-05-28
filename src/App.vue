<template>
  <div id="app">
    <my-nav-bar></my-nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>

import MyNavBar from "@/components/MyNavBar";
export default {
  name: 'App',
  components: {MyNavBar},
}
</script>