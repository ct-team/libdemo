<template>
    <div class="slidenav">
        <div v-for="(title,index) in (Object.keys(data))"
             :key="index"
             class="group">
            <p class="group-child" v-if="!data[title].type">{{data[title].name}}</p>
            <div v-for="(nav,index) in data[title]"
                 :key="index"
                 class="group-module"
                 v-if="index === 'group'">
                <div v-for="(item, indexes) in nav"  :key="indexes" class="slide_a" :class="$route.name===item.name ? 'activebox' : ''">
                    <template v-if="item.name" >
                        <router-link :class="$route.name === item.name ? 'active' : ' ' "
                                v-if="item.name"
                                :to="{name: item.name}">{{item.desc}}</router-link>
                        <p v-else>{{item.desc}}</p>
                        <div v-for="(item,index) in item.items"
                            :key="index"
                            :class="$route.name===item.name ? 'activebox' : ''"
                            class="slide_a">
                            <router-link :to="{name: item.name}"
                                        :class="$route.name===item.name ? 'active' : ''"
                                        class="slid-nav-component">{{item.desc}}</router-link>
                        </div>
                    </template>
                    <template v-else>
                        <p v-if="item.type">{{item.desc}}</p>
                        <div v-for="(chirld, el) in item.items" :key="el" :class="$route.name===chirld.name ? 'activebox' : ''" class="slide_a">
                            <router-link :to="{name: chirld.name}"
                                :class="$route.name===chirld.name ? 'active': ''"
                                >{{chirld.desc}}</router-link>
                            <p v-if="item.types === 'F-title' " @click="a(item)">{{item.desc}}</p>
                        </div>
                    </template>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import json from '../nav.data.json';
export default {
    name: 'slidenav',
    data() {
        return {
            data: json
        };
    },
    methods: {
        skipToDetail() {},
        a(d){
            console.log(d);
        }
    },
    created() {
    }
};
</script>
<style lang="scss" scoped type="text/sass">
@import '../assets/style/mixin.scss';

.slidenav {
    position: fixed;
    top: 60px;
    bottom: 0;
    @include wh(250px, 90%);
    // border-right: 1px solid #eeeeee;
    float: left;
    // padding-left: 20px;
    overflow-y: hidden;
    .group {
        margin-top: 10px;
    }

    .group-child {
        @include sc(16px, #000000);
        font-weight: bold;
        line-height: 2;
        text-align: left;
        padding-left: 20px
    }
    .group-module {
        p {
            text-align: left;
            font-size: 12px;
            color: #999;
            height: 40px;
            line-height: 40px;
            font-weight: 400;
            padding-left: 20px
        }
        a {
            color: #444;
            cursor: pointer;
            display: block;
            text-align: left;
            font-size: 14px;
            height: 40px;
            line-height: 40px;
            font-weight: 400;
            text-decoration: none;
            padding-left: 20px
        }
    }
}
.slidenav:hover {
    overflow-y: auto;
}
.slidenav::-webkit-scrollbar {
    width: 6px;
    height: 10px;
    background-color: #fff;
}
.slidenav::-webkit-scrollbar-thumb {
    height: 100px;
    border-radius: 10px;
    background-color: #ccc;
}
.slid-nav-component {
    font-size: 12px;
}
.slide_a>a:hover {
    color: #409eff !important;
}
.activebox{
    background-color: #ecf6fd;
    border-right: 3px solid #108ee9;
    a{
        color: #409eff !important;
    }
}
</style>
