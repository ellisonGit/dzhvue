<template>
  <div class="loginBox">
    <div class="headBox">
      <img src="../assets/images/bgimgright12x.png" alt/>
      <div class="headContent flex_sb">
        <router-link to class="leftBox">
          <x-icon type="ios-arrow-left" class="moreIcon" size="24" @click="goback"></x-icon>
        </router-link>
      </div>
    </div>
    <div class="loginContent">
      <div class="loginTitle">忘记密码</div>
      <div class="formList flex">
        <div class="leftHint">+86</div>
        <input type="text" class="inputBox" v-model="userPhone" placeholder="请输入手机号"/>
      </div>
      <div v-if="passType=='passWord'" class="formList flex">
        <input :type="see?'text':'password'" class="inputBox" v-model="newPassWord" placeholder="请输入新密码"/>
        <img v-if="!see" src="../assets/images/icon_Nodisplay02x.png" class="seeBtn"
             @click="see=!see"/>
        <img v-else src="../assets/images/icon_display02x.png" alt class="seeBtn" @click="see=!see"/>
      </div>
      <div class="formList flex">
        <input class="inputBox" v-model="authCode" placeholder="请输入验证码" @blur.native="sendMobile"/>
        <div v-if="!countDown" class="authBtn" @click="getAuthCode">获取验证码</div>
        <div v-if="countDown" class="second">{{secondDown}}s</div>
        <input type="hidden" id="phoneCode" v-model="phoneCode"/>
      </div>
      <div class="loginBtn" :class="(userPhone!==''&&authCode!==''&&newPassWord!=='')?'active':''"
           @click="goInBtn()">重设密码
      </div>
    </div>
  </div>
</template>

<script>
  import {changePassword} from '@/api/index/login'
  import Push from 'push.js'
  import {getVerificationCode} from '@/api/index/login';
  import store from '../store/store'

  export default {
    data() {
      return {
        userPhone: '',
        passWord: '',
        newPassWord: '',
        passType: 'passWord', // passWord 或者 authCode 两种登录状态
        see: false,
        authCode: '',
        phoneCode: '',
        secondDown: 60,
        countDown: false,
      }
    },
    mounted() {
    },
    methods: {
      // 验证码倒计时
      getAuthCode() {
        //验证手机号码
        let mobile = this.userPhone;
        //正则校验手机号是否合法
        if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(mobile))) {
          this.$vux.alert.show({
            content: '手机号格式错误'
          });
          this.userPhone = '';
          return
        }
        // 发送验证码请求
        // this.$http.get('url').then(res => {
        // })
        getVerificationCode(mobile, '4ZMNZFG4CM').then(res => {
          console.log(res.data.data);
          this.phoneCode = res.data.data.phoneCode;
        }).catch(err => {
          console.log(err);
        });


        // 显示倒计时
        this.countDown = true
        // 设置倒计时
        this.intervalBtn = setInterval(() => {
          if (this.secondDown <= 0) {
            this.countDown = false
            // 清除定时器
            clearInterval(this.intervalBtn)
            // 重置倒计时状态
            this.secondDown = 60;
          }
          ;
          // 倒计时
          this.secondDown--;
        }, 1000);
      },
      // 登录
      goInBtn() {
        console.log(this.userPhone);
        console.log(this.newPassWord);
        console.log(this.authCode);
        console.log(this.phoneCode);
        if (this.newPassWord == '') {
          return;
        }
        if (this.authCode != this.phoneCode) {
          this.$vux.alert.show({
            title: '验证码不一致'
          })
        }
        if (this.authCode == this.phoneCode) {
          changePassword(this.userPhone, this.newPassWord, this.authCode).then(res => {
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
