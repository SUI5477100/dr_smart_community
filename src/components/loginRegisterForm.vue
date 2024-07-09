<template>
  <div class="formContainer">
    <a-form-model 
      layout="vertical" 
      :wrapper-col ="{span:30}" 
      :form="form" 
      @submit="handleSubmit" 
      class="form"
      :model="userForm"
      :rules="userFormRules">
        <p v-if="isLogin == true" class="formName">用户登录</p>
        <p v-else class="formName">用户注册</p>
        <a-form-model-item 
          style="margin-bottom: 10px;"  
          prop="phoneNumber">
          <a-input placeholder="手机号" v-model="userForm.phoneNumber">
              <a-icon
              slot="prefix"
              type="user" 
              style="color: rgba(0, 0, 0, 0.25)"/>
          </a-input>
        </a-form-model-item>
        <a-form-model-item  
          style="margin-bottom: 8px;" 
          prop="password">
          <a-input
            type="password"
            placeholder="密码"
            v-model="userForm.password">
            <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"/>
          </a-input>
        </a-form-model-item>
        <!-- 注册 -->
        <a-form-model-item 
          v-if="isLogin == false"  
          style="margin-bottom: 8px;" 
          prop="checkPass">
          <a-input
            type="password"
            placeholder="确认密码"
            v-model="userForm.checkPass">
            <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"/>
          </a-input>
        </a-form-model-item>
        <a-row v-if="isLogin == false" :gutter="[8,0]">
            <a-col :span="15" >
              <a-form-model-item prop="checkCode">
                <a-input
                    type="text"
                    placeholder="验证码"
                    v-model="userForm.checkCode">
                  <a-icon
                  slot="prefix"
                  type="number"
                  style="color: rgba(0, 0, 0, 0.25)"/>
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="6">
                <a-button
                html-type="submit"
                class="codeButton">
                <span>发送验证码</span>
                </a-button>
            </a-col>
        </a-row>
        <a-form-model-item>
          <a-button
              type="primary"
              html-type="submit"
              class="submitButton"
              @click="testApi">
            <span v-if="isLogin == true" class="buttonText">登录</span>
            <span v-else class="buttonText">注册</span>
          </a-button>
        </a-form-model-item>
        <p v-if="isLogin == true" style="text-align: right;">
          <a href="#" @click="changeForm">注册</a>
          &nbsp;|&nbsp;
          <router-link :to="{ name: 'ForgetPass' }">
            <a href="#">忘记密码？</a>
          </router-link>
        </p>
        <p v-else style="text-align: right;">
          <a href="#" @click="changeForm">已有账号？去登陆</a>
        </p>
    </a-form-model>
  </div>
</template>
<script>
import router from '../router/index';

export default {
  name:"loginRegisterForm",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.userForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if ( value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.userForm.password) {
        callback(new Error("密码与上次输入不一致"));
      } else {
        callback();
      }
    };
    return {
        isLogin:false,
        form: this.$form.createForm(this, { name: "user_form" }),
        userForm:{
          phoneNumber:'',
          password:'',
          checkPass:'',
          checkCode:''
        },
        userFormRules:{
          phoneNumber:[
            { required: true, message: '请输入手机号', trigger:'blur' },
            { min: 11, message: '请输入正确的手机号', trigger:'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', validtor: validatePass, trigger:'blur' },
            { min:8, message:'密码长度不小于8', trigger: 'blur' }
          ],
          checkPass:[
            { required: true, trigger:'blur', validator: validatePass2 }
          ],
          checkCode:[
            { required: true, message: '请输入验证码', trigger:'blur' }
          ]
        }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.form.validateFields();
    });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    changeForm(){
        this.isLogin = !this.isLogin;
    },
    toForgetPass(){
      router.push( {path: '/forgetPass'} )
    },
}
}
</script>
<style scoped>
.formContainer{
    width: 350px;
    height: 440px;
    /* background-color: aquamarine; */
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: absolute;
    right: 40px;
    top:260px;
    border-radius: 10px;
}
.form {
    width: 80%;
    height: 100%;
    /* background-color: blue; */
}

.formName{
    font-size: 20px;
    color: #6495ed;
    margin-top: 40px;
}
.buttonText{
    color: aliceblue;
}
.submitButton{
  width: 100%;
  background-color: #6495ed;
}
/* .codeButton :disabled{
  background-color: #ecf5ff;
  border: 1px solid #6495ed;
  color: #6495ed;
} */
</style>