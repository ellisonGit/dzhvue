<template>
  <div class="noticeList">
    <x-header :left-options="{showBack: true,backText: '钱包'}" class="headerBox"></x-header>
    <!-- 公告列表 -->
    <div class="contentBox">
      <div class="wallet">
        <div class="walletCen">
          <div class="cardNumber">
            <div class="onePass">一卡通</div>
            <div class="onePassCen">{{form.card_id}}</div>
          </div>
          <div class="balanceInfor">
            <div class="balanceInforName">余额（元）</div>
            <div class="balanceInforCen">{{form.card_balance}}</div>
          </div>
        </div>
        <div class="recharge" @click="recharge">充 值</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader} from "vux";
  import {acctQueryAcctInfo} from '@/api/index/index';

  export default {
    components: {
      XHeader
    },
    data() {
      return {
        form: {
          card_id: "", //	string	卡号
          card_balance: "", //	string	卡余额
        }

      }
    },
    mounted() {
      let reqdata = {
        req_src: this.$store.state.user.req_src,	//请求来源 默认pub
        corp_id: this.$store.state.user.corp_id,	//企业ID
        emp_id: this.$store.state.user.emp_id,	//工号
      };
      acctQueryAcctInfo(reqdata).then(res => {
        const {code, message, data} = res.data;
        const resultData = JSON.parse(data);
        if (code !== 200) {
          this.$vux.toast.show({
            text: message,
            type: 'text',
            width: '180px',
          })
          return;
        }
        if (code == 200) {
          this.$store.commit('setUser', {card_id: resultData.card_id});
          this.$store.commit('setUser', {card_balance: resultData.card_balance});
          this.form = resultData;
        }
      }).catch(err => {
        console.log(err)
      });
    },
    methods: {
      recharge() {
        this.$router.push("/rechargeAmount");
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
              font-size: 50px;
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
