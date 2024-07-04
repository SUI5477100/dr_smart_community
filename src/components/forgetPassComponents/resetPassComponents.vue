<template>
    <div class="forget-content-container">
    <a-form-model 
      layout="vertical"
      :form="form" 
      ref="resetPassForm">
      <a-row >
        <a-col :span="5">
          <label for="newPass">新密码</label>
        </a-col>
        <a-col :span="19">
          <a-form-model-item>
            <a-input 
              v-decorator="[
                'newPass',
                {
                  rules: [{ required: true, message: '新密码必填' }],
                }
              ]" 
              placeholder="请输入新密码"
              name="newPass"/>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="5">
          <label for="repeatPass">重复密码</label>
        </a-col>
        <a-col :span="19">
          <a-form-model-item>
            <a-input
              v-decorator="[
                'repeatPass',
                {
                  rules: [{ required: true, message: '请输入再次输入密码' }],
                }
              ]"
              placeholder="请输入再次输入密码"/>
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
        return{}
    }

}
</script>

<style>

</style>