<template>
    <div class="stepsBarContainer">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="steps-content">
        <checkID v-show="current == 0"></checkID>
        <resetPass v-show="current == 1"></resetPass>
        <p v-show = "current == steps.length - 1 ">密码重置成功！</p>
      </div>
      <div class="steps-action">
        <nextButton v-if="current < steps.length - 1" :clickHandler="funList[current]">
          {{buttonText[current]}}
        </nextButton>
        <nextButton v-if="current < steps.length - 1" :clickHandler="resetForm">
          重置
        </nextButton>
        <!-- <a-button
          v-if="current == steps.length - 1"
          type="primary"
          @click="done"
        >
          Done
        </a-button> -->
        <!-- <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
          Previous
        </a-button> -->
      </div>
    </div>
</template>
<script>
import checkID from './checkIDComponents.vue';
import nextButton from './nextButtonComponents.vue';
import resetPass from './resetPassComponents.vue'
export default {
name:"stepsBar",
data() {
    return {
        current: 0,
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
          this.next,
          this.resetPass,
          this.done
        ],
        formList:[
          'checkIdForm',
          'resetPassFrom'
        ]
    };
},
components:{
    checkID,
    nextButton,
    resetPass
},

methods: {
    next() {
      this.current++;
    },
    // resetForm(formName) {
    //   this.current--;
    //   this.$refs[formName]
    //   console.log("this is reset function!!!!");
    // },
    resetPass(){
      this.current++;
      this.$message.success('Processing complete!')
      console.log("this is resetPass function!!!")
    },
    done(){
      this.current++;
      console.log("this is done function!!!")
    },
    prev() {
    this.current--;
    },
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
.stepsBarContainer{
  width: 55%;
  /* background-color: antiquewhite; */
  margin: 0 auto;
  padding-top: 30px;
}

</style>
