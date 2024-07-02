<template>
    <div id="container">
        <loginRegisterForm></loginRegisterForm>
    </div>
</template>
    
<script>
import loginRegisterForm from '@/components/loginRegisterForm.vue';
export default {
    name:"userLoginRegisterView",
    components:{
        loginRegisterForm
    }
}
</script>
<style scoped>
#container{
    width: 100%;
    height: 70%;
    background-color: #f3f3f3;
    display: flex;
}

</style>
