<template>
    <div class="pay-pass-container">
        <a-modal v-model="visible" title="设置支付密码" ok-text="确认" cancel-text="取消" @ok="payPassFormSubmit">
        <setPassForm 
        style="width: 100%;"
        ref="payPass">
            <template slot="first">
                支付密码
            </template>
            <template slot="second">
                重复密码
            </template>
        </setPassForm>
        </a-modal>
    </div>

</template>

<script>
import setPassForm from '../forgetPassComponents/resetPassFormComponents.vue'
import api from '../../api/index';
export default {
    name:'payPassModal',
    data(){
        return{
            visible: false,
        }
    },
    components: {
        setPassForm
    },
    methods:{
        showModal() {
            this.visible = true;
        },
        hideModal() {
            this.visible = false;
        },
        payPassFormSubmit(){
            let payPassComp = this.$refs['payPass']
            let passForm = payPassComp.resetPassForm
            payPassComp.$refs['resetPassForm'].validate((valid) => {
                console.log('this is modal valid:',valid);
                console.log('this is passForm------------',passForm)
                if(valid){
                    let payPassForm = {
                        payPassword: passForm.newPassword,
                        payPassword2: passForm.repeatPass
                    }
                    this.setPayPassword(payPassForm)
                }else{
                    payPassComp.resetForm()
                    this.$message.error('请重新设置支付密码')
                }
            })
        },
        async setPayPassword(payPassForm){
            let res = await api.password.setPayPass(payPassForm)
            console.log('this is payPass Function, res:',res)
            if(res.code == 200){
                this.$message.success(res.msg)
                this. hideModal()
                this.$router.push('/')
            }else{
                this.$message.error(res.msg)
            }
            
        }
    }

}
</script>

<style>
.pay-pass-container{
    background-color: aqua;
    /* width: 100%; */
}

</style>