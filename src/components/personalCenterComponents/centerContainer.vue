<template>
    <!-- 个人中心 -->
    <div class="container">
        <!-- 左侧菜单栏 -->
            <LeftMenu></LeftMenu>

        <!-- 右侧内容 -->
      <div class="router-view">
        <router-view ></router-view>

      </div>
    </div>
</template>

<script>
import LeftMenu from './leftMenu.vue'
export default {
    name: 'CenterContainer', 
    components: {
        LeftMenu
    }
};
</script>

<style scoped lang="less">
.container{
    width: 75%;
    display: flex;
    background-color: #f1f1f1;

}
.router-view{
    margin-left: 40px;
    width: 100%;
    background-color: #fff;
}
</style>