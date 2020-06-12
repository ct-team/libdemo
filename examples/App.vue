<template>
    <div id="app">
        <div class="w-scroll"
             v-if="!isIndex">
            <div class="w-nav">
                <div class="w-nav-box">
                    <h1>ct-dart</h1>
                </div>
            </div>
            <div class="w-container">
                <slideNAV></slideNAV>
                <div class="demo-box">
                    <router-view></router-view>
                    <footerNav></footerNav>
                    <top></top>
                </div>
            </div>
            <!-- <main-footer></main-footer> -->
        </div>
        <router-view class="page" v-else></router-view>
    </div>
</template>

<script>
import slideNAV from './components/slidenav';
import footerNav from './components/footer';
import top from './components/totop';
// import MainFooter from './pages/footer';

export default {
    name: 'App',
    data() {
        return {
            isIndex: true,
            nav: []
        };
    },
    watch: {
        $route() {
            this.isIndex = this.$route.name === 'index';
        }
    },
    components: {
        slideNAV,
        footerNav,
        top
        // MainFooter
    },
    methods: {
    }
};
</script>
<style lang="scss" type="text/scss">
@import './assets/style/common.scss';
@import '../examples/assets/style/vs.css';
@import './assets/style/md.scss';

#app {
    color: #2c3e50;
    margin-top: 60px;
    height: 100%;
}
.w-container {
    height: 100%;
    position: relative;
    margin: auto;
    max-width: 1140px;
}
.w-scroll {
    overflow-y: auto;
    height: 100%;
}
.w-scroll::-webkit-scrollbar {
    width: 6px;
    height: 10px;
    background-color: #fff;
}
.w-scroll::-webkit-scrollbar-thumb {
    height: 100px;
    border-radius: 10px;
    background-color: #ccc;
}
.w-nav {
    position: fixed;
    top: 0;
    height: 60px;
    width: 100%;
}
.w-nav-box {
    margin: auto;
    width: 1140px;
    h1{
        color:#409EFF;
        height: 60px;
        line-height:60px;
    }
}
.demo-box{
    position: relative;
    color: #3f536e;
    font-size: 14px;
    margin-left: 250px;
    text-align: left;
    padding: 0 0 50px 40px;
}
</style>
