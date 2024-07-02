<template>
    <div>
    <HomeTopBar></HomeTopBar>
    <HomeSearch></HomeSearch>
    </div>
</template>

<script>
import HomeTopBar from './homeTopBar.vue';
import HomeSearch from './homeSearch.vue';
export default {
    name:'HeaderComponents', 
    components: {
        HomeTopBar,
        HomeSearch
        }
};
</script>

<style scoped></style>