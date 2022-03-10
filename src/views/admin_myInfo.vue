<template>
  <div class="content">
    <div class="nav-top">
      <van-nav-bar title="我的基本信息" left-arrow @click-left="onClickLeft()"/>
    </div>
    <div class="contentBox">
      <div class="accInfo">
        <ul>
          <li>
            <van-cell title="姓名" :value="name"/>
          </li>
          <li>
            <van-cell title="联系方式" :value="phone"/>
          </li>
          <li>
            <van-cell title="邮箱" :value="email"/>
          </li>
          <li v-if="(sub_corp_id!=null && sub_corp_id!='') || (corp_id!=null && corp_id!='')">
            <van-cell title="我的采购订单" is-link to="myPurOrder"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader} from "vux";
  import Vue from 'vue';
  import {Popup, Cell, Row, Col, Calendar} from "vant";
  import {Card} from 'vant';

  export default {
    components: {
      XHeader
    },
    data() {
      return {
        name: "",
        phone: "",
        email: '',
        sub_corp_id:'',
        corp_id:''
      }
    },
    mounted() {
      this.name = this.$store.state.user.adminName;
      this.phone = this.$store.state.user.adminPhone;
      this.email = this.$store.state.user.adminEmail;
      this.sub_corp_id = sessionStorage.getItem("sub_corp_id");
      this.corp_id = sessionStorage.getItem("corp_id");
    },
    methods: {
      //返回
      onClickLeft() {
        this.$router.push('/adminIndex')
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
      padding: 0 24px;

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
              margin-top: 30px;
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

      .accInfo {
        width: 100%;

        ul {
          li {
            list-style-type: none;
            overflow: hidden;
            clear: both;
            font-size: 28px;
            color: #3D3D3D;
            line-height: 120px;
            border-top: 1px solid #E6E6E6;

            .accinfoName {
              float: left;
            }

            .accinfoCen {
              float: right;
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
