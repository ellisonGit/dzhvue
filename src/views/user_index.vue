<template>
  <div class="indexBox">
    <div class="topbg">
<!--      <img src="../assets/images/bg01.png" alt/>-->
    </div>
<!--    <swiper :list="goodsImgList" :auto="true" :interval="3000" class="bannerBox"></swiper>-->
    <!-- 菜单 -->
    <div class="menuList">
      <div class="menuData">
        <router-link to="/wallet">
          <div class="menu">
            <div class="menuIcon">
              <img src="../assets/images/tabImg/rechargeRecord.png" alt class="buyCourse"/>
            </div>
            <span>我要充值</span>
          </div>
        </router-link>
        <router-link to="/rechargeRecord">
          <div class="menu">
            <div class="menuIcon">
              <img src="../assets/images/tabImg/store.png" alt class="buyCourse"/>
            </div>
            <span>充值记录</span>
          </div>
        </router-link>
        <router-link to="/expensesRecord">
          <div class="menu">
            <div class="menuIcon">
              <img src="../assets/images/tabImg/expensesRecord.png" alt class="buyCourse"/>
            </div>
            <span>消费记录</span>
          </div>
        </router-link>
        <router-link to="/attendanceRecord">
          <div class="menu">
            <div class="menuIcon">
              <img src="../assets/images/tabImg/attendanceRecord.png" alt class="buyCourse"/>
            </div>
            <span>考勤记录</span>
          </div>
        </router-link>
        <router-link to="/passRecord">
          <div class="menu">
            <div class="menuIcon">
              <img src="../assets/images/tabImg/passRecord.png" alt class="buyCourse"/>
            </div>
            <span>通行记录</span>
          </div>
        </router-link>
      </div>
    </div>
    <!-- 最新消息提醒 -->
    <!--<div class="latestNews" @click="newsClick">
      <div class="latestNewsLeft">
        <div class="newsIcon">
          <img src="../assets/images/tabImg/info_icon.png" />
        </div>
        <div class="newsCen">尾号4523充值到账￥100....</div>
      </div>
      <div class="newsDate">下午 4:30</div>
    </div>-->
    <!-- 最近三天数据展示 -->
    <div class="dataList">
      <div class="recordData" v-for="(item2, index2) in listContent">
        <div class="recordDataCen">
          <div class="recordDataCenLeft">
            <div class="recordDataIcon">
              <!-- 类型编号 1:充值 2:消费 3:考勤 4:通行 -->
              <template v-if="item2.typeNo == '1'">
                <img src="../assets/images/tabImg/recharge.png"/>
              </template>
              <template v-if="item2.typeNo == '2'">
                <img src="../assets/images/tabImg/expenditure.png"/>
              </template>
              <template v-if="item2.typeNo == '3'">
                <img src="../assets/images/tabImg/attendance.png"/>
              </template>
              <template v-if="item2.typeNo == '4'">
                <img src="../assets/images/tabImg/pass.png"/>
              </template>
            </div>
            <div class="recordDataNum">
              <h5>{{item2.typeName}}</h5>
              <p>
                <span>{{item2.lastTime}}</span>
              </p>
            </div>
          </div>
          <div class="recordDataCenRight">
            <p>{{item2.value}}</p>
          </div>
        </div>
      </div>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
  import TabBar from "../components/tabBar";
  import {Tab, TabItem, Swiper, Search, SwiperItem, Scroller} from "vux";
  import {queryLastList} from '@/api/index/index';

  export default {
    components: {
      Tab,
      TabItem,
      TabBar,
      Swiper,
      Search,
      SwiperItem,
      Scroller
    },
    data() {
      return {
        courseList: [],
        code: '',
        vipInfo: '',
        infoLists: [],
        categoryList: [],
        tabList: [],
        tabIndex: 1,
        goodsImgList: [],
        courses: [],
        list: [],
        // 列表数据
        listContent: [],
        keyWord: "",
        corp_id: "",
        emp_id: ""
      };
    },
    created() {
      let isAuth = this.$route.query.isAuth;
      //已授权登陆
      if (null != isAuth && isAuth != '' && isAuth != undefined && isAuth == 'Y') {
        let corp_id = this.$route.query.corp_id;
        let openid = this.$route.query.openid;
        let emp_id = this.$route.query.emp_id;
        let corp_name = this.$route.query.corp_name;
        this.$store.commit('setUser', {openid: openid});
        this.$store.commit('setUser', {corp_id: corp_id});
        this.$store.commit('setUser', {emp_id: emp_id});
        sessionStorage.setItem("corp_name", corp_name);
        this.corp_id = corp_id;
        this.emp_id = emp_id;
      } else {
        //未授权登录
        this.corp_id = this.$store.state.user.corp_id;
        this.emp_id = this.$store.state.user.emp_id;
      }
    },
    mounted() {
      this.getLastTimeList();
    },
    methods: {
      /** 跳转消息列表页面 **/
      newsClick() {
        this.$router.push("/newsList");
      },
      /** 进页面默认加载 **/
      getLastTimeList() {
        let _this = this;
        let getaData = {
          corp_id: this.corp_id,	//企业ID
          emp_id: this.emp_id,	  //工号
        };
        queryLastList(getaData).then(res => {
          const {data, code, message} = res.data;
          if (code !== 200) {
            this.$vux.toast.show({
              text: message,
              type: 'text',
              width: '180px',
            });
            return;
          }
          const resultData = JSON.parse(data);
          if (resultData.length !== 0) {
            let arr = resultData;
            this.listContent = arr;
          } else {
            this.resultData = []
          }
        }).catch(err => {
          console.log(err)
        });

        return []
      },
    }
  }
  ;
