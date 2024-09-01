<template>
    <div id="container">
        <span class="logo">Welcome to <br>Mall Online!</span>
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
    height: 100%;
    background-color: #f3f3f3;
    display: flex;
    align-items: center;
}
.logo{
    font-size: 65px;
    margin-left: 15%;
    padding-bottom: 10%;
}
</style>
