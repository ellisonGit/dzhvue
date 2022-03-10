<template>
  <div class="indexBox">
    <div class="topbg">
<!--      <img src="../assets/images/admin/banner.png" alt/>-->
    </div>
    <!-- 每日汇总 -->
    <div class="dailySummary">
      <div class="summaryTop" @click="selectDate">
        <h5>每日汇总（元）<span class="summaryDate">{{start_date}} 至 {{end_date}}</span></h5>
        <calendar v-if="show"
                  :minDate="minDate"
                  :show.sync="show"
                  :defaultDate="defaultDate"
                  :mode="mode"
                  :closeByClickMask="closeByClickMask"
                  @change="onChange"/>
      </div>

      <div class="summaryData">
        <ul>
          <!--            <router-link to="/consumption">-->
          <router-link :to="{path: 'consumption', query: {start_date: start_date,end_date: end_date }}">
            <li>
              <div class="summaryNum">{{form.dayMealSum}}</div>
              <div class="summaryName">消费汇总</div>
            </li>
          </router-link>
          <router-link :to="{path: 'recharge', query: {start_date: start_date,end_date: end_date }}">
            <li>
              <div class="summaryNum">{{form.dayMchargeSum}}</div>
              <div class="summaryName">充值汇总</div>
            </li>
          </router-link>
          <router-link :to="{path: 'terminal', query: {start_date: start_date,end_date: end_date }}">
            <li>
              <div class="summaryNum">{{form.dayTermSum}}</div>
              <div class="summaryName">终端消费汇总</div>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
    <!-- 菜单 -->
    <div class="menuList">
      <h5>明细报表</h5>
      <div class="menuData">
        <router-link to="/dataDetails">
          <div class="menu">
            <div class="menuIcon">
              <img src="../assets/images/admin/restaurant.png" alt class="buyCourse"/>
            </div>
            <span>餐厅报表</span>
          </div>
        </router-link>
        <router-link to="/onePass">
          <div class="menu">
            <div class="menuIcon">
              <img src="../assets/images/admin/store.png" alt class="buyCourse"/>
            </div>
            <span>卡余额信息</span>
          </div>
        </router-link>
        <router-link to="/consumptionReport">
          <div class="menu">
            <div class="menuIcon">
              <img src="../assets/images/admin/consumption.png" alt class="buyCourse"/>
            </div>
            <span>消费记录</span>
          </div>
        </router-link>
        <router-link to="/topupReport">
          <div class="menu">
            <div class="menuIcon">
              <img src="../assets/images/admin/recharge.png" alt class="buyCourse"/>
            </div>
            <span>充值记录</span>
          </div>
        </router-link>
        <router-link to="/addPurOrder">
          <div class="menu">
            <div class="menuIcon">
              <img src="../assets/images/tabImg/passRecord.png" alt class="buyCourse"/>
            </div>
            <span>添加采购</span>
          </div>
        </router-link>
        <router-link to="/purSumReport" v-if="sub_corp_id==null || sub_corp_id==''">
          <div class="menu">
            <div class="menuIcon">
              <img src="../assets/images/tabImg/attendanceRecord.png" alt class="buyCourse"/>
            </div>
            <span>采购报表</span>
          </div>
        </router-link>
      </div>
    </div>
    <TabBars></TabBars>
  </div>
</template>

<script>
  import {Tab, TabItem, Swiper, Search, SwiperItem} from "vux";
  import TabBars from "../components/tabBars";
  /*import {calendar} from 'vue-mobile-calendar'*/
  import {queryHomeSum} from '@/api/index/manager';

  export default {
    components: {
      Tab,
      TabItem,
      TabBars,
      Swiper,
      Search,
      SwiperItem
    },
    data() {
      return {
        form: {
          dayMealSum: "",
          dayMchargeSum: "",
          dayTermSum: "",
        },
        courseList: [],
        code: '',
        vipInfo: '',
        infoLists: [],
        tabIndex: 1,
        mode: 'multiple',
        minDate: "",//设置过期时间为当天
        show: false,
        start_date: '',
        end_date: '',
        defaultDate: "",
        closeByClickMask: true,
        corp_id:'',
        sub_corp_id:''

      };
    },
    mounted() {
      this.sub_corp_id = sessionStorage.getItem("sub_corp_id");
      this.corp_id = sessionStorage.getItem("corp_id");
      let getaData = {
        start_date: this.getData(),
        end_date: this.getData(),
      };
      this.start_date = this.getData();
      this.end_date = this.getData();
      this.defaultDate = this.getData();
      this.queryHomeSumList(getaData);
    },
    methods: {
      /** 获取当天日期 **/
      getData() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        return year + "-" + month + "-" + day;
      },
      /** 获取每日汇总数据 **/
      queryHomeSumList(getaData) {
        queryHomeSum(getaData).then(res => {
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
          const {result} = resultData;
          this.form = resultData;
          this.show = false;
        }).catch(err => {
          console.log(err)
        });
      },
      selectDate() {
        this.show = true;
      },
      onChange(dates) {
        if (dates.length == 2) {
          if (dates[0] < dates[1]) {
            this.start_date = dates[0].format('YYYY-MM-DD')
            this.end_date = dates[1].format('YYYY-MM-DD')
          } else {
            this.start_date = dates[1].format('YYYY-MM-DD')
            this.end_date = dates[0].format('YYYY-MM-DD')
          }
          dates.splice(1)
          this.queryHomeSumList({
            start_date: this.start_date,
            end_date: this.end_date,
          })
        }

      },
    }
  }
