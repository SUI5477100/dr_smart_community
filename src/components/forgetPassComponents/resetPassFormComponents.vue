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
          <label for="newPass">新密码</label>
        </a-col>
        <a-col :span="19">
          <a-form-model-item>
            <a-input  placeholder="请输入新密码" name="newPass" prop="newPass" v-model="resetPassForm.newPass"/>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="5">
          <label for="repeatPass">重复密码</label>
        </a-col>
        <a-col :span="19">
          <a-form-model-item>
            <a-input placeholder="请输入再次输入密码"  prop="repeatPass" v-model="resetPassForm.repeatPass"/>
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
        return{
          resetPassForm:{
            newPass:'',
            repeatPass:''
          },
          resetPassRules:{
            newPass:[
              { required: true, message: '新密码必填' }
            ],
            repeatPass:[
              { required: true, message: '请输入再次输入密码' }
            ]
          }
        }
    }

}
</script>

<style>

</style>