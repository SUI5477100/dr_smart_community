<template>
  <div class="forget-content-container">
    <a-form-model 
      layout="vertical"
      :form="form"
      ref="checkIdForm" 
      :model="checkIdForm"
      :rules="checkIdRules">
      <a-row >
        <a-col :span="5">
          <label for="phoneNumber">手机号码</label>
        </a-col>
        <a-col :span="19">
          <a-form-model-item prop="phoneNumber" >
            <a-input 
              placeholder="请输入手机号码" 
              v-model="checkIdForm.phoneNumber"
              @input="validateNumber"
              @keypress="isNumber"/>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="5">
          <label for="checkCode">验证码</label>
        </a-col>
        <a-col :span="13">
          <a-form-model-item prop="checkCode">
            <a-input 
              placeholder="请输入验证码" 
              v-model="checkIdForm.checkCode"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="2" :offset="1">
          <checkCodeButton
          :handleClick="getCheckCode"
          ref="checkCodeButton">
          </checkCodeButton>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import checkCodeButton from '../buttonComponents/checkCodeButton.vue';
import api from '../../api/index'
export default {
  name:"checkId",
  data(){
      return{
        form: this.$form.createForm(this, { name: 'check_id_form' }),
        checkIdForm:{
          phoneNumber:'',
          checkCode:''
        },
        checkIdRules:{
          phoneNumber:[
            { required: true, message: '手机号码必填', trigger: 'blur' },
            { min: 11, message: '请输入正确的手机号', trigger:'blur' }
          ],
          checkCode:[
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        }
      }
  },
  components:{
    checkCodeButton
  },
  mounted() {
    this.$nextTick(() => {
      this.form.validateFields();
    });
  },
  methods:{
    resetForm(){
      console.log("hello!!"+this.$refs.checkIdForm)
      this.$refs['checkIdForm'].resetFields();
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
      this.checkIdForm.phoneNumber = value.replace(/\D/g, '');
      if (value.length > 11) {
        value = value.slice(0, 11); // 截断超过11位的输入
      }
      this.checkIdForm.phoneNumber = value;
    },
    getCheckCode(){
      this.$refs['checkIdForm'].validateField('phoneNumber',(errorMessage)=>{
        console.log("this is getCheckCode Function, errorMessage:",errorMessage)
        if(!errorMessage){
          let phoneForm = {
            phone:this.checkIdForm.phoneNumber,
            operate:1
          }
          this.getCode(phoneForm)
        }else{
          this.$message.error('验证失败')
        }
      })
    },
    async getCode(phoneForm){
      let res = await api.login_reguster.sendCheckCode(phoneForm)
      console.log("this is identifyCode function, res:",JSON.stringify(res));
      if(res.code == 200){
        this.$refs['checkCodeButton'].startCountdown()
        this.$message.success('验证码发送成功')
      }else{
        this.$message.error('验证码发送失败')
      }
    },
  },
}
</script>

<style>
.forget-content-container {
  /* background-color: blue; */
  width: 46%;
  /* height: 100%; */
  padding-top: 40px;
}

label::before{
    margin-right: 4px;
    color: #f5222d;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    content: "*";
    /* background-color: aquamarine; */
}
label {
  /* background-color: antiquewhite; */
  line-height: 2;
}

</style>