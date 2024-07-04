<template>
  <div class="forget-content-container">
    <a-form-model 
      layout="vertical"
      :form="form"
      ref="checkIdForm" 
      :model="checkIdForm">
      <a-row >
        <a-col :span="5">
          <label for="phoneNumber">手机号码</label>
        </a-col>
        <a-col :span="19">
          <a-form-model-item>
            <a-input 
              v-decorator="[
                'phoneNumber',
                {
                  rules: [{ required: true, message: '手机号码必填' }],
                }
              ]" 
              placeholder="请输入手机号码"
              prop="phoneNumber"/>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="5">
          <label for="checkCode">验证码</label>
        </a-col>
        <a-col :span="13">
          <a-form-model-item>
            <a-input
              v-decorator="[
                'checkCode',
                {
                  rules: [{ required: true, message: '请输入验证码' }],
                }
              ]"
              placeholder="请输入验证码"
              prop="checkCode"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="2" :offset="1">
          <a-button
            html-type="submit"
            class="codeButton">
            <span>发送验证码</span>
          </a-button>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
export default {
    name:"checkId",
    data(){
        return{
            
        }
    }
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