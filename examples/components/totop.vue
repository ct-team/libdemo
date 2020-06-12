<template>
    <transition name="back-top-fade">
        <div
            class="page-component-up"
            v-show="showBackToTop"
            @click="toTop">
            <i class="fa fa-caret-up" aria-hidden="true"></i>
        </div>
    </transition>
</template>
<script>
export default {
    name:'totop',
    data(){
        return{
            showBackToTop: false
        }
    },
    methods: {
        toTop(){
            this.showBackToTop = false;
            document.getElementsByClassName('w-scroll')[0].scrollTo(0, 0);
        }
    },
    mounted() {
        var self = this
        document.getElementsByClassName('w-scroll')[0].onscroll= function(){
            var t = document.getElementsByClassName('w-scroll')[0].scrollTop
            if (t > 100) {
                self.showBackToTop = true
            } else {
                self.showBackToTop = false
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .page-component-up{
        background-color: #fff;
        position: fixed;
        right: 100px;
        bottom: 150px;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        cursor: pointer;
        transition: .3s;
        box-shadow: 0 0 6px rgba(0,0,0,.12);
        z-index: 5;
        border: 1px solid #409eff;
        i{
            color: #409eff;
            display: block;
            line-height: 40px;
            text-align: center;
            font-size: 18px;
        }
    }
    .page-component-up:hover{
        opacity: 1;
    }
    .back-top-fade-enter,
    .back-top-fade-leave-active {
        transform: translateY(-30px);
        opacity: 0;
    }
</style>


