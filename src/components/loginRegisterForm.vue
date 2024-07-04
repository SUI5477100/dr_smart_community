<template>
  <div class="formContainer">
    <a-form layout="vertical" :wrapper-col ="{span:30}" :form="form" @submit="handleSubmit" class="form">
        <p v-if="isLogin == true" class="formName">用户登录</p>
        <p v-else class="formName">用户注册</p>
        <a-form-item
        :validate-status="userNameError() ? 'error' : ''"
        :help="userNameError() || ''"
        style="margin-bottom: 10px;">
          <a-input
              v-decorator="[
              'userName',
              {
                  rules: [
                  { required: true, message: '请输入手机号' },
                  ],
              },]"
              placeholder="手机号">
              <a-icon
              slot="prefix"
              type="user" 
              style="color: rgba(0, 0, 0, 0.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item
        :validate-status="passwordError() ? 'error' : ''"
        :help="passwordError() || ''"
        style="margin-bottom: 8px;">
          <a-input
              v-decorator="[
              'password',
              {
                rules: [
                { required: true, message: '请输入密码' },
                { min: 5, message: '长度不少于5个字符'},
                // { validator: }
                ],
                trigger:'blur'
              },
              ]"
              type="password"
              placeholder="密码">
              <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"/>
          </a-input>
        </a-form-item>
        <!-- 注册 -->
        <a-form-item
        :validate-status="checkPassError() ? 'error' : ''"
        :help="checkPassError() || ''"
        v-if="isLogin == false"
        style="margin-bottom: 8px;">
          <a-input
              v-decorator="[
              'checkPass',
              {
                rules: [
                { required: true, message: '请确认密码' },
                ],
                trigger:'blur'
              },
              ]"
              type="password"
              placeholder="确认密码">
              <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"/>
          </a-input>
        </a-form-item>
        <a-row v-if="isLogin == false" :gutter="[8,0]">
            <a-col :span="15" >
              <a-form-item
              :validate-status="checkCodeError() ? 'error' : ''"
              :help="checkCodeError() || ''">
                <a-input
                    v-decorator="[
                    'checkCode',
                    {
                      rules: [
                      { required: true, message: '请输入验证码' },
                      ],
                      trigger:'blur'
                    },
                    ]"
                    type="text"
                    placeholder="验证码">
                  <a-icon
                  slot="prefix"
                  type="number"
                  style="color: rgba(0, 0, 0, 0.25)"/>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-button
                html-type="submit"
                :disabled="hasErrors(form.getFieldsError())"
                class="codeButton">
                <span>发送验证码</span>
                </a-button>
            </a-col>
        </a-row>
        <a-form-item>
          <a-button
              type="primary"
              html-type="submit"
              :disabled="hasErrors(form.getFieldsError())"
              class="submitButton">
            <span v-if="isLogin == true" class="buttonText">登录</span>
            <span v-else class="buttonText">注册</span>
          </a-button>
        </a-form-item>
        <p v-if="isLogin == true" style="text-align: right;"><a href="#" @click="changeForm">注册</a>&nbsp;|&nbsp;<a href="#" @click="toForgetPass">忘记密码？</a></p>
        <p v-else style="text-align: right;"><a href="#" @click="changeForm">已有账号？去登陆</a></p>
    </a-form>
  </div>
</template>
<script>
import router from '@/router';
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}
export default {
  name:"loginRegisterForm",
  data() {
    return {
        isLogin:false,
        hasErrors,
        form: this.$form.createForm(this, { name: "horizontal_form" }),
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("userName") && getFieldError("userName");
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    checkPassError(){
      const {getFieldError, isFieldTouched} = this.form;
      return isFieldTouched("checkPass") && getFieldError("checkPass");
    },
    checkCodeError(){
      const {getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("checkCode") && getFieldError("checkCode")
    },
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
      router.push('/forgetPass')
    }
  },
};
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
.codeButton {
  background-color: #ecf5ff;
  border: 1px solid #6495ed;
  color: #6495ed;
}
</style>