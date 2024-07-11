<template>
    <div class="steps-bar-container">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="steps-content">
        <checkID v-if="current == 0" ref="checkId"></checkID>
        <resetPass v-if="current == 1" ref="resetPass">
          <template slot="first">
            新密码
          </template>
          <template slot="second">
            重复密码
          </template>
        </resetPass>
        <p v-show = "current == steps.length - 1 ">密码重置成功！</p>
      </div>
      <div class="steps-action">
        <nextButton 
          v-if="current < steps.length - 1" 
          :clickHandler="funList[current]"
          type="primary">
            {{buttonText[current]}}
        </nextButton>
        <nextButton 
          v-if="current < steps.length - 1" 
          :clickHandler="()=>resetCompForm(componentList[current])"
          type="primary">
            重置
        </nextButton>
      </div>
    </div>
</template>
<script>
import checkID from './checkIdFormComponents.vue';
import nextButton from '../buttonComponents/nextButtonComponents.vue';
import resetPass from './resetPassFormComponents.vue'
import api from '../../api/index'
export default {
  name:"stepsBar",
  data() {
      return {
          phone:'',
          current: 1,
          steps: [
              {
              title: '验证身份',
              },
              {
              title: '重置密码',
              },
              {
              title: '查看结果',
              },
          ],
          buttonText:[
            "下一步",
            "重置密码"
          ],
          funList:[
            this.verifyIdentity,
            this.verifyPass,
          ],
          componentList:[
            'checkId',
            'resetPass'
          ]
      };
  },
  components:{
      checkID,
      nextButton,
      resetPass
  },

  methods: {
      //身份验证
      verifyIdentity(){
        let checkIdComponent = this.$refs[this.componentList[0]]
        let checkIdForm = checkIdComponent.checkIdForm
        checkIdComponent.$refs['checkIdForm'].validate((valid) => {
          console.log("this is stepsBar identify Id Function, valid",valid)
          if(valid){
            let identifyForm = {
              phone: checkIdForm.phoneNumber,
              code: checkIdForm.checkCode,
              operate: 1
            }
            this.phone = checkIdForm.phoneNumber
            this.identifyId(identifyForm)
          }else{
            this.phone = ''
            this.$message.error('验证失败')
          }
        })
      },
      verifyPass(){
        let resetPassComponent = this.$refs[this.componentList[1]]
        let resetPassForm = resetPassComponent.resetPassForm
        resetPassComponent.$refs['resetPassForm'].validate((valid) => {
          console.log('this is verifyResetPass Function',valid)
          if(valid){
            let resetPasswordForm = {
              phone: this.phone,
              password: resetPassForm.newPassword,
              password2: resetPassForm.repeatPass
            }
            this.resetPassword(resetPasswordForm)
            console.log("this is resetPassForm:",resetPasswordForm)
          }
        })
      },
      resetCompForm(compName) {
        console.log("hello~~~~~~~~")
          if (this.$refs[compName]) {
            this.$refs[compName].resetForm();
          } else {
            console.error('checkID component is not available.');
          }
        console.log("this is reset function!!!!");
      },
      goToLoginAfter(){
        this.$message.info('5s后前去登录')
        setTimeout(() => {
          this.$router.replace('/login')
        }, 5000)
      },
      async identifyId(identifyForm){
        let res = await api.password.idIdentify(identifyForm)
        console.log("this is identify Function, res:",JSON.stringify(res))
        if(res.code == 200){
          //进入修改密码界面
          this.current++
          console.log('hello!success')
        }else if(res.code == 500){
          this.phone=''
          this.$message.error(res.msg)
        }
      },
      async resetPassword(resetPasswordForm){
        let res = await api.password.resetPassword(resetPasswordForm)
        console.log('resetPassword Function,res:',res)
        if(res.code == 200){
          this.$message.success(res.msg)
          this.current++
          this.goToLoginAfter()
        }else if (res.code == 500){
          this.$message.error(res.msg)
        }
      }
  },
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  /* border: 1px dashed #e9e9e9; */
  border-radius: 6px;
  /* background-color: #fafafa; */
  min-height: 150px;
  text-align: center;
  /* padding-top: 80px; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.steps-action {
  width: 46%;
  /* margin-top: 24px; */
  margin: 0 auto;
  /* background-color: brown; */
  text-align: center;
  display: flex;
  justify-content: space-between;
  padding-left: 10%;

}
.steps-bar-container{
  width: 55%;
  /* background-color: antiquewhite; */
  margin: 0 auto;
  padding-top: 30px;
}

</style>
