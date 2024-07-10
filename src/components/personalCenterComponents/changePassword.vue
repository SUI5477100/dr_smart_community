<template>
    <div class="change-pass-page-container">
        <titleBar>
            密码修改
        </titleBar>
        <div class="change-pass-container">
            <reset-pass ref="resetPassForm"></reset-pass>
            <div class="button-container">
                <nextButton :clickHandler="resetPass" type="primary">
                    修改密码
                </nextButton>
                <nextButton :clickHandler="() => resetCompForm()">
                    重置
                </nextButton>
            </div>
        </div>
    </div>
</template>

<script>
import nextButton from '../buttonComponents/nextButtonComponents.vue';
import resetPass from '../forgetPassComponents/resetPassFormComponents.vue';
import titleBar from './memberCenterComponents/titleBar.vue';
export default {
    name: 'ChangePassword', //导出组件名,
    data(){
        return{}
    },
    components:{
        resetPass,
        nextButton,
        titleBar
    },
    methods:{
        resetCompForm() {
            if (this.$refs.resetPassForm) {
            this.$refs.resetPassForm.resetForm();
            } else {
            console.error('checkID component is not available.');
            }
        },
        resetPass(){
        }
    }
};
</script>

<style scoped>
.change-pass-container{
    /* background-color: aqua; */
    /* width: 50%; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 5%;
}
.button-container{
    /* background-color: antiquewhite; */
    width: 36%;
    display: flex;
    justify-content: space-between;
    margin-left: 10%;
}
</style>