</script>

<style lang="less" scoped>
  .indexBox {
    /*padding-bottom: 120px;*/

    .searchBox {
      /deep/ .weui-search-bar {
        position: absolute;
        padding: 8px 10px;
        left: 20px;
        right: 20px;
        top: 0;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        box-sizing: border-box;
        background-color: transparent;
      }

      /deep/ .weui-search-bar:before {
        content: none;
      }

      /deep/ .weui-search-bar::after {
        content: none;
      }

      /deep/ .weui-search-bar__cancel-btn {
        color: #fff;
      }
    }

    .topbg {
      width: 100%;
      height: auto;

      img {
        width: 100%;
        height: 400px;
      }
    }

    .logo {
      margin: 80px 40px 0;

      img {
        width: 64px;
        height: 34px;
      }

      .name {
        color: #fff;
        margin-left: 16px;
        font-size: 46px;
      }

      .English {
        display: block;
        color: #fff;
        font-size: 18px;
        margin-top: 10px;
      }
    }

    .bannerBox {
      margin: 20px 40px;
      border-radius: 40px;

      /deep/ .vux-swiper {
        height: 280px !important;
      }

      /deep/ .vux-img {
        border-radius: 40px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }

    /** 汇总 **/

    .dailySummary {
      margin: 0 25px;

      .summaryTop {
        width: 100%;
        height: auto;
        overflow: hidden;
        clear: both;

        h5 {
          font-size: 32px;
          color: #1F1F1F;
          line-height: 1;
          text-align: left;
          padding-top: 47px;
          padding-bottom: 63px;
          /*float: left;*/

          .summaryDate {
            float: right;
            text-align: center;
          }
        }

        .summaryTime {
          width: 400px;
          height: 50px;
          float: right;
          font-size: 32px;
          margin-top: 47px;
          display: inline-block;
        }
      }

      .summaryData {
        width: 100%;

        ul {
          width: 100%;
          overflow: hidden;
          clear: both;

          li {
            width: 33.33%;
            float: left;
            flex-wrap: nowrap;
            list-style-type: none;

            .summaryNum {
              font-size: 32px;
              color: #3D3D3D;
              line-height: 1;
              text-align: center;
              padding-bottom: 23px;
            }

            .summaryName {
              font-size: 24px;
              color: #7A7A7A;
              text-align: center;
            }
          }
        }
      }
    }

    /* 菜单 */

    .menuList {
      padding: 0 24px;

      &.vux-tab-wrap {
        height: 60px;
      }

      /deep/ .vux-tab-container {
        height: 120px;

        .vux-tab {
          height: 120px;

          .vux-tab-item {
            line-height: 1.1;
            background: none;
          }
        }
      }

      h5 {
        width: 100%;
        font-size: 32px;
        color: #1F1F1F;
        line-height: 1;
        text-align: left;
        padding-top: 47px;
        padding-bottom: 49px;
      }

      .menuData {
        width: 100%;

        .menu {
          width: calc(25% - 1px);
          display: inline-block;
          text-align: center;
          padding-top: 20px;
          position: relative;
          color: #3D3D3D;
          flex-wrap: nowrap;

          .menuIcon {
            height: auto;
            line-height: 1px;

            img {
              width: 96px;
              height: 96px;
              display: inline-block;
            }
          }

          span {
            font-size: 30px;
          }
        }
      }
    }
  }
</style>
