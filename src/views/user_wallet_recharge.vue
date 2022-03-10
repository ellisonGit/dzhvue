<template>
  <div class="noticeList">
    <x-header :left-options="{showBack: true,backText: backName}" class="headerBox"></x-header>
    <div class="recharg">
      <div class="cardInfo">
        <div class="infoLi">
          <div class="liName">卡号：</div>
          <div class="liCen">{{form.card_id}}</div>
        </div>
        <div class="infoLi">
          <div class="liName">余额：</div>
          <div class="liCen">{{form.card_balance}}</div>
        </div>
      </div>
      <div class="payAmount">
        <div class="payAmount_num">
          <span>￥</span>
          <input v-model="form.payMoney" type="number" pattern="\d*" oninput="if(value.length>6)value=value.slice(0,6)"
                 placeholder=""/>
          <!--<div id="payPrice"></div>-->
        </div>
      </div>
      <p class="payTip">温馨提示：为确保支付安全，请先确认卡号与余额信息是否正确</p>
      <x-button action-type="button" class="payBut" @click.native="rechargeAmount">确认付款</x-button>
    </div>
  </div>
</template>

<script>
  import {XHeader, XButton, XInput} from "vux";
  import {wxJspay} from '@/api/index/index';

  export default {
    name: "rechargeAmount",
    components: {
      XHeader,
      XButton,
      XInput,
    },
    data() {
      return {
        backName: "",
        form: {
          card_id: "",
          card_balance: "0.00",
          payMoney: "",
          corp_id: "",
          emp_id: "",
          openid: ""
        },

      };
    },
    mounted() {
      this.form.corp_id = this.$store.state.user.corp_id;
      this.form.emp_id = this.$store.state.user.emp_id;
      this.form.card_id = this.$store.state.user.card_id;
      this.form.card_balance = this.$store.state.user.card_balance;
      this.form.openid = this.$store.state.user.openid;
    },
    methods: {
      rechargeAmount() {
        let payMoney = this.form.payMoney
        if (payMoney.length == 0) {
          this.$vux.toast.show({
            text: '请输入金额',
            type: 'text',
            width: '180px',
          });
          return;
        }

        let reqData = {
          payMoney: this.form.payMoney,
          corp_id: this.form.corp_id,
          emp_id: this.form.emp_id,
          openId: this.form.openid
        };
        wxJspay(reqData).then(res => {
          const {data, code, message} = res.data;
          if (code !== 200) {
            this.$vux.toast.show({
              text: message,
              type: 'text',
              width: '180px',
            })
            return;
          }
          const resultData = JSON.parse(JSON.parse(data));
          const result = resultData.pay_info;
          this.pay_info = result
          if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
              document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
            }
          } else {
            this.onBridgeReady();
          }

        }).catch(err => {
          console.log(err)
        });
      },

      onBridgeReady() {
        let that = this;
        let payInfo = JSON.parse(that.pay_info);
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId": payInfo.appId,
            "timeStamp": payInfo.timeStamp,
            "nonceStr": payInfo.nonceStr,
            "package": payInfo.package,
            "signType": payInfo.signType,
            "paySign": payInfo.paySign
          },
          function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              alert("支付成功");
            } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
              alert("用户取消支付");
            } else {
              alert("支付失败")
            }
          });

      },
    }
  }
</script>

<style lang="less" scoped>
  .noticeList {
    width: 100%;
    height: 100%;
    position: relative;

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

    .recharg {
      width: 100%;
      position: absolute;
      top: 100px;
      left: 0;
      bottom: 0;

      .cardInfo {
        padding: 20px;

        .infoLi {
          width: 100%;
          height: auto;
          overflow: hidden;
          clear: both;
          display: flex;
          padding: 5px 0;

          .liName {
            float: left;
            width: 100px;
            font-size: 28px;
            color: #3E3E3E;
            line-height: 1;
            font-weight: 400;
            text-align: left;
          }

          .liCen {
            float: right;
            font-size: 32px;
            color: #3E3E3E;
            line-height: 1;
            font-weight: 400;
            text-align: left;
            flex: 1;
          }
        }
      }

      .payAmount {
        padding: 20px;
        height: 100px;
        margin-top: 64px;
        line-height: 80px;

        .payAmount_num {
          width: 100%;
          height: 100%;
          border-bottom: 1px solid rgba(0, 0, 0, 1);

          span {
            width: 50px;
            float: left;
            font-size: 40px;
            font-weight: bold;
          }

          input {
            float: left;
            border: none;
            font-size: 40px;
            font-weight: bold;
            color: rgba(31, 31, 31, 1);
            outline: none;
            line-height: 80px;
            background-color: #F5F5F5;
          }

          div {
            float: right;
            width: calc(100% - 50px);
            height: 100%;
            line-height: 80px;
            border: none;
            font-size: 28px;
            font-weight: bold;
            color: rgba(31, 31, 31, 1);
            text-align: right;
          }
        }
      }

      .payTip {
        padding: 20px;
        font-size: 20px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 30px;
      }

      .payBut {
        width: 80%;
        height: 110px;
        margin: 0 auto;
        border-radius: 4px;
        font-size: 40px;
        font-weight: bold;
        line-height: 110px;
        text-align: center;
        margin-top: 100px;
        color: rgba(255, 255, 255, 1);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background: rgba(41, 121, 255, 1);
      }


    }
  }
</style>
