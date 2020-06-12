<template>
    <div class="dart-image-box"
         :style="[imgSize]">
        <div v-if="!loadingState"
             class="dart-image-error">加载失败</div>
        <img v-if="loadingState"
             :src="value"
             @click="handleImgClick"
             @error="imgLoadError()"
             class="dart-image-img"
             :alt="alt"
             :title="title">
        <el-dialog :title="viewTitle"
                   :visible.sync="dialogVisible"
                   :width="imgViewWidth">
            <div class="dart-image-pop"
                 :style="{width:boxWidth}"><img :src="imgSrc"
                     width="100%"></div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'dartImage',
    props: {
        type: {
            type: String,
            default: 'small'
        }, //big middle small auto
        alt: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        view: {
            type: Boolean,
            default: true
        },
        width: {
            type: String,
            default: ''
        },
        height: {
            type: String,
            default: ''
        },
        viewTitle: {
            type: String,
            default: ''
        },
        viewWidth: {
            type: String,
            default: '50%'
        },
        viewImgSrc: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            dialogVisible: false,
            boxWidth: '',
            imgViewWidth: '',
            imgType: {
                big: '200px',
                middle: '100px',
                small: '50px'
            },
            loadingState: true
        };
    },
    methods: {
        imgLoadError() {
            this.loadingState = false;
        },
        handleImgClick() {
            if (this.view) {
                this.viewImag(this.imgSrc);
            }
        },
        viewImag(src) {
            var imgObj = new Image();
            var popWidth = this.viewWidth;

            imgObj.src = src;

            imgObj.onload = () => {
                if (imgObj.width <= 260) {
                    popWidth = '300px';
                    this.boxWidth = imgObj.width + 'px';
                } else {
                    this.boxWidth = '';
                }
                this.imgViewWidth = popWidth;
                this.dialogVisible = true;
            };
            imgObj.onerror = () => {
                this.$message({
                    message: '预览图片加载失败',
                    type: 'warning'
                });
            };
        },
        getImgSize(type) {
            var imgSize = this.imgType[this.type];

            if (imgSize) {
                return imgSize;
            }
            if (type === 'height') {
                return this.height;
            }
            if (type === 'width') {
                return this.width;
            }
        }

    },
    computed: {
        getImgHeight() {
            return this.getImgSize('height');
        },
        getImgWidth() {
            return this.getImgSize('width');
        },
        imgSize() {
            return { height: this.getImgSize('height'), width: this.getImgSize('width') };
        },
        imgSrc() {
            return this.viewImgSrc ? this.viewImgSrc : this.value;
        }
    }
};
</script>
<style lang="scss">
.dart-image-pop {
    text-align: center;
    margin: 0 auto;
}
.dart-image-box {
    display: inline-block;
    overflow: hidden;
}
.dart-image-error {
    height: 100%;
    width: 100%;
    background-color: #f5f7fa;
    color: #c0c4cc;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
}
.dart-image-img {
    width: 100%;
}
</style>
