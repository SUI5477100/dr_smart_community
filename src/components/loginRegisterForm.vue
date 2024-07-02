<template>
  <div class="formContainer">
    <a-form layout="vertical" :wrapper-col ="{span:30}" :form="form" @submit="handleSubmit" class="form">
        <p v-if="isLogin == true" class="formName">用户登录</p>
        <p v-else class="formName">用户注册</p>
        <a-form-item
        :validate-status="userNameError() ? 'error' : ''"
        :help="userNameError() || ''"
        style="margin-bottom: 10px;"
        >
        <a-input
            v-decorator="[
            'userName',
            {
                rules: [
                { required: true, message: 'Please input your username!' },
                ],
            },
            ]"
            placeholder="用户名"
        >
            <a-icon
            slot="prefix"
            type="user" 
            style="color: rgba(0, 0, 0, 0.25)"
            />
        </a-input>
        </a-form-item>
        <a-form-item
        :validate-status="passwordError() ? 'error' : ''"
        :help="passwordError() || ''"
        style="margin-bottom: 8px;"
        >
        <a-input
            v-decorator="[
            'password',
            {
                rules: [
                { required: true, message: 'Please input your Password!' },
                ],
            },
            ]"
            type="password"
            placeholder="密码"
        >
            <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
            />
        </a-input>
        </a-form-item>
        <a-form-item
        :validate-status="passwordError() ? 'error' : ''"
        :help="passwordError() || ''"
        v-if="isLogin == false"
        style="margin-bottom: 8px;"
        >
        <a-input
            v-decorator="[
            'password',
            {
                rules: [
                { required: true, message: 'Please input your Password!' },
                ],
            },
            ]"
            type="password"
            placeholder="确认密码"
        >
            <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
            />
        </a-input>
        </a-form-item>
        <a-row v-if="isLogin == false">
            <a-col :span="12">
                <a-form-item
                :validate-status="passwordError() ? 'error' : ''"
                :help="passwordError() || ''"
                >
                <a-input
                    v-decorator="[
                    'password',
                    {
                        rules: [
                        { required: true, message: 'Please input your Password!' },
                        ],
                    },
                    ]"
                    type="password"
                    placeholder="手机验证码"
                >
                    <a-icon
                    slot="prefix"
                    type="lock"
                    style="color: rgba(0, 0, 0, 0.25)"
                    />
                </a-input>
            </a-form-item>
            </a-col>
            <a-col :span="10">
                <a-button
                type="primary"
                html-type="submit"
                :disabled="hasErrors(form.getFieldsError())"
                style="width: 100%;background-color: #6495ed;"
                >
                </a-button>
            </a-col>
        </a-row>
        <a-form-item>
        <a-button
            type="primary"
            html-type="submit"
            :disabled="hasErrors(form.getFieldsError())"
            style="width: 100%;background-color: #6495ed;"
            class="submitButton"
        >
        <span v-if="isLogin == true" class="buttonText">登录</span>
        <span v-else class="buttonText">注册</span>
        </a-button>
        </a-form-item>
        <p style="text-align: right;"><a href="#" @click="changeForm">注册</a>&nbsp;|&nbsp;<a href="#">忘记密码？</a></p>
    </a-form>
  </div>
</template>
<script>
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}
export default {
    name:"loginRegisterForm",
  data() {
    return {
        isLogin:true,
        hasErrors,
        form: this.$form.createForm(this, { name: "horizontal_login" }),
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
    }
  },
};
</script>
<style scoped>
.formContainer{
    width: 350px;
    height: 420px;
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
.ant-btn  {
    line-height: 2px; 
}
</style>