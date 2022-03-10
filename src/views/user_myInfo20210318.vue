<template>
  <!-- 我的页面 -->
  <div class="mineBox">
    <div class="mt_145 plr_30">
      <!-- 个人信息 -->
      <router-link to="/accountInfo" class="flex_sb cellList">
        <div class="userinfo">
          <div class="userinfoCen">
            <div class="userinfoImg">
              <img src="../assets/images/tabImg/userImg.png">
            </div>
            <div class="userinfos">
              <h5>{{form.emp_fname}}</h5>
              <p>{{form.emp_id}}</p>
            </div>
          </div>
          <div class="userinfoRout">
            <img src="../assets/images/tabImg/nextStep.png">
          </div>
        </div>
      </router-link>
      <!-- 钱包 -->
      <router-link to="/wallet" class="flex_sb cellList nextStep">
        <div class="listCen">
          <div class="myList_titel">
            <img src="../assets/images/tabImg/wallet.png"/>
            <span class="fs_32 listName">钱包</span>
            <span class="amount">￥{{form.card_balance}}</span>
          </div>
          <div class="userinfoRout">
            <img src="../assets/images/tabImg/nextStep.png">
          </div>
        </div>
      </router-link>
      <!-- 校园一卡通 -->
      <router-link to="/campusCard" class="flex_sb cellList">
        <div class="listCen">
          <div class="myList_titel">
            <img src="../assets/images/tabImg/onePass.png"/>
            <span class="fs_32 listName">校园一卡通</span>
          </div>
          <div class="userinfoRout">
            <img src="../assets/images/tabImg/nextStep.png">
          </div>
        </div>
      </router-link>
      <div class="flex_sb cellList userUntie" @click="userUntie">用户解绑</div>

    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
  import TabBar from "../components/tabBar";
  import {acctUserUnBind, acctQueryAcctInfo} from '@/api/index/index';
  // import {userInfo, acctUserUnBind} from '@/api/index/index';
  import Push from 'push.js'
  import store from "../store/store";

  export default {
    components: {
      TabBar,
    },
    data() {
      return {
        form: {
          emp_fname: "",
          emp_id: "",
          card_balance: "",
        },
        userId: '',
        userInfo: '',
        vipInfo: '',
      }
    },
    mounted() {
      this.form.emp_fname = this.$store.state.user.emp_fname;
      this.form.emp_id = this.$store.state.user.emp_id;
      let getaData = {
        req_src: this.$store.state.user.req_src,	//请求来源 默认pub
        corp_id: this.$store.state.user.corp_id,	//企业ID
        emp_id: this.$store.state.user.emp_id,	//工号
      };
      acctQueryAcctInfo(getaData).then(res => {
        const {code, message, data} = res.data;
        const resultData = JSON.parse(data);
        if (code !== 200) {
          this.$vux.toast.show({
            text: message,
            type: 'text',
            width: '180px',
          });
          return;
        }
        if (code == 200) {
          this.$store.commit('setUser', {card_id: resultData.card_id});
          this.$store.commit('setUser', {card_balance: resultData.card_balance});
          this.form.card_balance = resultData.card_balance;
        }
      }).catch(err => {
        console.log(err)
      });
    },
    methods: {
      /** 用户解绑 **/
      userUntie() {
        let getaData = {
          req_src: this.$store.state.user.req_src,	//请求来源 默认pub
          corp_id: this.$store.state.user.corp_id,	//企业ID
          emp_id: this.$store.state.user.emp_id,	//工号
          emp_fname: this.$store.state.user.emp_fname,	//姓名
        };
        acctUserUnBind(getaData).then(res => {
          const {code, message} = res.data;
          if (code == 200) {
            let loginType = this.$store.state.user.loginType;
            let corp_id = this.$store.state.user.corp_id;
            if(loginType=='C'){
              location.href = "http://yslduozuhupt.gdeastriver.com/trans/api/pay/wxAuthorize?corp_id=" + corp_id;
            }else{
              location.href = "http://yslduozuhupt.gdeastriver.com/trans/api/pay/wxAuthorize";
            }
            // this.$router.push("/");
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
      }
    }
  }
</script>

<style lang="less" scoped>
  .mineBox {
    padding-bottom: 120px;

    .cellList {
      color: currentColor;
      padding: 20px;
      background-color: #FFFFFF;

      .userinfo {
        width: 100%;
        display: flex;
        margin-top: 24px;

        .userinfoCen {
          display: flex;
          flex: 1;

          .userinfoImg {
            margin-right: 25px;

            img {
              width: 80px;
              height: 80px;
              margin: 20px 0;
              display: inline-block;
            }
          }

          .userinfos {
            flex: 1;
            margin: 20px 0;

            h5 {
              font-size: 30px;
              color: #3E3E3E;
              line-height: 1;
              margin-top: 9px;
              font-weight: 400;
            }

            p {
              font-size: 24px;
              color: #3D3D3D;
              line-height: 1;
              padding-top: 16px;
            }
          }
        }

        .userinfoRout {
          width: 30px;

          img {
            width: 18px;
            height: 28px;
            margin: 46px 6px;
          }
        }
      }

      .listCen {
        width: 100%;
        display: flex;

        .myList_titel {
          flex: 1;
          align-items: center;

          img {
            width: 36px;
            height: 36px;
            display: inline-block;
            margin: 42px 25px 42px 0;
            float: left;
          }

          .fs_32 {
            font-size: 28px;
            color: #3D3D3D;
          }

          .listName {
            line-height: 120px;
            float: left;
          }

          .amount {
            float: right;
            font-size: 36px;
            color: #3D3D3D;
            margin-right: 28px;
            line-height: 120px;
          }
        }

        .userinfoRout {
          width: 30px;

          img {
            width: 18px;
            height: 28px;
            margin: 46px 6px;
          }
        }
      }

      .user_head {
        width: 124px;
        height: 124px;
        margin-right: 10px;
      }
    }

    .nextStep {
      margin-bottom: 20px;
      border-top: 1px solid #E6E6E6;
    }

    .userUntie {
      margin: 20px;
      line-height: 40px;
      text-align: center;
      color: #FFFFFF;
      display: block;
      background-color: #42a5f5;
    }
  }
</style>
