<template>
  <div id="app">
    <HeaderComponents v-if="!$route.meta.noHeader"></HeaderComponents>
    <NavigationBar v-if="!$route.meta.noHeader"></NavigationBar>
    <div class="routerContainer">
      <router-view></router-view>
    </div>
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
html, body, #app {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
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
.routerContainer{
  width: 100%;
  height: 75%;
}
</style>
