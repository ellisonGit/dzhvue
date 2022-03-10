<template>
  <div>
    <div class="tabbarBox">
      <router-link to="/index" class="tabbarItem">
        <img v-if="pathName!=='/index'" src="../assets/images/tabBar/index01.png" alt />
        <img v-if="pathName=='/index'" src="../assets/images/tabBar/index02.png" alt />
        <div class="tabbarTitle" :class="pathName=='/index'?'active':''">首页</div>
      </router-link>
<!--      <router-link to="/wallet" class="tabbarItem">-->
<!--        <img v-if="pathName!=='/wallet'" src="../assets/images/tabBar/onePass01.png" alt />-->
<!--        <img v-if="pathName=='/wallet'" src="../assets/images/tabBar/onePass02.png" alt />-->
<!--        <div class="tabbarTitle" :class="pathName=='/mine'?'active':''">我的</div>-->
<!--      </router-link>-->
      <router-link to="/mine" class="tabbarItem">
        <img v-if="pathName!=='/mine'" src="../assets/images/tabBar/my01.png" alt />
        <img v-if="pathName=='/mine'" src="../assets/images/tabBar/my02.png" alt />
        <div class="tabbarTitle" :class="pathName=='/mine'?'active':''">我的</div>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      pathName: ''
    }
  },
  created() {
    this.pathName = this.$route.fullPath

  }
}
</script>
<style lang="less" scoped>
.tabbarBox {
  display: flex;
  align-items: center;
  z-index: 3;
  border-top: 1px solid #e4e4e4;
  padding-top: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  .tabbarItem {
    flex: 1;
    text-align: center;
    img {
      width: 50px;
    }
    .tabbarTitle {
      color: #353535;
      margin-top: -8px;
    }
    .tabbarTitle.active {
      color: #498dff;
    }
  }
}
</style>
