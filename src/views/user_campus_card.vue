<template>
  <div class="noticeList">
    <x-header :left-options="{showBack: true,backText: '钱包'}" class="headerBox"></x-header>
    <!-- 公告列表 -->
    <div class="contentBox">
      <div class="wallet">
        <div class="walletCen">
          <div class="cardNumber">
            <div class="onePass">一卡通</div>
            <div class="onePassCen">{{card_id}}</div>
          </div>
          <div class="balanceInfor">
            <div class="balanceInforName">状态</div>
            <div class="balanceInforCen">{{card_state}}</div>
          </div>
        </div>
        <!--<div class="recharge">解除绑定</div>-->
        <div class="reportLoss" @click="reportLoss" >卡片挂失</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader} from "vux";
  import {acctCardLost, acctQueryAcctInfo} from '@/api/index/index';
  import Push from 'push.js'

  export default {
    components: {
      XHeader
    },
    data() {
      return {
        card_id: '', //	string	卡号
        card_state: '', //	int	‘卡片状态 1:正常；2：挂失；5：注销；7：挂失补卡
      }
    },
    mounted() {
      let getaData = {
        req_src: this.$store.state.user.req_src,	//请求来源 默认pub
        corp_id: this.$store.state.user.corp_id,	//企业ID
        emp_id: this.$store.state.user.emp_id,	//工号
      };
      acctQueryAcctInfo(getaData).then(res => {
        const {code, message, data} = res.data;
        const resultData = JSON.parse(data);
        if (code == 200) {
          this.card_id = resultData.card_id; //	string	卡号
          if (resultData.card_state == 0) {
            this.card_state = "初始";
          }else if (resultData.card_state == 1) {
            this.card_state = "正常";
          } else if (resultData.card_state == 2) {
            this.card_state = "挂失";
          } else if (resultData.card_state == 3) {
            this.card_state = "作废";
          }else if (resultData.card_state == 4) {
            this.card_state = "删除";
          }else if (resultData.card_state == 5) {
            this.card_state = "注销";
          } else if (resultData.card_state == 7) {
            this.card_state = "挂失补卡";
          }else if (resultData.card_state == 9) {
            this.card_state = "冻结";
          }else if (resultData.card_state == 10) {
            this.card_state = "无卡注销";
          }
        }
      }).catch(err => {
        console.log(err)
      });
    },
    methods: {
      /** 用户解绑 **/
      reportLoss() {
        let getaData = {
          req_src: this.$store.state.user.req_src,	//请求来源 默认pub
          corp_id: this.$store.state.user.corp_id,	//企业ID
          emp_id: this.$store.state.user.emp_id,	//工号
          emp_fname: this.$store.state.user.emp_fname,	//姓名
        };
        acctCardLost(getaData).then(res => {
          const {code, message} = res.data;
          if (code !== 200) {
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
      pushMessage(message) {
        Push.create("消息通知的标题", {
          body: message,
          requireInteraction: true,
          //icon: '/icon.png',
          timeout: 600000,
        });
      },
    }
  }
</script>

<style lang="less" scoped>
  .noticeList {
    /deep/ .headerBox {
      background-color: #fff;
      border-bottom: 1px solid #eee;

      .vux-header-left {
        left: 24px;

        .vux-header-back {
          color: #000;
        }

        .left-arrow:before {
          border-color: #000;
        }
      }
    }

    // 列表
    .contentBox {
      padding: 0 55px;

      .wallet {
        width: 100%;

        .walletCen {
          width: 640px;
          height: 320px;
          margin: 0 auto;
          margin-top: 55px;
          border-radius: 16px;
          position: relative;
          background: linear-gradient(0deg, #37474F, #607D8B);

          .cardNumber {
            overflow: hidden;
            clear: both;
            line-height: 1;
            padding: 30px 25px 0 25px;

            .onePass {
              font-size: 30px;
              color: #FFFFFF;
              float: left;
            }

            .onePassCen {
              font-size: 30px;
              color: #FFFFFF;
              float: right;
            }
          }

          .balanceInfor {
            position: absolute;
            bottom: 48px;
            left: 26px;

            .balanceInforName {
              font-size: 24px;
              color: #FFFFFF;
            }

            .balanceInforCen {
              font-size: 32px;
              color: #FFFFFF;
            }
          }
        }

        .recharge {
          width: 640px;
          height: 100px;
          margin: 0 auto;
          font-size: 40px;
          color: #FFFFFF;
          background: #EF5350;
          border-radius: 8px;
          margin-top: 118px;
          line-height: 100px;
          text-align: center;
        }

        .reportLoss {
          width: 640px;
          height: 100px;
          margin: 0 auto;
          font-size: 40px;
          /*color: #3D3D3D;*/
          /*background: #EDEDED;*/
          color: #FFFFFF;
          background: #EF5350;
          border-radius: 8px;
          margin-top: 118px;
          line-height: 100px;
          text-align: center;
        }
      }
    }

    // 公告为空样式
    .emptyBox {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
    }
  }

</style>
