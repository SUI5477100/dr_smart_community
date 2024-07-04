<template>
    <div class="stepsBarContainer">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="steps-content">
        <checkID v-show="current == 0"></checkID>
      </div>
      <div class="steps-action">
        <a-button v-if="current < steps.length - 1" type="primary" @click="next">
          Next
        </a-button>
        <a-button
          v-if="current == steps.length - 1"
          type="primary"
          @click="$message.success('Processing complete!')"
        >
          Done
        </a-button>
        <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
          Previous
        </a-button>
      </div>
    </div>
</template>
<script>
import checkID from './checkIDComponents.vue';
export default {
name:"stepsBar",
data() {
    return {
        current: 0,
        steps: [
            {
            title: '验证身份',
            content: 'First-content',
            },
            {
            title: '重置密码',
            content: 'Second-content',
            },
            {
            title: '查看结果',
            content: 'Last-content',
            },
        ],
    };
},
components:{
    checkID
},

methods: {
    next() {
    this.current++;
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
border: 1px dashed #e9e9e9;
border-radius: 6px;
background-color: #fafafa;
min-height: 200px;
text-align: center;
padding-top: 80px;
}

.steps-action {
margin-top: 24px;
}
.stepsBarContainer{
    width: 70%;
    background-color: antiquewhite;
}
</style>
