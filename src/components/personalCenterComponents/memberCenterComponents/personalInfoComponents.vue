<template>
  <div class="personal-info-form">
        <a-form-model 
            :form="form"
            :model="personalInfoform" 
            :label-col="labelCol" 
            :rules="personalInfoRules"
            :wrapper-col="wrapperCol"
            ref="personalInfoform">
            <a-form-model-item label="用户头像" prop="imgUrl">
                <avatarUpload 
                :imgUrl="personalInfoform.imgUrl"
                @fileUploadSuccess="updateImgUrl">
                    大小不超过3M
                </avatarUpload>
            </a-form-model-item>
            <a-form-model-item label="用户名" prop="username">
                <a-input v-model="personalInfoform.username" />
            </a-form-model-item>
            <a-form-model-item label="性别" prop="gender">
                <a-radio-group v-model="personalInfoform.gender">
                    <a-radio :value = 0>
                    女
                    </a-radio>
                    <a-radio :value= 1>
                    男
                    </a-radio>
                </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="邮箱" prop="email">
                <a-input v-model="personalInfoform.email" />
            </a-form-model-item>
            <a-form-model-item label="手机号" prop="phoneNumber">
                <a-input v-model="personalInfoform.phoneNumber" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                <nextButton 
                    :clickHandler="submitForm"
                    type="primary">
                        确认修改
                </nextButton>
                <nextButton 
                    :clickHandler="()=>resetForm()" 
                    style="margin-left: 6%;"
                    type="defualt">
                        重置
                </nextButton>
            </a-form-model-item>
        </a-form-model>
  </div>
</template>

<script>
import nextButton from '../../buttonComponents/nextButtonComponents.vue';
import avatarUpload from './avatarUploadComponents.vue';
import api from '../../../api/index'

export default {
    name:'personalInfo',
    data() {
        return {
            form: this.$form.createForm(this, {name: "personal_info_form "}),
            labelCol: { xs: { span: 24 }, sm: { span: 4 } },
            wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
            personalInfoform: {
                imgUrl:'',
                username: '',
                gender: -1,
                email:'',
                phoneNumber:''
            },
            personalInfoRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                email: [
                    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
                ],
                phoneNumber: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^[0-9]{11}$/, message: '请输入有效的手机号', trigger: 'blur' }
                ]
            }
        };
    },
    components:{
        avatarUpload,
        nextButton
    },
    methods: {
        onSubmit() {
            console.log('submit!', this.form);
        },
        resetForm(){
            this.$refs.personalInfoform.resetFields()
            this.getPersonInfo()
        },
        async getPersonInfo(){
            let res = await api.userInfo.getUserInfo();
            console.log('this is personal infomation Function, res:', JSON.stringify(res))
            if(res.code == 200){
                let user = res.user
                this.personalInfoform = {
                    imgUrl: user.avatarUrl,
                    username: user.nickname,
                    gender: user.gender,
                    email: user.email,
                    phoneNumber: user.phone
                }
            }
        },
        updateImgUrl(newUrl) {
            this.$set(this.personalInfoform, 'imgUrl', newUrl);
        },
        submitForm(){
            this.$refs['personalInfoform'].validate((valid) => {
                if(valid){
                    let userInfoForm = {
                        avatarUrl:this.personalInfoform.imgUrl,
                        nickname: this.personalInfoform.username,
                        gender: this.personalInfoform.gender,
                        email: this.personalInfoform.email,
                        phone: this.personalInfoform.phoneNumber
                    }
                    this.updateUserInfo(userInfoForm)
                }
            })
        },
        async updateUserInfo(userInfoForm){
            let res = await api.userInfo.updateUserInfo(userInfoForm)
            console.log('-------this is update userInfo,res:',res);
            if(res.code == 200){
                this.$message.success('修改成功')
                this.getPersonInfo()
            }else{
                this.$message.error(res.msg)
            }
        }
    },
    mounted(){
        this.getPersonInfo()
    }


}
</script>

<style>
.personal-info-form{
    width: 70%;
    /* background-color: antiquewhite; */
}

</style>