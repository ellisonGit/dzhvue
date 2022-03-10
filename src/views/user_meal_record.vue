<template>
  <div class="noticeList">
    <x-header :left-options="{showBack: true,backText: backName}" class="headerBox"></x-header>
    <img v-if="articleList.length == 0" src='../assets/images/nullmaterial08.png' class='emptyBox'/>
    <div class="listCen">
      <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :loading-text="loadingText">
        <div class="contentBox">
          <div class='noticeBox' v-for="(item, index) in articleList" :key="index">
            <div class='notices'>
              <div class="listIcon">
                <img src="../assets/images/tabImg/expenditure.png">
              </div>
              <div class='noticeText'>
                <div class='noticeTitle'>{{typeName}}</div>
                <div class='noticeContent'>{{item.sign_time}}</div>
              </div>
            </div>
            <div class='more'>
              -{{item.card_consume}}
            </div>
          </div>
        </div>
      </v-scroll>
    </div>
  </div>
</template>

<script>
  import {XHeader} from "vux";
  import {queryMealRecordsList} from '@/api/index/index';
  import Scroll from '../components/pull-refresh';

  export default {
    components: {
      XHeader,
      'v-scroll': Scroll,
    },
    data() {
      return {
        backName: "",
        typeId: "",
        typeName: "卡支出",
        articleList: [],
        loadingText: '加载中...',
        pageIndex: 1, //当前页面
        pageSize: 10,  // 一次显示多少条
        total: 0,      // 总条数
        listShow: false
      }
    },
    mounted() {
      this.getArticleList();
    },
    methods: {
      /** 进页面默认加载 **/
      getArticleList() {
        this.articleList = [];
        let getaData = {
          condition: {
            req_src: this.$store.state.user.req_src,	//请求来源 默认pub
            corp_id: this.$store.state.user.corp_id,	//企业ID
            emp_id: this.$store.state.user.emp_id,	  //工号
          },
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        };
        queryMealRecordsList(getaData).then(res => {
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
          const {result} = resultData;
          if (result.length > 0) {
            this.total = resultData.total;
            this.articleList = result;
            if (this.total < this.pageSize) {
              this.loadingText = "";
            }
          }

        }).catch(err => {
          console.log(err)
        });

      },
      /** 下拉刷新 **/
      onRefresh(done) {
        this.pageIndex = 1;

        let getaData = {
          condition: {
            req_src: this.$store.state.user.req_src,	//请求来源 默认pub
            corp_id: this.$store.state.user.corp_id,	//企业ID
            emp_id: this.$store.state.user.emp_id,	  //工号
          },
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        };
        queryMealRecordsList(getaData).then(res => {
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
          if (result.length > 0) {
            this.total = resultData.total;
            this.articleList = result;
            if (this.total < this.pageSize) {
              this.loadingText = "";
            }
          }
          done() // call done

        }).catch(err => {
          console.log(err)
        });
      },
      /** 上拉加载 **/
      onInfinite(done) {
        if (this.total <= (parseInt(this.pageIndex) * parseInt(this.pageSize))) {
          this.loadingText = '加载完毕……';
          return;
        }
        this.pageIndex++;

        let getaData = {
          condition: {
            req_src: this.$store.state.user.req_src,	//请求来源 默认pub
            corp_id: this.$store.state.user.corp_id,	//企业ID
            emp_id: this.$store.state.user.emp_id,	  //工号
          },
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        }
        queryMealRecordsList(getaData).then(res => {
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
          if (result.length > 0) {
            this.total = resultData.total;
            this.articleList = this.articleList.concat(result);
            if (this.total < (parseInt(this.pageIndex + 1) * parseInt(this.pageSize))) {
              this.loadingText = '加载完毕……';
              return;
            }
          }

          done() // call done

        }).catch(err => {
          console.log(err)
        });
      }
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
    .listCen {
      width: 100%;
      position: absolute;
      top: 64px;
      left: 0;
      bottom: 0;

      .contentBox {
        .noticeList {
          padding: 30px 30px 0;
          background: #fff;
          border-top: 20px solid #f8f9fa;

          .dataTitle {
            font-size: 26px;
            color: #999;
            overflow: hidden;
            clear: both;
            line-height: 64px;
            background: #FAFAFA;

            .titleLeft {
              font-size: 26px;
              color: #3D3D3D;
              font-weight: bold;
              float: left;
            }

            .titleRight {
              font-size: 26px;
              font-weight: bold;
              color: #EF5350;
              float: right;
            }
          }

        }

        .noticeBox {
          display: flex;
          align-items: center;
          padding: 30px;
          border-bottom: 1px solid #eee;

          .notices {
            align-items: center;
            display: flex;
            flex: 1;
            // width: calc(100% - 150px);
            .dateBox {
              width: 25%;

              .dates {
                border: 2px solid #eee;
                border-radius: 10px;
                text-align: center;
                display: inline-block;

                .week {
                  color: #fff;
                  font-size: 24px;
                  padding: 6px 20px;
                  border-top-left-radius: 10px;
                  border-top-right-radius: 10px;
                }

                .bg_yellow {
                  background-color: #D6A547;
                }

                .bg_green {
                  background-color: #6CD647;
                }

                .bg_red {
                  background-color: #FF663D;
                }

                .day {
                  font-size: 36px;
                }
              }
            }

            .listIcon {
              margin-right: 32px;

              img {
                width: 64px;
                height: 64px;
                display: inline-block;
              }
            }

            .noticeText {
              flex: 1;

              .noticeTitle {
                font-size: 30px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              .noticeContent {
                font-size: 26px;
                color: #999;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }

          .more {
            width: 150px;
            text-align: right;

            img {
              width: 16px;
              height: 26px;
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
