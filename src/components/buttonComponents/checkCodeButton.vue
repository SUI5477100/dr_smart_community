<template>
    <a-button
    html-type="submit"
    @click="handleClick"
    :disabled="isButtonDisabled">
        <span>{{ buttonLabel }}</span>
</a-button>
</template>

<script>
export default {
    name:'checkCodeButton',
    props:{
        handleClick:{
            type:Function
        }
    },
    data(){
        return{
            countdown:60,
            isButtonDisabled:false,
            buttonLabel:'发送验证码'
        }
    },
    methods:{
        startCountdown() {
            this.isButtonDisabled = true;
            this.buttonLabel = `重新发送 ${this.countdown}s`;
            const countdownInterval = setInterval(() => {
                this.countdown--;
                this.buttonLabel = `重新发送 ${this.countdown}s`;
                if (this.countdown === 0) {
                clearInterval(countdownInterval);
                this.isButtonDisabled = false;
                this.buttonLabel = '发送验证码';
                this.countdown = 60;
                }
            }, 1000);
        },
    }
}
</script>

<style>

</style>