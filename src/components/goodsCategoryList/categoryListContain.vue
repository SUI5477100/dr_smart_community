<template>
    <!-- 个人中心 -->
    <div class="container">
        <!-- 左侧菜单栏 -->
        <LeftCategoryList></LeftCategoryList>
        <!-- 右侧内容 -->
        <div class="router-view">
            <router-view></router-view>

        </div>
    </div>
</template>

<script>
import LeftCategoryList from './leftCategoryList.vue'
export default {
    name: 'CategoryListContain', //导出组件名
    components: {
        LeftCategoryList
    }
};
</script>
<style scoped lang="less">
.container {
    width: 75%;
    display: flex;
    background-color: #f1f1f1;

}

.router-view {
    margin-left: 40px;
    width: 100%;
    background-color: #fff;
}
</style>