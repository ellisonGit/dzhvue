<template>
  <div class="headerBack">
    <x-icon v-if="back" type="ios-arrow-left" size="30" @click="backHandler" class="leftIcon"></x-icon>
    <x-icon v-if="run" type="ios-arrow-right" size="30" @click="runHandler"></x-icon>
    <x-icon v-if="!run" type="ios-arrow-right" size="30" class="rightIcon"></x-icon>
  </div>
</template>

<script>
export default {
  props: {
    back: {
      type: [Object, String, Boolean],
      default: true
    },
    run: {
      type: [Object, String, Boolean],
      default: true
    }
  },
  methods: {
    backHandler() {
      if (!this.back) return;
      if (typeof (this.back) === 'boolean' && this.back) {
        //可以再处理下如果是第一次进详情页的情况
        return this.$router.back();
      }
      //对象/字符串
      this.$router.replace(this.back);
    },
    runHandler() {
      if (!this.run) return;
      // if (typeof (this.run) === 'boolean' && this.run) {
      //   //可以再处理下如果是第一次进详情页的情况
      //   return this.$router.go('/' + this.run + "'");
      // }
      //对象/字符串
      this.$router.replace(this.run);
    }
  }
}
</script>
<style lang="less" scoped>
.headerBack {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  background-color: #faf9fe;
  border-top: 1px solid #e6e5ea;
  position: fixed;
  bottom: 0;
  left: 0;
  .leftIcon {
  }
  .rightIcon {
    fill: #c1c1c1;
  }
}
</style>