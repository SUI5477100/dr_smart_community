<template>
    <div class="topbar">
      <div class="bar-content">
        <!-- 左侧内容 -->
        <div class="left-content">
          <a v-for="(link, index) in leftLinks" :key="index" :href="link.href" :class="link.class">
            <template v-if="link.icon">
              <a-icon :type="link.icon" />
            </template>
            {{ link.text }}
          </a>
        </div>
        <!-- 右侧内容 -->
        <div class="right-content">
          <a v-for="(link, index) in rightLinks" :key="index" :href="link.href">
            {{ link.text }}
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeTopBar',
    data() {
      return {
        leftLinks: [
          { text: '商城首页', href: '' },
          { text: '联系方式', href: '' },
          { text: '关于我们', href: '' },
          { text: '北京', href: '', class: 'region', icon: 'environment' },
        ],
        rightLinks: [
          { text: '欢迎您', href: '' },
          { text: '个人中心', href: '/personalCenter' },
          { text: '登录', href: '/login' },
        ],
      };
    },
  };
  </script>
  
  <style scoped lang="less">
  .topbar {
    background-color: #eceff2;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  
    .bar-content {
      width: 75%;
      display: flex;
      justify-content: space-between;
  
      .region {
        color: red;
      }
  
      a {
        position: relative;
        padding: 0 10px;
        text-decoration: none;
        color: inherit;
        &:hover {
          color: #1e90ff;
        }
      }
  
      a:not(:last-child)::after {
        content: '|';
        position: absolute;
        right: -2px; /* 调整竖线的位置 */
        color: #606469; /* 可以根据需要调整竖线的颜色 */
      }
    }
  }
  </style>
  