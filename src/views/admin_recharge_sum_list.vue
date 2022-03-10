<template>
  <div class="noticeList">
    <x-header :left-options="{showBack: true,backText: backName}" class="headerBox"></x-header>
    <img v-if="articleList.length == 0" src='../assets/images/nullmaterial08.png' class='emptyBox'/>
    <div class="contentBox">
      <div class="listCen">
        <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :loading-text="loadingText">
          <div class="recordData" v-for="(item, index) in articleList">
            <div class="recordDataCen">
              <div class="recordDataCenLeft">
                <div class="recordDataIcon">
                  <img src="../assets/images/tabImg/recharge.png"/>
                </div>
                <div class="recordDataNum">
                  <h5>{{item.corp_name}}</h5>
                  <p>
                    <span>{{item.op_date}}</span>
                  </p>
                </div>
              </div>
              <div class="recordDataCenRight">
                <p>{{item.charge_money}}</p>
              </div>
            </div>
          </div>
        </v-scroll>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, Popup, XButton, Group, XInput} from "vux";
  import {queryDayMchargeSumList} from '@/api/index/manager';
  import Scroll from '../components/pull-refresh';
  export default {
    components: {
      XHeader,
      XButton,
      Popup,
      Group,
      XInput,
      'v-scroll': Scroll,
    },
    data() {
      return {
        name: "",
        backName: "",
        typeId: "",
        imgUrl: "",
        articleList: [],
        loadingText: '',
        pageIndex: 1, //当前页面
        pageSize: 10,  // 一次显示多少条
        total: 0,         // 总条数
        start_date: '',
        end_date: ''
      }
    },
    mounted() {
      this.start_date = this.$route.query.start_date
      this.end_date = this.$route.query.end_date
      this.typeId = this.$route.query.id;
      this.backName = this.$route.query.index;

      let reqData = {
        condition: {
          start_date: this.start_date,
          end_date: this.end_date,
        },
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      };
      this.getArticleList(reqData);
    },
    methods: {
      /** 进页面默认加载 **/
      getArticleList(reqData) {
        queryDayMchargeSumList(reqData).then(res => {
          const {data, code, message} = res.data;
          if (code !== 200) {
            this.$vux.toast.show({
              text: message,
              type: 'text',
              width: '180px',
            })
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
        let reqData = {
          condition: {
            start_date: this.start_date,
            end_date: this.end_date,
          },
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        };
        queryDayMchargeSumList(reqData).then(res => {
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

        let reqData = {
          condition: {
            start_date: this.start_date,
            end_date: this.end_date,
          },
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        };
        queryDayMchargeSumList(reqData).then(res => {
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

    // 列表
    .contentBox {
      width: 100%;
      position: absolute;
      top: 50px;
      left: 0;
      bottom: 0;

      .filter {
        font-size: 26px;
        color: #3D3D3D;
        line-height: 64px;
        padding-left: 37px;

        img {
          width: 24px;
          height: 16px;
          margin-left: 11px;
          display: inline-block;
        }
      }

      .listCen {
        width: 100%;
        position: absolute;
        top: 64px;
        left: 0;
        bottom: 0;
        overflow-y: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
          display: none;
        }

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
    }

    .searchName {
      padding: 10px 30px;

      .title {
        font-size: 30px;
        color: #3D3D3D;
        text-align: left;
        line-height: 1;
        padding-bottom: 24px;
      }

      .searchCen {
        width: 100%;
        height: 62px;
        border: 1px solid #D6D6D6;
        border-radius: 8px;
        display: flex;

        .searchIcon {
          display: inline-block;

          img {
            width: 24px;
            height: 24px;
            display: inline-block;
            padding-right: 16px;
            padding-left: 20px;
            margin: 20px 0;
          }
        }

        .weui-cell {
          flex: 1;
          padding: 5px 5px 5px 0;
          height: 54px;
          line-height: 64px;
          font-size: 20px;
          color: #333333;
        }

        ::-webkit-input-placeholder { /* WebKit browsers */
          color: #999999;
        }

        ::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: #999999;
        }

        :-ms-input-placeholder { /* Internet Explorer 10+ */
          color: #999999;
        }
      }
    }

    .searchDate {
      padding: 10px 30px;

      .title {
        font-size: 30px;
        color: #3D3D3D;
        text-align: left;
        line-height: 1;
        padding-bottom: 24px;
      }

      .searchCen {
        width: 100%;
        height: 62px;
        border: 1px solid #D6D6D6;
        border-radius: 8px;

        .weui-cell {
          padding: 5px 5px 5px 0;
          height: 54px;
          line-height: 64px;
          font-size: 20px;
          color: #333333;
        }

        ::-webkit-input-placeholder { /* WebKit browsers */
          color: #999999;
        }

        ::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: #999999;
        }

        :-ms-input-placeholder { /* Internet Explorer 10+ */
          color: #999999;
        }
      }
    }

    .searchAmount {
      padding: 10px 30px;

      .title {
        font-size: 30px;
        color: #3D3D3D;
        text-align: left;
        line-height: 1;
        padding-bottom: 24px;
      }

      .searchCen {
        width: 100%;
        height: 62px;
        border: 1px solid #D6D6D6;
        border-radius: 8px;
        overflow: hidden;
        clear: both;

        .amountL {
          width: 45%;
          float: left;
          display: inline-block;

          .weui-cell {
            padding: 5px 5px 5px 10px;
            height: 54px;
            font-size: 20px;
            color: #333333;
            line-height: 64px;
          }

          ::-webkit-input-placeholder { /* WebKit browsers */
            color: #999999;
          }

          ::-moz-placeholder { /* Mozilla Firefox 19+ */
            color: #999999;
          }

          :-ms-input-placeholder { /* Internet Explorer 10+ */
            color: #999999;
          }
        }

        .amountR {
          width: 45%;
          float: left;
          display: inline-block;

          .weui-cell {
            padding: 5px 5px 5px 10px;
            height: 54px;
            line-height: 64px;
            font-size: 20px;
            color: #333333;
          }

          ::-webkit-input-placeholder { /* WebKit browsers */
            color: #999999;
          }

          ::-moz-placeholder { /* Mozilla Firefox 19+ */
            color: #999999;
          }

          :-ms-input-placeholder { /* Internet Explorer 10+ */
            color: #999999;
          }
        }

        span {
          width: 10%;
          float: left;
          line-height: 64px;
          text-align: center;
          font-size: 24px;
          color: #3D3D3D;
        }
      }
    }

    .searchForBut {
      padding: 15px;
      overflow: hidden;
      clear: both;

      .cancel {
        width: 327px;
        height: 96px;
        float: left;
        font-size: 30px;

        button {
          color: #3D3D3D;
          background: #F5F5F5;
          border: 1px solid #EDEDED;
          border-radius: 8px;
        }
      }

      .submit {
        width: 327px;
        height: 96px;
        float: right;
        font-size: 30px;

        button {
          color: #FFFFFF;
          background: #EF5350;
          border: none;
          border-radius: 8px;
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

  .box {
    padding: 5px 10px 5px 10px;

    &:first-child {
      padding: 0 10px 5px 10px;
    }

    &:last-child {
      padding: 5px 10px 0 10px;
    }
  }

  .list {
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #f0f0f0;
    padding: 30px;
  }

  .xs-plugin-pulldown-container {
    line-height: 40px;
  }

  .xs-plugin-pullup-container {
    line-height: 40px;
  }

  .scrollerCen {
    overflow-y: scroll !important;
    scrollbar-width: none;
    -ms-overflow-style: none;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  .summaryTime {
    height: 450px;
  }

  .modeSele {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #eee;
    z-index: 501;
    -webkit-transition-property: -webkit-transform;
    transition-property: -webkit-transform;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
    -webkit-transition-duration: 300ms;
    transition-duration: 300ms;
    max-height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .m-popover {
    bottom: 150px;
  }


</style>
