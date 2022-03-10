<template>
  <div class="noticeList">
    <x-header :left-options="{showBack: true,backText: '账户信息'}" class="headerBox"></x-header>
    <!-- 公告列表 -->
    <div class="contentBox">
      <div class="userinfo">
        <div class="userinfoCen">
          <div class="userinfoImg">
            <img src="../assets/images/tabImg/userImg.png">
          </div>
          <div class="userinfos">
            <h5>{{emp_fname}}</h5>
            <p>{{phone}}</p>
          </div>
        </div>
        <div class="userinfoRout">
          <!--<img src="../assets/images/tabImg/nextStep.png">-->
        </div>
      </div>
      <div class="accInfo">
        <ul>
          <li>
            <div class="accinfoName">学号</div>
            <div class="accinfoCen">{{emp_id}}</div>
          </li>
          <li>
            <div class="accinfoName">性别</div>
            <div class="accinfoCen">{{sex}}</div>
          </li>
          <li>
            <div class="accinfoName">卡号</div>
            <div class="accinfoCen">{{card_id}}</div>
          </li>
          <li>
            <div class="accinfoName">卡片状态</div>
            <template v-if="this.card_state == 1">
              <div class="accinfoCen">正常</div>
            </template>
            <template v-if="this.card_state == 2">
              <div class="accinfoCen">挂失</div>
            </template>
            <template v-if="this.card_state == 5">
              <div class="accinfoCen">注销</div>
            </template>
            <template v-if="this.card_state == 7">
              <div class="accinfoCen">挂失补卡</div>
            </template>

          </li>
          <li>
            <div class="accinfoName">卡片有效期</div>
            <div class="accinfoCen">{{card_end_date}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader} from "vux";
  import {acctQueryAcctInfo} from '@/api/index/index';
  import Push from 'push.js'

  export default {
    components: {
      XHeader
    },
    data() {
      return {
        corp_id: '', //	String	企业ID
        emp_id: '', //	string	工号
        card_id: '', //	string	卡号
        emp_fname: '', //	String	姓名
        depart_id: '', //	string	部门编号
        sex: '', //	string	性别 :男、女、未知’
        idcard: '', //	String	身份证号码
        phone: '', //	string	本人电话
        hire_date: '', //	string	入职日期
        issue_date: '', //	String	发卡日期
        card_state: '', //	int	‘卡片状态 1:正常；2：挂失；5：注销；7：挂失补卡
        card_end_date: '', //	string	卡片有效期
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
          this.corp_id = resultData.corp_id; //	String	企业ID
          this.emp_id = resultData.emp_id; //	string	工号
          this.card_id = resultData.card_id; //	string	卡号
          this.emp_fname = resultData.emp_fname; //	String	姓名
          this.depart_id = resultData.depart_id; //	string	部门编号
          this.sex = resultData.sex; //	string	性别 :男、女、未知’
          this.idcard = resultData.idcard; //	String	身份证号码
          this.phone = resultData.phone; //	string	本人电话
          this.hire_date = resultData.hire_date; //	string	入职日期
          this.issue_date = resultData.issue_date; //	String	发卡日期
          this.card_state = resultData.card_state; //	int	‘卡片状态 1:正常；2：挂失；5：注销；7：挂失补卡
          this.card_end_date = resultData.card_end_date; //	string	卡片有效期
        }
      }).catch(err => {
        console.log(err)
      });
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
