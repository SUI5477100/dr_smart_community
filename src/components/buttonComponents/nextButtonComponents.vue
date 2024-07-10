<template>
    <a-button :type="type" class="button-width" @click="handleClick">
        <slot></slot>
    </a-button>
</template>

<script>
export default {
    name:"nextButton",
    props:{
        type:{
            type:String,
            default: 'default'  // 设置默认类型
        },
        clickHandler:{
            type:Function
        }
    },
    data(){
        return{}
    },
    methods:{
        handleClick(){
            this.clickHandler();
        }
    }

}
</script>

<style>
.button-width {
  width: 47%;
}

</style>