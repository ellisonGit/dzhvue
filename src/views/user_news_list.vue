<template>
  <div class="noticeList">
    <x-header :left-options="{showBack: true,backText: '消息'}" class="headerBox"></x-header>
    <!-- 公告为空 -->
    <img v-if="newsList.length == 0" src='../assets/images/nullmaterial08.png' class='emptyBox'/>
    <!-- 公告列表 -->
    <div class="contentBox">
      <div class='noticeBox' v-for="(item, index2) in newsList" :key="index2">
        <div class="newsCen">
          <div class="newsCenTop">
            <div class="newsCenTopL">
              <div class="newsCenIcon">
                <img :src="item.imgUrl">
              </div>
              <div class="newsCenTitle">{{item.noticeTitle}}</div>
            </div>
            <div class="newsCenDate">{{item.date}}</div>
          </div>
          <div class="newsCenBut">
            <div class="newsCenNum">{{item.amount}}</div>
            <div class="newsCenRem">{{item.details}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader} from "vux";

  export default {
    components: {
      XHeader
    },
    data() {
      return {
        newsList: [
          {
            date: '2020-09-08 11:30:23',
            noticeTitle: '通行-入校',
            amount: "+1",
            details: '通行登记',
            imgUrl: '../assets/images/tabImg/recharge.png'
          },
          {
            date: '2020-09-08 11:30:23',
            noticeTitle: '充值到账',
            amount: "+10000.00",
            details: '充值成功',
            imgUrl: '../assets/images/tabImg/recharge.png'
          },
          {
            date: '2020-09-08 11:30:23',
            noticeTitle: '消费',
            amount: "-10000.00",
            details: '交易成功',
            imgUrl: '../assets/images/tabImg/recharge.png'
          },
          {
            date: '2020-09-08 11:30:23',
            noticeTitle: '卡充值',
            amount: "+10000.00",
            details: '通行登记',
            imgUrl: '../assets/images/tabImg/recharge.png'
          }
        ]
      }
    },
    mounted() {

    },
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
      .noticeBox {
        align-items: center;
        padding: 30px 0;
        border-bottom: 1px solid #eee;

        .newsCen {
          padding: 0 48px;

          .newsCenTop {
            display: flex;
            overflow: hidden;
            clear: both;

            .newsCenTopL {
              float: left;
              display: flex;
              flex: 1;

              .newsCenIcon {
                margin-right: 16px;

                img {
                  width: 36px;
                  height: 36px;
                  display: inline-block;
                }
              }

              .newsCenTitle {
                flex: 1;
                font-size: 26px;
                color: #3D3D3D;
              }
            }

            .newsCenDate {
              float: right;
              width: 260px;
              font-size: 24px;
              color: #7A7A7A;
              text-align: right;
            }
          }

          .newsCenBut {
            width: 100%;

            .newsCenNum {
              font-size: 32px;
              color: #1F1F1F;
            }

            .newsCenRem {
              font-size: 22px;
              color: #7A7A7A;
            }
          }
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
