<template>
  <div class="loginBox">
    <div class="headBox"></div>
    <div class="loginContent">
      <div class="loginTitle">欢迎登录一卡通</div>
      <div class="formList flex" v-if="param_corp_id==undefined || param_corp_id.length == 0">
        <div class="leftHint" style="display: none"></div>
        <input type="text" class="inputBox" v-model="corp_id" placeholder="请输入企业编号"/>
      </div>
      <div class="formList flex">
        <div class="leftHint" style="display: none"></div>
        <input type="text" class="inputBox" v-model="emp_id" placeholder="请输入工号"/>
      </div>
      <div class="formList flex">
        <div class="leftHint" style="display: none"></div>
        <input type="text" class="inputBox" v-model="emp_fname" placeholder="请输入姓名"/>
      </div>
      <div class="loginBtn" @click="userBind()">登录</div>
    </div>
  </div>
</template>

<script>
  import {userBind, querySubOfficeList, queryCorpList} from '@/api/index/login';
  import Push from 'push.js'
  import md5 from 'js-md5';
  import store from "../store/store"

  export default {
    data() {
      return {
        corp_id: '',         // 企业ID
        param_corp_id: '',   // URL参数
        emp_id: '',          // 工号
        emp_fname: '',       // 姓名
        openid: '',          // 用户openid
      }
    },
    created() {
      let corp_id = this.$route.query.corp_id;
      let openid = this.$route.query.openid;
      console.log("corp_id:" + corp_id);
      console.log("openid:" + openid);
      this.corp_id = corp_id;
      this.param_corp_id = corp_id;

      if (null != openid && openid != '' && openid != undefined) {
        this.openid = openid;
        this.$store.commit('setUser', {openid: openid});
      } else {
        this.openid = '';
        this.$store.commit('setUser', {openid: ''});
      }

    },
    mounted() {

    },
    methods: {
      userBind() {
        let corp_id = this.corp_id;
        if (corp_id.length == 0) {
          this.$vux.toast.show({
            text: '请输入企业编号',
            type: 'text',
            width: '180px',
          })
          return;
        }
        if (this.emp_id.length == 0) {
          this.$vux.toast.show({
            text: '请输入工号',
            type: 'text',
            width: '180px',
          })
          return;
        }
        if (this.emp_fname.length == 0) {
          this.$vux.toast.show({
            text: '请输入姓名',
            type: 'text',
            width: '180px',
          })
          return;
        }
        let reqdata = {
          req_src: 'pub',
          corp_id: corp_id,           // 企业ID
          emp_id: this.emp_id,        // 工号
          emp_fname: this.emp_fname,  // 姓名
          openid: this.openid         //openid
        };
        userBind(reqdata).then(res => {
          const {code, message, data} = res.data;
          if (code == 200) {
            this.$store.commit('setUser', {req_src: "pub"});
            this.$store.commit('setUser', {corp_id: this.corp_id});
            this.$store.commit('setUser', {emp_id: this.emp_id});
            this.$store.commit('setUser', {emp_fname: this.emp_fname});
            sessionStorage.setItem("corp_name", data);
            this.$router.push("/index?isAuth=N");
          } else {
            this.$vux.toast.show({
              text: message,
              type: 'text',
              width: '180px',
            })
            return;
          }
        }).catch(err => {
          console.log(err)
        });

      },
    }
  }
</script>

<style lang="less" scoped>
  .loginBox {
    background-color: #fff;

    .headBox {
      position: relative;
      padding: 60px;

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
        text-align: center;
      }

      .formList {
        // padding: 40px 0;
        height: 120px;
        padding-top: 30px;
        border-bottom: 2px solid #f0f0f0;

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
          height: 80px;
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

      .handleBox {
        padding: 40px 0;
        font-size: 34px;
        color: #798696;

        .forget {
          color: #04aaff;
        }
      }

      .loginBtn {
        margin-top: 40px;
        text-align: center;
        padding: 16px 40px;
        border-radius: 8px;
        font-size: 40px;
        color: #ffffff;
        background-color: rgb(239, 83, 80);
      }

      .loginBtn.active {
        background: linear-gradient(60deg, #98d8ff, #06a9f5);
        color: #fff;
      }

      .moreGoIn {
        text-align: center;
        color: #798696;
        font-size: 36px;
        display: block;
        margin-top: 40px;
      }
    }
  }
</style>
