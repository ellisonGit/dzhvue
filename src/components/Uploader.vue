<template>
    <div class="weui-cell">
        <div class="weui-cell__bd">
            <div class="weui-uploader">
                <div v-show="showHeader" class="weui-uploader__hd">
                    <p class="weui-uploader__title">{{ title }}</p>
                    <div
                            v-show="showHeader && showTip"
                            class="weui-uploader__info"
                    >{{ images.length }} / {{ max }}
                    </div>
                </div>

                <div class="weui-uploader__bd" :class="{small: size === 'small'}">
                    <div
                            v-show="!readonly && images.length > 0"
                            class="weui-uploader__input-box remove"
                            @click="remove"
                    ></div>

                    <ul class="weui-uploader__files">
                        <uploader-item
                                v-for="image in images"
                                :background-image="image.url"
                                :key="image.url"
                                @click.native="preview(image)"
                        ></uploader-item>
                    </ul>

                    <div
                            v-show="!readonly && images.length < max"
                            class="weui-uploader__input-box"
                            @click="add"
                    >
                        <input
                                v-if="!handleClick"
                                ref="input"
                                class="weui-uploader__input"
                                type="file"
                                accept="image/*"
                                :capture="showCapture"
                                @change="change"
                        />
                    </div>
                </div>
            </div>
        </div>
        <x-dialog
                v-model="showDialogStyle"
                hide-on-blur
                :dialog-style="{'max-width': '100%', width: '90%', 'background-color': 'transparent'}"
        >
            <p style="color:#fff;text-align:center;" @click="showDialogStyle = false">
                <img :src="nowImg" alt class="nowImgBox"/>
                <br/>
                <br/>
                <x-icon type="ios-close-outline" style="fill:#fff;"></x-icon>
            </p>
        </x-dialog>
    </div>
</template>

<script>
    import UploaderItem from './uploader-item.vue'
    import axios from 'axios'
    import {XDialog} from 'vux'
    import {uploadImage} from '@/api/index/video';

    export default {

        components: {
            XDialog,
            UploaderItem,
        },
        props: {
            images: {
                type: Array,
                default: () => []
            },
            max: {
                type: Number,
                default: 1
            },
            showHeader: {
                type: Boolean,
                default: true
            },
            showTip: {
                type: Boolean,
                default: true
            },
            readonly: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: '图片上传'
            },
            // 是否接管+号的click事件，如果是，点击不弹出选择文件的框
            handleClick: {
                type: Boolean,
                default: false
            },
            // 选择文件后是否自动上传，如果不是，则emit change事件
            autoUpload: {
                type: Boolean,
                default: true
            },
            uploadUrl: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: 'normal'
            },
            capture: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: 'img'
            },
            params: {
                type: Object,
                default: null
            },
            headers: {
                type: Object,
                default: () => {
                }
            }
        },
        data() {
            return {
                showDialogStyle: false,
                nowImg: '',
                list: [],
                userImg: ''
            }
        },
        methods: {
            add() {
                if (this.handleClick) {
                    this.$emit('add-image')
                }
            },
            // 移除第一张图
            remove() {
                // 移除图片的时候将input file 置空，否则删除该图片之后无法再次上传该图片
                document.querySelector('.weui-uploader__input').value = ''
                if (this.handleClick) {
                    this.$emit('remove-image')
                } else {
                    this.images.shift()
                }
            },
            preview(image) {
                // 暂未实现，可以捕捉preview事件自己实现
                this.$emit('preview', image)
                this.nowImg = image.url;
                this.showDialogStyle = !this.showDialogStyle
            },
            // 适用于action的情况
            change() {
                if (this.handleClick) {
                    return
                }
                let formData = new window.FormData();
                formData.append(this.name, this.$refs.input.files[0]);
                alert("上传中...");
                // 通过append()方法追加数据

                var files = this.$refs.input.files[0];
                let list = [];
                var reader = new FileReader();
                console.log(files);
                let that = this;
                reader.readAsDataURL(this.$refs.input.files[0]);
                reader.onload = async function (e) {
                    let result = this.result;
                    let img = new Image();
                    img.src = result;
                    console.log("********未压缩前的图片大小********");
                    console.log(result.length / 1024);
                    console.log(img);
                    img.onload = function () {
                        let data = that.compress(img, 0.1);
                        that.uploadImg(data);
                    };
                    // var base = e.target.result;
                    //
                    // console.log(base);
                    // await list.push({base: base});
                    // console.log(list[0])
                    // let data =that.compress(files, 0.1);
                    // console.log(data);
                    // this.uploadImg(data);
                    // alert("base64"+list[0])
                };
                // setTimeout(() => {
                //     // alert("base64编码"+list[0]);
                //     uploadImage(list[0], fileName).then(res => {
                //         console.log(res.data.data.url);
                //         // this.images.url = res.data.data.url
                //         // this.images.push(res.data.data.url)
                //         // this.remove();
                //         // this.preview(res.data.data.url)\
                //         this.$emit('resImg', res.data.data.url)
                //     }).catch(err => {
                //         console.log(err)
                //     });
                // }, 100);

                // if (this.params) {
                //     for (let key in this.params) {
                //         formData.append(key, this.params[key])
                //     }
                // }
                // if (this.autoUpload) {
                //     if (!this.uploadUrl) {
                //         console.error('uploadUrl不应为空')
                //     }
                //     if (this.$vux && this.$vux.loading) {
                //         this.$vux.loading.show('正在上传')
                //     }
                //
                //     axios.post(this.uploadUrl, formData, {headers: this.headers}).then((response) => {
                //         if (this.$vux && this.$vux.loading) {
                //             this.$vux.loading.hide()
                //         }
                //         this.$refs.input.value = ''
                //         this.images.push(response.data.data)
                //     })
                // } else {
                //     this.$emit('upload-image', formData)
                // }
            },
            compress(img, size) {
                // 创建canvas
                let canvas = document.createElement('canvas')
                let ctx = canvas.getContext('2d')
                let initSize = img.src.length
                let width = img.width
                let height = img.height
                canvas.width = width
                canvas.height = height
                // 铺底色
                ctx.fillStyle = '#fff'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(img, 0, 0, width, height)
                //进行最小压缩
                let ndata = canvas.toDataURL('image/jpeg', size)
                console.log('*******压缩后的图片大小*******')
                console.log(ndata.length / 1024)
                return ndata
            },
            async uploadImg(base64) {
                console.log(base64);
                this.userImg = base64;
                var fileName = this.$refs.input.files[0].name;
                uploadImage(base64, fileName).then(res => {
                    console.log(res.data.data.url);
                    // this.images.url = res.data.data.url
                    // this.images.push(res.data.data.url)
                    // this.remove();
                    // this.preview(res.data.data.url)
                    this.$emit('resImg', res.data.data.url)
                }).catch(err => {
                    console.log(err)
                });
                // 这里可以打印出最终压缩后的base64
            },

        },
        computed: {
            showCapture() {
                return this.capture || undefined
            }
        }
    }
</script>
<style scoped lang="less">
    @import '~vux/src/styles/weui/widget/weui-uploader/index.less';

    .remove:before {
        width: 0;
        height: 0;
    }

    .nowImgBox {
        width: 100%;
    }

    /deep/ .weui-uploader__input-box {
        margin-right: 20px;
        margin-bottom: 10px;
        width: 120px;
        height: 120px;
    }

    .weui-uploader__file {
        width: 120px;
        height: 120px;
        margin-right: 20px;
        margin-bottom: 20px;
    }
</style>