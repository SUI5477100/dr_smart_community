<template>
    <div class="my-information-container">
        <titleBar>
            个人资料
        </titleBar>
        <div class="my-information-form-container">
            <personalInfo></personalInfo>
        </div>
    </div>
</template>

<script>
import personalInfo from './memberCenterComponents/personalInfoComponents.vue';
import titleBar from './memberCenterComponents/titleBar.vue';
export default {
    name: 'MyInformation', //导出组件名
    data(){
        return{}
    },
    components:{
        personalInfo,
        titleBar
    }
};
</script>

<style scoped>
.my-information-form-container{
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* background-color: brown; */
    padding-top: 25px;
    margin: 0 auto;
}
</style>