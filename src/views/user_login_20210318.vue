<template>
  <div class="loginBox">
    <div class="headBox"></div>
    <div class="loginContent">
      <div class="loginTitle">欢迎登录校园一卡通</div>
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
  import {userBind,querySubOfficeList, queryCorpList} from '@/api/index/login';
  import Push from 'push.js'
  import md5 from 'js-md5';
  import store from "../store/store"

  export default {
    data() {
      return {
        corp_id: '',         // 企业ID
        sub_corp_id: '',     // 分公司企业ID
        corpList: [],        // 企业列表
        subCorpList: [],     // 分公司列表
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

      if (null != corp_id && corp_id != '' && corp_id != undefined) {
        //loginType判断是平台还是企业授权，用于解除绑定跳转  C:企业 P:平台
        this.$store.commit('setUser', {loginType: "C"});
        this.$store.commit('setUser', {corp_id: corp_id});
        this.corp_id = corp_id;
      } else {
        this.corp_id = '';
        this.$store.commit('setUser', {loginType: "P"});
        this.$store.commit('setUser', {corp_id: ''});
      }
      if (null != openid && openid != '' && openid != undefined) {
        this.openid = openid;
        this.$store.commit('setUser', {openid: openid});
      } else {
        this.openid='';
        this.$store.commit('setUser', {openid: ''});
      }

      //公众号配置的企业登录(有参数corp_id)入口，支持企业以及企业下分公司用户绑定
      if (null != corp_id && corp_id != '' && corp_id != undefined) {
        this.querySubOfficeList();

      } else {
        //公众号配置没有配置企业登录(没有带参数corp_id)，支持企业以及企业下分公司用户绑定
        //1.查询平台下所有企业,选择企业，如果不选择分公司，则是企业下用户绑定
        //2.选择企业查询出分公司，选择对应的分公司，则是分公司下用户绑定
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
      userBind() {
        let sub_corp_id = this.sub_corp_id;
        let corp_id = this.corp_id;
        if (sub_corp_id.length > 0) {
          corp_id = sub_corp_id;
        }
        if (corp_id.length == 0) {
          this.$vux.toast.show({
            text: '请选择登录企业或分公司',
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
          corp_id: corp_id,    // 企业ID
          emp_id: this.emp_id,      // 工号
          emp_fname: this.emp_fname, // 姓名
          openid: this.openid        //openid
        };
        userBind(reqdata).then(res => {
          const {code, message} = res.data;
          if (code == 200) {
            this.$store.commit('setUser', {req_src: "pub"});
            this.$store.commit('setUser', {corp_id: this.corp_id});
            this.$store.commit('setUser', {emp_id: this.emp_id});
            this.$store.commit('setUser', {emp_fname: this.emp_fname});
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
