<template>
    <div id="indexbox">
        <h2>ct-dart 后台业务组件库</h2>
        <div class="w-container">
            <router-link :to="{name: 'log'}">开始使用</router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'index',
    data() {
        return {};
    }
};
</script>
<style lang="scss" scoped>
* {
    padding: 0;
    margin: 0;
}
#indexbox {
    display: block;
    img {
        margin: auto;
        display: block;
        margin-bottom: 50px;
    }
    h2{
        text-align:center;
    }
}
.w-container {
    position: relative;
    margin: 100px auto 0;
    height: 100px;
    text-align:center;
    a {
        display: inline-block;
        text-align:center;
        height: 30px;
        line-height: 30px;
        width: 100px;
        background: orange;
        border-radius: 30px;
    }
    .btn-github {
        right: 30%;
        left: auto;
        // display: inline-table;
    }
}
</style>
