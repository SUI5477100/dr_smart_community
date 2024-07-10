<template>
    <div class="change-pass-page-container">
        <titleBar>
            密码修改
        </titleBar>
        <div class="change-pass-container">
            <reset-pass ref="resetPassComponent"></reset-pass>
            <div class="button-container">
                <nextButton :clickHandler="updatePass" type="primary">
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
import api from '../../api/index'
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
            if (this.$refs.resetPassComponent) {
            this.$refs.resetPassComponent.resetForm();
            } else {
            console.error('checkID component is not available.');
            }
        },
        updatePass(){
            let resetPassComponent = this.$refs['resetPassComponent']
            let resetPassForm = resetPassComponent.resetPassForm
            resetPassComponent.$refs['resetPassForm'].validate((valid) => {
                if(valid){
                    let updatePassForm = {
                        password: resetPassForm.newPassword,
                        password2: resetPassForm.repeatPass
                    }
                    this.updatePassword(updatePassForm)
                }
            })
        },
        async updatePassword(updatePassForm){
            let res = await api.password.updatePassword(updatePassForm);
            console.log('this is updatePassword Function,res:',res)
            if(res.code == 200){
                this.$message.success(res.msg)
            }else if(res.code == 500){
                this.$message.error(res.msg)
            }
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