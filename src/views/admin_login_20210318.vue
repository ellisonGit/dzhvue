<template>
  <div class="loginBox">
    <div class="headBox"></div>
    <div class="loginContent">
      <div class="loginTitle">欢迎登录{{loginTitle}}管理系统</div>
      <div class="formList flex" v-if="corpList.length>0">
        <div class="leftHint" style="display: none"></div>
        <select v-model="corp_id" class="inputBox" @change="querySubOfficeList">
          <option value="">请选择企业</option>
          <option v-for="item in corpList"
                  :key="item.corp_id"
                  :label="item.corp_name"
                  :value="item.corp_id"></option>
        </select>
      </div>
      <div class="formList flex" v-if="subCorpList.length>0">
        <div class="leftHint" style="display: none"></div>
        <select v-model="sub_corp_id" class="inputBox">
          <option value="">请选择分公司</option>
          <option v-for="item in subCorpList"
                  :key="item.corp_id"
                  :label="item.corp_name"
                  :value="item.corp_id"></option>
        </select>
      </div>
      <div class="formList flex">
        <div class="leftHint" style="display: none"></div>
        <input type="text" class="inputBox" v-model="login_name" placeholder="请输入登录账号"/>
      </div>
      <div class="formList flex">
        <div class="leftHint" style="display: none"></div>
        <input type="passWord" class="inputBox" v-model="login_pwd" placeholder="请输入密码"/>
      </div>
      <div class="loginBtn" @click="adminBind()">登录</div>
      <router-link to class="moreGoIn" style="display: none">更多登录方式</router-link>
    </div>
  </div>
</template>

<script>
  import {adminBindLogin, querySubOfficeList, queryCorpList} from '@/api/index/login';
  import md5 from 'js-md5';
  import store from "../store/store"

  export default {
    data() {
      return {
        login_name: '',
        login_pwd: '',
        loginTitle: '',
        corp_id: '',
        sub_corp_id: '',
        corpList: [],
        subCorpList: []
      }
    },
    created() {
      let corp_id = this.$route.query.corp_id;
      this.corp_id = corp_id
      console.log("corp_id:" + corp_id);

      //公众号配置的是企业管理登录入口，支持企业，分公司管理员登录
      if (null != corp_id && corp_id != '' && corp_id != undefined) {
        this.loginTitle = "企业"
        sessionStorage.setItem("corp_id", corp_id);
        this.querySubOfficeList();

      } else {
        //公众号配置的管理登录入口，支持平台，企业，分公司登录
        //如果即不选择企业，也不选择分公司，则是平台管理员登录
        //如果选择企业，不选择分公司，则是企业管理员登录
        //如果选择企业，同时选择分公司，则是分公司管理员登录
        this.loginTitle = "平台"
        this.corp_id = ''
        sessionStorage.setItem("corp_id", '');

        queryCorpList({}).then(res => {
          const {data, code, message} = res.data;
          const resultData = JSON.parse(data);
          if (code !== 200) {
            this.$vux.toast.show({
              text: message,
              type: 'text',
              width: '180px',
            })
            return;
          }
          if (resultData.length > 0) {
            this.corpList = resultData;
          }

        }).catch(err => {
          console.log(err)
        });

      }

    },
    mounted() {
    },
    methods: {
      // 管理员绑定
      adminBind() {
        let sub_corp_id = this.sub_corp_id;
        let corp_id = this.corp_id;
        if (sub_corp_id.length > 0) {
          corp_id = sub_corp_id;
        }
        if (this.login_name.length == 0) {
          this.$vux.toast.show({
            text: '请输入登录名',
            type: 'text',
            width: '180px',
          })
          return;
        }
        if (this.login_pwd.length == 0) {
          this.$vux.toast.show({
            text: '请输入登录密码',
            type: 'text',
            width: '180px',
          })
          return;
        }

        let reqData = {
          corp_id: corp_id,
          login_name: this.login_name,
          login_pwd: md5(this.login_pwd)
        };
        adminBindLogin(reqData).then(res => {
          const {code, message, data} = res.data;
          if (code == 200) {
            const resultData = JSON.parse(data);
            sessionStorage.setItem("corp_id", corp_id);
            sessionStorage.setItem("sub_corp_id", sub_corp_id);
            sessionStorage.setItem("login_name", this.login_name);
            sessionStorage.setItem("corp_name", resultData.corp_name);

            this.$store.commit('setUser', {login_name: this.login_name});
            this.$store.commit('setUser', {login_pwd: this.login_pwd});
            this.$store.commit('setUser', {adminName: resultData.name});
            this.$store.commit('setUser', {adminPhone: resultData.phone});
            this.$store.commit('setUser', {adminEmail: resultData.email});
            this.$router.push("/adminIndex");
          } else {
            this.$vux.toast.show({
              text: message,
              type: 'text',
              width: '180px',
            })
            sessionStorage.setItem("corp_id", '');
            return;
          }
        }).catch(err => {
          this.$vux.toast.show({
            text: err,
            type: 'text',
            width: '180px',
          })
          return;
          console.log(err)
        });
      },

      //查询分公司
      querySubOfficeList() {
        this.subCorpList = [];
        this.sub_corp_id='';
        let reqData = {
          corp_id: this.corp_id
        };
        querySubOfficeList(reqData).then(res => {
          const {data, code, message} = res.data;
          const resultData = JSON.parse(data);
          if (code !== 200) {
            this.$vux.toast.show({
              text: message,
              type: 'text',
              width: '180px',
            })
            return;
          }
          if (resultData.length > 0) {
            this.subCorpList = resultData;
          }

        }).catch(err => {
          console.log(err)
        });
      }


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
