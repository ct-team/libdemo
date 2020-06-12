<template>
    <div class="footer-nav">
        <span v-if="leftNav"
            class="prevclass footer-nav-link"
            @click='changeRouter("prev")'>
            <i class="fa fa-angle-left" aria-hidden="true"></i>
            {{leftNav.desc}}
        </span>
        <span v-if="rightNav"
            @click='changeRouter("next")'
            class="nextclass footer-nav-link">
            {{rightNav.desc}}
            <i class="fa fa-angle-right" aria-hidden="true"></i>
        </span>
  </div>
</template>
<script>

import navJson from '../nav.data.json';
export default {
    name: 'footnav',
    data() {
        return {
            nav: [],
            currentComponent: null,
            currentIndex: -1,
            leftNav: null,
            rightNav: null
        };
    },
    watch: {
        '$route.path'() {
            this.setNav();
            this.updateNav();
        }
    },
    created() {

    },
    methods: {
        updateNav() {
            this.currentComponent = this.$route.path;
            for (let i = 0, len = this.nav.length; i < len; i++) {
                // console.log(this.nav[i].path);
                // console.log(this.nav[i].path);
                // console.log(1, this.currentComponent);
                // console.log(this.nav);
                if (this.nav[i].path === this.currentComponent) {
                    // alert(1);
                    this.currentIndex = i;
                    break;
                }
            }
            this.leftNav = this.nav[this.currentIndex - 1];
            this.rightNav = this.nav[this.currentIndex + 1];
        },
        setNav() {
            this.nav = [];
            for (let i = 0; i < navJson.length; i++) {
                //console.log(navJson[i].group);
                // console.log(navJson[i].group.items);
                if (navJson[i].group) {
                    if (!navJson[i].group[0].items) {
                        navJson[i].group.forEach(list => {
                            if (list.desc) {
                                this.nav = this.nav.concat(list);
                            }
                        });
                    } else {
                        navJson[i].group.map(group => group.items).forEach(list => {
                           // console.log(list);
                            this.nav = this.nav.concat(list);
                        });
                    }
                }
            }
            //console.log(this.nav);
        },
        changeRouter(derector) {
            this.$router.push({name: derector === 'prev' ? this.leftNav.name : this.rightNav.name});
        }
    }
};
</script>

<style lang="scss" scoped>
    .footer-nav{
        width: 100%;
        padding: 30px 0 50px 0;
        margin-bottom: 20px;
        color: #333;
        font-size: 14px;
        .prevclass{
            float: left;
            margin-left: -4px;
            // i{
                // display: inline-block;
                // width: 0;
                // height: 0;
                // border-width: 5px;
                // border-style: solid;
                // border-color: green transparent transparent transparent;
                // opacity: 0.3;
            // }
        }
        .prevclass:hover{
            color: #409eff
        }
        .footer-nav-link {
            cursor: pointer;
            transition: .3s;
        }
        .nextclass{
            float: right;
            margin-right: -4px;
        }
        .nextclass:hover{
            color: #409eff
        }
    }
</style>
