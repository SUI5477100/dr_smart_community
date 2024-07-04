<template>
  <!-- <div class="container"> -->
    <stepsBar></stepsBar>
  <!-- </div> -->
</template>

<script>
import stepsBar from '../components/forgetPassComponents/stepsBarComponents.vue'
export default {
    name:"forgetPassView",
    data(){
        return{

        }
    },
    components:{
        stepsBar,
    }

}
</script>

<style>
.container{
    width: 100%;
    height: 100%;
    background-color: aqua;
}

</style>