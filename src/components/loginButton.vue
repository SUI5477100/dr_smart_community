<template>
    <div class="">
        <div>这是Login Button组件</div>
        <Button type="primary">这是在LoginButton中引入的Ant Desgin组件按钮</Button>

    </div>
</template>

<script>
// 按需引入Ant Design中的组件
import Button from 'ant-design-vue/lib/button';
export default {
    components: {
        Button
    }
};
</script>

<style scoped></style>
