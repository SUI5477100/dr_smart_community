<template>
  <div id="app">
    <!-- <Login/> -->
    <HomeView></HomeView>
  </div>
</template>

<script>
// import Login from './components/loginBtuuon.vue'
import HomeView  from './pages/hemoView.vue';


export default {
  name: 'App',
  components: {
    // Login,
    HomeView
  }
}
</script>

<style>

</style>
