<template>
  <div class="loginBox">
    <div class="headBox">
      <img src="../assets/images/bgimgright12x.png" alt/>
      <div class="headContent flex_sb">
        <router-link to class="leftBox">
          <x-icon type="ios-arrow-left" class="moreIcon" size="24" @click="goback"></x-icon>
        </router-link>
        <router-link to="signIn" class="rightBox">注册</router-link>
      </div>
    </div>
    <div class="loginContent">
      <div class="loginTitle">修改密码</div>
      <!-- <div class="formList flex">
        <div class="leftHint" style="display: none">+86</div>
        <input type="text" class="inputBox" v-model="userName" placeholder="请输入用户名" />
      </div>-->
      <div v-if="passType=='passWord'" class="formList flex">
        <input type="text" class="inputBox" v-model="passWord" placeholder="请输入原始密码"/>
      </div>
      <div v-if="passType=='passWord'" class="formList flex">
        <input
          :type="see?'text':'password'"
          class="inputBox"
          v-model="newPassWord1"
          placeholder="请输入新密码"
        />
        <img
          v-if="!see"
          src="../assets/images/icon_Nodisplay02x.png"
          class="seeBtn"
          @click="see=!see"
        />
        <img v-else src="../assets/images/icon_display02x.png" alt class="seeBtn" @click="see=!see"/>
      </div>
      <div v-if="passType=='passWord'" class="formList flex">
        <input
          :type="see?'text':'password'"
          class="inputBox"
          v-model="newPassWord2"
          placeholder="请再次输入新密码"
        />
      </div>
      <div
        class="loginBtn"
        :class="(passWord!==''&&newPassWord1!==''&&newPassWord2!=='')?'active':''"
        @click="goInBtn()"
      >确认修改
      </div>
    </div>
  </div>
</template>

<script>
  import {updatePassword} from '@/api/index/login'
  import Push from 'push.js'
  import md5 from 'js-md5'
  import store from '../store/store'

  export default {
    data() {
      return {
        userId: '',
        passWord: '',
        newPassWord1: '',
        newPassWord2: '',
        passType: 'passWord', // passWord 或者 authCode 两种登录状态
        see: false
      }
    },
    mounted() {
      this.userId = this.$route.query.name
    },
    methods: {
      // 登录
      goInBtn() {
        console.log(this.userId);
        console.log(this.passWord);
        console.log(this.newPassWord1);
        console.log(this.newPassWord2);
        if (this.passWord == '' || this.newPassWord1 == '' || this.newPassWord2 == '') {
          return;
        }
        if (this.newPassWord1 !== this.newPassWord2) {
          this.$vux.alert.show({
            title: '两次密码不一致'
          })
        }
        if (this.newPassWord1 == this.newPassWord2) {
          updatePassword(this.userId, this.passWord, this.newPassWord2).then(res => {
            console.log(res.data.data);
            if (res.data.data.status == "true") {
              this.$vux.alert.show({
                title: '密码修改成功'
              });
              this.$router.push("/login");
            } else if (res.data.data.status == "false") {
              this.$vux.alert.show({
                title: '密码修改失败'
              });
            }
          }).catch(err => {
            console.log(err)
          });
        }


      },
      pushMessage(message) {
        Push.create('消息通知的标题', {
          body: message,
          requireInteraction: true,
          //icon: '/icon.png',
          timeout: 600000
        })
      },
      goback() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
  .loginBox {
    .headBox {
      position: relative;
      padding: 20px;

      img {
        position: absolute;
        top: 0;
        right: 0;
        width: 180px;
      }

      .headContent {
        padding-top: 30px;
        font-size: 34px;

        .leftBox {
          color: #04aaff;
          font-size: 40px;
        }

        .rightBox {
          display: inline-block;
          color: #04aaff;
          border-radius: 40px;
          border: 2px solid #04aaff;
          text-align: center;
          line-height: 80px;
          height: 80px;
          width: 140px;
          background-color: #fff;
          z-index: 3;
        }
      }
    }

    .loginContent {
      padding: 40px 80px;

      .loginTitle {
        font-size: 50px;
        font-weight: bold;
        padding: 40px 0;
      }

      .formList {
        // padding: 40px 0;
        height: 100px;
        border-bottom: 2px solid #f0f0f0;

        input {
          height: 40px;
          line-height: 40px;
        }

        .leftHint {
          background-color: #f6f6fe;
          color: #798696;
          padding: 2px 10px;
          margin-right: 20px;
          font-size: 32px;
          border-radius: 10px;
        }

        .inputBox {
          border: none;
          outline: none;
          font-size: 32px;
          flex-grow: 1;
          padding: 0 10px;
        }

        .seeBtn {
          width: 50px;
        }

        .authBtn {
          font-size: 30px;
          color: #04aaff;
        }

        .second {
          font-size: 30px;
          color: #04aaff;
        }
      }

      .loginBtn {
        margin-top: 40px;
        text-align: center;
        padding: 16px 40px;
        border-radius: 40px;
        font-size: 36px;
        background-color: rgb(209, 206, 206);
      }

      .loginBtn.active {
        background: linear-gradient(60deg, #98d8ff, #06a9f5);
        color: #fff;
      }

      .moreGoIn {
        position: fixed;
        bottom: 50px;
        left: 0;
        right: 0;
        text-align: center;
        color: #798696;
        font-size: 36px;
      }
    }
  }
</style>
