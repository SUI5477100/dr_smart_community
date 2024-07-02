<template>
  <div id="app">
    <HeaderComponents></HeaderComponents>
    <NavigationBar></NavigationBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavigationBar from '../src/components/homeComponents/navigationBar.vue'
import HeaderComponents from '../src/components/homeComponents/headerComponents.vue'
export default {
  name: 'App',
  components: {
    NavigationBar,
    HeaderComponents
  }
}
</script>

<style>
nav {
  margin-bottom: 20px;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 10px;
}
</style>
