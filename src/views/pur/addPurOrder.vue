<template>
  <div class="content">
    <div class="nav-top">
      <van-nav-bar title="菜品列表页" left-arrow @click-left="onClickLeft()"/>
      <van-search v-model="value" placeholder="请输入搜索关键词"  @search="onSearch" @clear="onClear"/>
    </div>
    <div class="nav-bottom">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="(item,index) in list" :key="item.id">
            <van-row type="flex" justify="space-between">
              <van-col span="2">{{index+1}}</van-col>
              <van-col span="5">{{item.pidName}}</van-col>
              <van-col span="5">{{item.name}}</van-col>
              <van-col>
                <van-stepper v-model="item.num" theme="round" button-size="18" style="touch-action: none;"/>
              </van-col>
              <van-col >{{item.unit}}</van-col>
              <van-col span="2">
                <van-icon name="shopping-cart-o" color="red" size="24px" style="touch-action: none;" @click="addToCart(item)"/>
              </van-col>
            </van-row>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="cartNum"/>
      <van-goods-action-button type="warning" text="前往购物车" @click="jumpCart()"/>
    </van-goods-action>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Tab, Tabs, List, Cell, Row, Col} from "vant";
  import {Card} from 'vant';
  import {queryDishDetailList} from "../../api/index/dish_list";

  export default {
    components: {
      Vue, Cell, Row, Col, Card,
    },
    data() {
      return {
        pageIndex:1,  //当前页面
        pageSize: 10,  // 一次显示多少条
        total: 0,      // 总条数
        list: [],
        loading: false,
        finished: false,
        refreshing: false,
        cartNum:0,
        value:''
      }
    },

    mounted() {
      var cartDatas = sessionStorage.getItem("cartDatas");
      if (null != cartDatas && cartDatas.length>0) {
        cartDatas = JSON.parse(cartDatas);
        this.cartNum =cartDatas.length
      }

      let reqData = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      };
      this.getDishDetailList(reqData);
    },

    methods: {
      onSearch(val) {
        this.list=[]
        let reqData = {
          pageIndex: 1,
          pageSize: this.pageSize,
          condition:{
            name:val
          }
        };
        this.getDishDetailList(reqData);
      },

      onClear() {
        this.list=[]
        let reqData = {
          pageIndex: 1,
          pageSize: this.pageSize,
        };
        this.getDishDetailList(reqData);
      },
      onClickLeft() {
        this.$router.push('/adminIndex')
      },
      //加入购物车
      addToCart(rowData) {
        var cartDatas = sessionStorage.getItem("cartDatas");
        if (null != cartDatas && cartDatas.length>0) {
          cartDatas = JSON.parse(cartDatas);
          if (cartDatas.length > 0) {
            var flag = false;
            for (var i = 0; i < cartDatas.length; i++) {
              if (rowData.id == cartDatas[i].id) {
                flag = true;
                var num = cartDatas[i].num;
                num = parseInt(num) + parseInt(rowData.num)
                cartDatas[i].num = num
                sessionStorage.setItem("cartDatas", JSON.stringify(cartDatas));
                break;
              }
            }
            if (flag == false) {
              var obj = {
                id: rowData.id,
                name: rowData.name,
                num: rowData.num,
                pid: rowData.pid,
                pidName: rowData.pidName,
                unit: rowData.unit,
              }
              cartDatas.push(obj)
              sessionStorage.setItem("cartDatas", JSON.stringify(cartDatas));
            }
          }else{
            cartDatas = [];
            var obj = {
              id: rowData.id,
              name: rowData.name,
              num: rowData.num,
              pid: rowData.pid,
              pidName: rowData.pidName,
              unit: rowData.unit,
            }
            cartDatas.push(obj)
            sessionStorage.setItem("cartDatas", JSON.stringify(cartDatas));
          }

        } else {
          cartDatas = [];
          var obj = {
            id: rowData.id,
            name: rowData.name,
            num: rowData.num,
            pid: rowData.pid,
            pidName: rowData.pidName,
            unit: rowData.unit,
          }
          cartDatas.push(obj)
          sessionStorage.setItem("cartDatas", JSON.stringify(cartDatas));
        }
        var cartDatas = JSON.parse(sessionStorage.getItem("cartDatas"));
        this.cartNum = cartDatas.length
      },

      /** 前往购物车 */
      jumpCart(){
        this.$router.push('/shoppCart')
      },

      onLoad() {
        if (this.total <= (parseInt(this.pageIndex) * parseInt(this.pageSize))) {
          this.loading=false;
          return;
        }
        this.pageIndex++;
        if (this.refreshing) {
          this.pageIndex=1;
          this.list = [];
          this.refreshing = false;
        }
        let reqData = {
          condition: {
            name:this.value
          },
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        };
        this.getDishDetailList(reqData);
        this.loading = false;
      },

      //下拉刷新
      onRefresh() {
        if (this.total <= (parseInt(this.pageIndex) * parseInt(this.pageSize))) {
          this.loading=false;
          this.refreshing = false;
          return;
        }
        // 清空列表数据
        this.finished = false;

        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.onLoad();
      },

      /** 获取菜品列表 **/
      getDishDetailList(reqData) {
        queryDishDetailList(reqData).then(res => {
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
            result.forEach((item, index) => {
              item['num'] = 1;
              this.list.push(item)
            });
          }
          if(this.list.length>=this.total){
            this.finished = true;
          }

        }).catch(err => {
          console.log(err)
        });

      },

    },
  }
</script>

<style lang="less" scoped>
  .content {
    .nav-top {
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9;
    }

    .nav-bottom {
      margin-top: 200px;
    }

    .van-list {
      padding-bottom: 1.25rem;
    }
  }
</style>
