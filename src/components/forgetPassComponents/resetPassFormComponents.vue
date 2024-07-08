<template>
    <div class="forget-content-container">
    <a-form-model 
      layout="vertical"
      :form="form" 
      ref="resetPassForm"
      :model="resetPassForm"
      :rules="resetPassRules">
      <a-row >
        <a-col :span="5">
          <label for="newPassword">新密码</label>
        </a-col>
        <a-col :span="19">
          <a-form-model-item prop="newPassword">
            <a-input  
              placeholder="请输入新密码" 
              name="newPassword" 
              type="password"
              v-model="resetPassForm.newPassword"/>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="5">
          <label for="repeatPass">重复密码</label>
        </a-col>
        <a-col :span="19">
          <a-form-model-item prop="repeatPass">
            <a-input 
            placeholder="请再次输入密码"  
            type="password"
            v-model="resetPassForm.repeatPass"/>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
  
</template>

<script>
export default {
    name:"resetPass",
    data(){
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.resetPassForm.newPassword !== '') {
            this.$refs.resetPassForm.validateField('repeatPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.resetPassForm.newPassword) {
          callback(new Error("密码与新密码不一致"));
        } else {
          callback();
        }
      };
        return{
          form: this.$form.createForm(this, { name: "reset_pass_form" }),
          resetPassForm:{
            newPassword:'',
            repeatPass:''
          },
          resetPassRules:{
            newPassword:[
              { required:true, message: '请输入密码', trigger: "blur" },
              { min:8, message: '密码长度不小于8', trigger: "blur" },
              { validator:validatePass, trigger:"blur" }
            ],
            repeatPass:[
              { required:true, validator:validatePass2, trigger:"blur" }
            ]
          }
        }
    },
    methods:{
      resetForm(){
        this.$refs.resetPassForm.resetFields();
      }
    }

}
</script>

<style>

</style>