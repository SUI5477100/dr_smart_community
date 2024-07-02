<template>
    <div class="navigation-container">
      <div class="menu-wrapper">
        <a-menu v-model="current" mode="horizontal" class="custom-menu">
          <a-menu-item key="home">
            <router-link to="/">Home</router-link>
          </a-menu-item>
          <a-menu-item key="login">
            <router-link to="/login">Login</router-link>
          </a-menu-item>
          <a-menu-item key="forgotPassword">
            <router-link to="/forgotPassword">Forgot Password</router-link>
          </a-menu-item>
          <a-menu-item key="registered">
            <router-link to="/registered">Registered</router-link>
          </a-menu-item>
        </a-menu>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NavigationBar',
    data() {
      return {
        current: 'home'
      }
    }
  }
  </script>
  
  <style scoped>
  .navigation-container {
    width: 100%;
    display: flex;
    justify-content: center; /* 使内盒子居中 */
    background-color: #1e90ff; /* 设置背景颜色 */
  }
  
  .menu-wrapper {
    width: 75%; /* 设置内盒子的宽度 */
  }
  
  .ant-menu-horizontal {
    background-color: #1e90ff;
    height: 48px;
    border-bottom: none !important;
  }
  
  .custom-menu .ant-menu-item {
    background-color: #1e90ff !important;
    border: none !important;
    transition: width 1s ease, background-color 1s ease; /* 添加过渡效果 */
  }
  
  .custom-menu .ant-menu-item a {
    color: white !important;
  }
  
  .custom-menu .ant-menu-item:hover {
    background-color: #4169e1 !important;
  }
  
  .custom-menu .ant-menu-item:hover a {
    color: white !important;
  }
  
  .custom-menu .ant-menu-item-selected {
    background-color: #4169e1 !important;
    width: 240px !important; /* 设置选中时的宽度 */
  }
  
  .custom-menu .ant-menu-item-selected a {
    color: white !important;
  }
  </style>
  