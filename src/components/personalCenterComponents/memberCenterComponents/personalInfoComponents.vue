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
                <avatarUpload>
                    大小不超过3M
                </avatarUpload>
            </a-form-model-item>
            <a-form-model-item label="用户名" prop="username">
                <a-input v-model="personalInfoform.username" />
            </a-form-model-item>
            <a-form-model-item label="性别" prop="gender">
                <a-radio-group v-model="personalInfoform.gender">
                    <a-radio value="female">
                    女
                    </a-radio>
                    <a-radio value="male">
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
                    :clickHandler="()=>onSubmit()"
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
import nextButton from '../../forgetPassComponents/nextButtonComponents.vue';
import avatarUpload from './avatarUploadComponents.vue'
export default {
    name:'personalInfo',
    data() {
        return {
            form: this.$form.createForm(this, {name: "personal_info_form "}),
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            personalInfoform: {
                imgUrl:'',
                username: '',
                gender: '',
                email:'',
                phoneNumber:''
            },
            personalInfoRules:{

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
        }
    },


}
</script>

<style>
.personal-info-form{
    width: 70%;
    /* background-color: antiquewhite; */
}

</style>