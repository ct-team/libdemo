<template>
    <div class="docs-demo-wrapper"
         @mouseenter="hovering = true"
         @mouseleave="hovering = false">
        <div class="demo-container">
            <slot name="html"></slot>
            <div class="highlight-wrapper">
                <div class="description"
                     v-if="$slots.default">
                    <slot></slot>
                </div>
                <slot  name="highlight"></slot>
            </div>
        </div>
        <div class="docs-trans docs-demo__triangle"
             @click="isExpand = !isExpand">
            <transition name="text-slide">
                <i :class="[iconClass, { 'hovering': hovering }]" aria-hidden="true"></i>
            </transition>
            <transition name="text-slide">
                <span class="v-textbox" v-show="hovering">{{ controlText }}</span>
            </transition>
            <!-- <span v-if="">展开代码</span> -->
        </div>
        <!-- <span class="docs-trans docs-demo__triangle" @click="toggle">{{isExpand ? '隐藏代码' : '显示代码'}}</span> -->
    </div>
</template>

<script type="text/babel">
export default {
    data() {
        return {
            isExpand: false,
            hovering: false,
            iconClass: 'fa fa-sort-asc',
            codeAera: 0
        };
    },
    methods: {
        toggle() {
            this.isExpand = !this.isExpand;
        }
    },
    computed: {
        codeAreaHeight() {
            if (this.$el.getElementsByClassName('description').length > 0) {
                return (
                    this.$el.getElementsByClassName('description')[0]
                        .clientHeight +
                    this.$el.getElementsByClassName('highlight')[0]
                        .clientHeight + 20
                );
            }
            return this.$el.getElementsByClassName('highlight')[0].clientHeight;
        },
        controlText(){
            return this.isExpand ? '隐藏代码' : '显示代码';
        }
    },
    watch: {
        isExpand(val) {
            this.iconClass = this.isExpand ? 'fa fa-sort-desc' : 'fa fa-sort-asc';
            this.$el.getElementsByClassName(
                'highlight-wrapper'
            )[0].style.height = val ? `${this.codeAreaHeight + 1}px` : '0';
            // this.codeArea.style.height = val ? `${ this.codeAreaHeight + 1 }px` : '0';
        }
    }
};
</script>
<style lang="scss">
.docs-demo-wrapper {
    display: block;
    overflow: hidden;
    transition: height 10s;
    margin-top: 20px;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    // padding: 5px;
    &:hover{
        box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
    }
}
.docs-demo__triangle {
    border-top: solid 1px #eaeefb;
    margin-top: -1px;
     > span {
        position: absolute;
        transform: translateX(-30px);
        font-size: 14px;
        line-height: 44px;
        transition: .3s;
        display: inline-block;
        color: #d3dce6;
    }
    i {
        font-size: 16px;
        line-height: 44px;
        transition: .3s;
        color: #d3dce6;
        &.hovering {
            transform: translateX(-40px);
        }
    }
    &:hover {
        span, i {
            color: #409EFF;
            background-color: #f9fafc;

        }
    }

    & .text-slide-enter,
    & .text-slide-leave-active {
        opacity: 0;
        transform: translateX(10px);
    }
}
.text-slide-enter,
.text-slide-leave-active {
    opacity: 0;
    transform: translateX(40px);
}
.docs-demo__triangle:hover {
    background-color: #f9fafc;
    cursor: pointer;
}
.demo-container {
    // height: 0px;
    overflow: hidden;
}
.docs-trans {
    display: block;
    padding: 5px;
    color: #409eff;
    background: #ffffff;
    text-align: center;
}
.docs-demo-wrapper {
    .source {
        padding: 24px;
    }
    .description {
        padding: 20px;
        box-sizing: border-box;
        border: solid 1px #ebebeb;
        border-radius: 3px;
        font-size: 14px;
        line-height: 22px;
        color: #666;
        word-break: break-word;
        margin: 10px;
        background-color: #fff;

        p {
            margin: 0;
            line-height: 26px;
        }

        code {
            color: #5e6d82;
            background-color: #e6effb;
            margin: 0 4px;
            display: inline-block;
            padding: 1px 5px;
            font-size: 12px;
            border-radius: 3px;
            height: 18px;
            line-height: 18px;
        }
    }
    .highlight-wrapper {
        background-color: #fafafa;
        border-top: solid 1px #eaeefb;
        overflow: hidden;
        height: 0;
        transition: height 0.2s;
        .highlight {
            pre {
                margin: 0;
            }

            code.hljs {
                margin: 0;
                border: none;
                max-height: none;
                border-radius: 0;

                &::before {
                    content: none;
                }
            }
        }
    }
    .act_ui_i {
        display: inline-block;
        width: 0;
        height: 0;
        border-width: 5px;
        border-style: solid;
        border-color: green transparent transparent transparent;
        opacity: 0.3;
    }
    .act_ui_top {
        border-color: transparent transparent green transparent;
        // border-color: #000;
    }
    .act_ui_bottom {
        // border-color:
        // border-top: 5px;
        // border-color: #000;
    }
    .hovering {
        opacity: 1;
    }
}
@keyframes max-height {
    from {
        height: 0%;
    }
    to {
        height: 100%;
    }
}
</style>
