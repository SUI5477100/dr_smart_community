<template>
    <div class="title">
        <div class="inner-box">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "titleBar"
}
</script>

<style>
.title {
    width: 50%;
    height: 60px;
    /* background-color: aquamarine; */
    margin-left: 2%;
    border-bottom: 1px solid #f1f1f1;
    padding-top: 10px;
    margin-top: 15px;
}

.inner-box {
    /* background-color: blue; */
    height: 28px;
    width: 120px;
    text-align: center;
    border-left: 3px solid #409eff;
    font-size: 18px;
    line-height: 28px;
    /* background-color: bisque; */
}
</style>