</script>

<style lang="less" scoped>
  .indexBox {
    padding-bottom: 120px;

    .searchBox {
      .weui-search-bar {
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

      .weui-search-bar:before {
        content: none;
      }

      .weui-search-bar::after {
        content: none;
      }

      .weui-search-bar__cancel-btn {
        color: #fff;
      }
    }

    .topbg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: -1;
      background: #fff;
      // height: 930px;
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
      padding: 20px 40px;
      border-radius: 40px;

      .vux-swiper {
        height: 340px !important;
      }

      .vux-img {
        border-radius: 40px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }

    /* 菜单 */

    .menuList {
      margin: 38px 10px 0 10px;
      display: flex;

      &.vux-tab-wrap {
        height: 60px;
      }

      .vux-tab-container {
        height: 120px;

        .vux-tab {
          height: 120px;

          .vux-tab-item {
            line-height: 1.1;
            background: none;
          }
        }
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

    /* 最新动态 */

    .latestNews {
      padding: 0 24px;
      height: auto;
      overflow: hidden;
      clear: both;
      display: flex;

      .latestNewsLeft {
        float: left;
        flex: 1;

        .newsIcon {
          float: left;
          display: inline-block;

          img {
            width: 36px;
            height: 36px;
            padding: 18px;
          }
        }

        .newsCen {
          float: left;
          text-align: left;
          font-size: 26px;
          color: #5C5C5C;
          line-height: 72px;
        }
      }

      .newsDate {
        width: 120px;
        float: right;
        font-size: 22px;
        color: #7A7A7A;
        text-align: left;
        line-height: 72px;
      }
    }

    /* 展示最近三天 */

    .dataList {
      width: 100%;
      height: auto;
      margin-top: 50px;

      .recordData {
        padding: 0 24px;
        height: auto;
        overflow: hidden;
        clear: both;

        .recordDataCen {
          width: 100%;
          height: auto;
          overflow: hidden;
          clear: both;
          display: flex;
          margin: 28px 0;

          .recordDataCenLeft {
            float: left;
            flex: 1;

            .recordDataIcon {
              float: left;
              display: inline-block;

              img {
                width: 64px;
                height: 64px;
                margin-right: 32px;
              }
            }

            .recordDataNum {
              h5 {
                font-size: 28px;
                color: #3E3E3E;
                line-height: 1;
                font-weight: 400;
              }

              p {
                font-size: 24px;
                color: #7A7A7A;
                line-height: 1;
                display: inline-block;

                & span:first-child {
                  padding-right: 16px;
                }
              }
            }
          }

          .recordDataCenRight {
            float: right;
            width: 150px;
            position: relative;

            p {
              font-size: 32px;
              color: #1F1F1F;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
            }

          }
        }
      }
    }

    /* 资讯 */

    .noticeBox {
      display: flex;
      align-items: center;
      padding: 20px;
      border-top: 1px solid #f8f9fa;
      border-bottom: 20px solid #f8f9fa;

      .noticeIcon {
        width: 96px;
        height: 37px;
        margin: 0 20px;
      }

      .text-scroll {
        width: 30%;
        flex-grow: 1;
        line-height: 1.5;
        overflow: hidden;
        white-space: nowrap;
      }
    }

    /* 直播课程 */

    .module {
      border-bottom: 20px solid #f8f9fa;

      .module_title {
        padding: 20px;
        font-size: 30px;

        .more {
          font-size: 28px;

          color: #919191;

          .moreIcon {
            fill: #919191;
          }
        }
      }

      .scrollBox {
        display: flex;
        padding: 20px 0;
        margin: 0 auto;
        width: 96%;
        box-sizing: border-box;
        overflow-x: auto;
        position: relative;

        .courses {
          display: inline-block;
          margin-right: 20px;
          width: 48%;
          flex-shrink: 0;
          // float: left;
          .posi_rela {
            position: relative;
            width: 100%;

            .courseBg {
              display: block;
              width: 100%;
              // height: 218px;
            }

            .teacherInfo {
              position: absolute;
              top: 28px;
              left: 0;

              .posi_relaInner {
                .nameLabel {
                  width: 50%;
                  height: 55px;
                }

                .teacherName {
                  position: absolute;
                  top: 10px;
                  left: 10px;
                  font-size: 20px;
                  color: #fff;
                  opacity: 0.9;
                }

                .teacherHead {
                  width: 58px;
                  height: 60px;
                  margin-left: -20px;
                }
              }
            }

            .courseState {
              position: absolute;
              bottom: 0;
              left: 10px;
              width: 140px;

              .stateBg {
                width: 100%;
                height: 40px;
              }

              .stateIcon {
                position: absolute;
                top: 6px;
                left: 8px;
                width: 24px;
                height: 24px;
              }

              .stateTxt {
                position: absolute;
                top: 2px;
                left: 40px;
                opacity: 0.8;
                font-size: 18px;
                color: #fff;
              }
            }

            .liveTips {
              position: absolute;
              bottom: 10px;
              left: 150px;
              font-size: 14px;
              color: #fff;
              background: rgba(0, 0, 0, 0.2);
              height: 40px;
              line-height: 40px;
              padding: 0 5px;
              border-radius: 5px;
              text-align: center;
            }
          }

          .courseInfo {
            background: #fff;
            border-radius: 0 0 16px 16px;
            padding: 10px;
            box-shadow: 0 0 10px 5px #ddd;

            .courseTitle {
              font-size: 22px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }

            .coursePrice {
              display: flex;
              justify-content: space-between;
              margin-top: 10px;
              align-items: center;

              .fs_18 {
                font-size: 26px;
                flex-shrink: 0;

                span {
                  font-size: 24px;
                  color: #fa2a01;
                }
              }

              .courseTips {
                color: #ac8250;
                border: 2px solid #ac8250;
                border-radius: 20px;
                padding: 4px 10px;
                flex-shrink: 0;
              }
            }
          }
        }
      }
    }

    /* 热门课程 */

    .module_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 30px;

      .titleName {
        font-size: 34px;
        font-weight: 600;
        color: #282828;

        .explain {
          font-size: 24px;
          font-weight: normal;
          margin-left: 10px;
        }
      }
    }

    // tab导航
    .navTabList {
    }

    // tab内容板块
    .vux-swiper {
      overflow-y: auto;
    }

    .softwareBox {
      .softwareListBox {
        margin: 0;
        list-style: none;

        li {
          a {
            color: currentColor;

            .item-ans {
              width: 100%;
              display: flex;
              padding: 20px;
              box-sizing: border-box;

              .courseImg {
                img {
                  width: 312px;
                  height: 182px;
                  display: block;
                }
              }

              .hotCourseInfo {
                margin-left: 30px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .hotCourseInfo_title {
                  font-size: 30px;
                }

                .hotCourseInfo_count {
                  font-size: 24px;
                  color: #9d9d9d;
                  /*margin-top: 10px;*/
                }

                .price_now {
                  color: #f14927;
                  font-size: 36px;
                }

                .tags {
                  margin-left: 20px;
                  font-size: 24px;
                  border: 2px solid #f98e48;
                  padding: 0 8px;
                  border-radius: 20px;
                }

                .price_before {
                  font-size: 22px;
                  color: #a5a5a5;
                  text-decoration: line-through;
                }

                .hotCourseInfo_tips {
                  font-size: 24px;
                  color: #b48a59;
                  margin-left: 24px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
