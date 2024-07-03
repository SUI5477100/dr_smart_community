<template>
    <div class="center">
        <CenterContainer></CenterContainer>
    </div>
</template>

<script>
import CenterContainer from '../components/personalCenterComponents/centerContainer.vue';

export default {
    name: 'PersonalCenter', //导出组件名
    components: {
        CenterContainer
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
