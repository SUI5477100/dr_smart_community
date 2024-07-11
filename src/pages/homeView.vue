<template>
    <div class="center">
        <CategoryListContain></CategoryListContain>
    </div>
</template>

<script>
import CategoryListContain from '../components/goodsCategoryList/categoryListContain.vue'

export default {
    name: 'HomeView', //导出组件名
    components: {
        CategoryListContain
    }
};
</script>

<style scoped lang="less">
.center {
    display: flex;
    padding-top: 40px;
    padding-bottom: 30px;
    justify-content: center;
    background-color: #f1f1f1;
}
</style>
