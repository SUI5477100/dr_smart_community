<template>
  <div class="formContainer">
    <a-form-model layout="vertical" :wrapper-col="{ span: 30 }" :form="form" @submit="handleSubmit" class="form"
      :model="userForm" :rules="userFormRules" ref="userForm">
      <p v-if="isLogin == true" class="formName">用户登录</p>
      <p v-else class="formName">用户注册</p>
      <a-form-model-item style="margin-bottom: 10px;" prop="phoneNumber">
        <a-input placeholder="手机号" v-model="userForm.phoneNumber" @input="validateNumber" @keypress="isNumber">
          <a-icon type="user" slot="prefix" style="color: rgba(0, 0, 0, 0.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item style="margin-bottom: 8px;" prop="password">
        <a-input type="password" placeholder="密码" v-model="userForm.password">
          <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
        </a-input>
      </a-form-model-item>
      <!-- 注册 -->
      <a-form-model-item v-if="isLogin == false" style="margin-bottom: 8px;" prop="checkPass">
        <a-input type="password" placeholder="确认密码" v-model="userForm.checkPass">
          <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
        </a-input>
      </a-form-model-item>
      <a-row v-if="isLogin == false" :gutter="[8, 0]">
        <a-col :span="14">
          <a-form-model-item prop="checkCode">
            <a-input type="text" placeholder="验证码" v-model="userForm.checkCode">
              <a-icon slot="prefix" type="number" style="color: rgba(0, 0, 0, 0.25)" />
            </a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="7">
          <checkCodeButton class="codeButton" :handleClick="getCheckCode" ref="checkCodeButton">
          </checkCodeButton>
        </a-col>
      </a-row>
      <a-form-model-item>
        <a-button type="primary" html-type="submit" class="submitButton" @click="formSubmit">
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
    <modalComponent ref="modal"></modalComponent>
  </div>
</template>
<script>
import router from '../router/index';
import api from '../api/index'
import checkCodeButton from './buttonComponents/checkCodeButton.vue';
import modalComponent from './payPassModalComponents/modalComponent.vue';
export default {
  name: "loginRegisterForm",
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
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.userForm.password) {
        callback(new Error("密码与上次输入不一致"));
      } else {
        callback();
      }
    };
    return {
      isLogin: true,
      isButtonDisabled: false,
      buttonLabel: '发送验证码',
      countdown: 60,
      form: this.$form.createForm(this, { name: "user_form" }),
      userForm: {
        phoneNumber: '',
        password: '',
        checkPass: '',
        checkCode: ''
      },
      userFormRules: {
        phoneNumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', validtor: validatePass, trigger: 'blur' },
          { min: 6, message: '密码长度不小于6', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, trigger: 'blur', validator: validatePass2 }
        ],
        checkCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    };
  },
  components: {
    checkCodeButton,
    modalComponent
  },
  mounted() {
    this.$nextTick(() => {
      this.form.validateFields();
    });
  },
  methods: {
    // handleSubmit(e) {
    //   e.preventDefault();
    //   this.form.validateFields((err, values) => {
    //     if (!err) {
    //       console.log("Received values of form: ", values);
    //     }
    //   });
    // },
    changeForm() {
      this.isLogin = !this.isLogin;
    },
    toForgetPass() {
      router.push({ path: '/forgetPass' })
    },
    //限制电话号码只能输入数字
    isNumber(event) {
      const charCode = event.charCode;
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
      }
    },
    //限制电话号码最长位11位
    validateNumber(event) {
      let value = event.target.value;
      this.userForm.phoneNumber = value.replace(/\D/g, '');
      if (value.length > 11) {
        value = value.slice(0, 11); // 截断超过11位的输入
      }
      this.userForm.phoneNumber = value;
    },
    //接口
    //表单提交
    formSubmit() {
      this.$refs['userForm'].validate((valid) => {
        // console.log("valid:~~~~~~~~~~~" + valid)
        //登录状态
        if (this.isLogin) {
          if (valid) {
            let loginForm = {
              phone: this.userForm.phoneNumber,
              password: this.userForm.password,
              roleId: 0
            }
            this.login(loginForm)
          }
        } else {
          //注册状态
          if (valid) {
            let registerForm = {
              phone: this.userForm.phoneNumber,
              password: this.userForm.password,
              password2: this.userForm.checkPass,
              code: this.userForm.checkCode,
              operate: 0
            }
            this.register(registerForm)
          }
        }
      })
    },
    //发送验证码
    getCheckCode() {
      this.$refs['userForm'].validateField('phoneNumber', (errorMessage) => {
        console.log("this is checkcode function,valid:", errorMessage)
        if (!errorMessage) {
          let checkCodeForm = {
            phone: this.userForm.phoneNumber,
            operate: 0
          }
          this.getCode(checkCodeForm)
        } else {
          this.$message.error('验证失败!')
        }
      });
    },
    async hasPayPass() {
      let res = await api.userInfo.getUserInfo();
      if (res.code == 200) {
        // console.log('this is res.user.payPass',!!res.user.payPassword)
        return !!res.user.payPassword
      } else {
        this.$message.error(res.msg)
      }
    },
    async toSetPayPassModal() {
      let hasPayPass = await this.hasPayPass()
      if (!hasPayPass) {
        this.$message.info('请先设置支付密码')
        this.$refs['modal'].visible = true
      } else {
        this.$router.push('/productList/12').catch(err => {
          if (err.name !== 'NavigationDuplicated') {
            throw err;
          }
        });

      }
    },
    async login(loginForm) {
      let res = await api.login_reguster.login(loginForm);
      // console.log("this is login in page......... res:" + JSON.stringify(res))
      if (res.code == 200) {
        localStorage.setItem('token', res.token)
        this.toSetPayPassModal()
      } else if (res.code == 500) {
        this.userForm.password = ''
        this.$message.error(res.msg)
      }
    },
    async register(registerForm) {
      let res = await api.login_reguster.register(registerForm);
      // console.log("this is register in page...........res:",JSON.stringify(res))
      if (res.code == 200) {
        localStorage.setItem('token', '')
        this.$message.success('注册成功！前去登录')
        this.isLogin = true
      } else if (res.code == 500) {
        this.userForm.checkCode = ''
        this.$message.error(res.msg)
      }
    },
    async getCode(checkCodeForm) {
      let res = await api.login_reguster.sendCheckCode(checkCodeForm);
      console.log("this is checkcode function..........res:", JSON.stringify(res))
      if (res.code == 200) {
        this.$refs['checkCodeButton'].startCountdown()
        this.$message.success('验证码发送成功')
      } else {
        this.$message.error('验证码发送失败')
      }
    }
  }
}
</script>
<style scoped>
.formContainer {
  width: 350px;
  height: 440px;
  /* background-color: aquamarine; */
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: absolute;
  right: 10%;
  top: 260px;
  border-radius: 10px;
}

.form {
  width: 80%;
  height: 100%;
  /* background-color: blue; */
}

.formName {
  font-size: 20px;
  color: #6495ed;
  margin-top: 40px;
}

.buttonText {
  color: aliceblue;
}

.submitButton {
  width: 100%;
  background-color: #6495ed;
}

.codeButton {

  width: 150%;
  /* background-color: aqua; */
}
</style>