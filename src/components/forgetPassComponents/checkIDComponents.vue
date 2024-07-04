<template>
      <a-form layout='inline' :form="form">
      <a-form-item label='Username'>
        <a-input
          v-decorator="[
            'username',
            {
              rules: [{ required: true, message: 'Username is required!' }],
            }
          ]"
          class="requiredInput" />
      </a-form-item>
    </a-form>
</template>

<script>
export default {
    name:"checkId",
    data(){
        return{
            
        }
    }

}
</script>

<style>
.requiredInput::before{
    display: inline-block;
    margin-right: 4px;
    color: #f5222d;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: "*";
}

</style>