<template>
    <div id="app">
      <!--标题 ellsion改 -->
      <router-view v-wechat-title='$route.meta.title'></router-view>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import store from './store/store.js';

    export default {
        name: 'app',
        store
    }
</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';
    @import '~vux/src/styles/1px.less';
    html {
      width: 100%;
      height: 100%;
    }
    body {
        // background-color: #fbf9fe;
        // touch-action: none;
        background-color: #F5F5F5;
        width: 100%;
        height: 100%;
        a {
            color: currentColor;
        }

        .flex {
            display: flex;
            align-items: center;
        }

        .flex_center {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .flex_sb {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .flex_sa {
            display: flex;
            align-items: center;
            justify-content: space-around;
        }

        .clearfix:after {
            content: '';
            display: block;
            height: 0;
            font-size: 0;
            clear: both;
            visibility: hidden;
        }
        #app {
          width: 100%;
          height: 100%;
        }
    }
</style>
