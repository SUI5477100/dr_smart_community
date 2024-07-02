<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/forgotPassword">ForgotPassword</router-link></li>
        <li><router-link to="/registered">registeredView</router-link></li>

      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
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
