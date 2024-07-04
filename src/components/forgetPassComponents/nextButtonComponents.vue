<template>
    <a-button type="primary" class="button-width" @click="handleClick">
        <slot></slot>
    </a-button>
</template>

<script>
export default {
    name:"nextButton",
    props:{
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