<template>
  <div class="content">
    <div class="nav-top">
      <van-nav-bar title="购物车" left-arrow @click-left="onClickLeft()"/>
    </div>
    <div class="nav-bottom">
      <van-list>
        <van-swipe-cell v-for="(item,index) in list" :key="item.id">
          <van-cell>
            <van-row type="flex" justify="space-between">
              <van-col span="2">{{index+1}}</van-col>
              <van-col span="5">{{item.pidName}}</van-col>
              <van-col span="5">{{item.name}}</van-col>
              <van-col>
                <van-stepper v-model="item.num" theme="round" button-size="18" style="touch-action: none;"
                             @change="handleNumberChange(item)"/>
              </van-col>
              <van-col>{{item.unit}}</van-col>
            </van-row>
          </van-cell>
          <template #right>
            <van-button square type="danger" text="删除" @click="deleteCart(item)"/>
          </template>
        </van-swipe-cell>
      </van-list>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="cartNum"/>
      <van-goods-action-button type="warning" text="清空购物车" @click="clearCart()"/>
      <van-goods-action-button type="danger" text="提交订单" @click="saveOrder()"/>
    </van-goods-action>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Tab, Tabs, List, Cell, Row, Col} from "vant";
  import {Card} from 'vant';
  import {addPurOrder} from "../../api/index/pur";
  export default {
    components: {
      Vue,
      Cell,
      Row,
      Col,
      Card,
      List
    },
    data() {
      return {
        list: [],
        cartNum: 0,
      }
    },

    mounted() {
      var cartDatas = sessionStorage.getItem("cartDatas");
      if (null != cartDatas && cartDatas.length > 0) {
        cartDatas = JSON.parse(cartDatas);
        this.cartNum = cartDatas.length
        this.list = cartDatas
      }
    },
    methods: {
      onClickLeft() {
        this.$router.push('/addPurOrder')
      },
      /** 数量发生变化时 */
      handleNumberChange(rowData) {
        var cartDatas = sessionStorage.getItem("cartDatas");
        if (null != cartDatas) {
          cartDatas = JSON.parse(cartDatas);
          if (cartDatas.length > 0) {
            for (var i = 0; i < cartDatas.length; i++) {
              if (rowData.id == cartDatas[i].id) {
                cartDatas[i].num = rowData.num
                sessionStorage.setItem("cartDatas", JSON.stringify(cartDatas));
              }
            }
          }
        }
      },

      /** 清空购物车 */
      clearCart() {
        sessionStorage.setItem("cartDatas", "");
        this.list = [];
        this.cartNum = 0;
      },

      /** 删除*/
      deleteCart(rowData) {
        var cartDatas = sessionStorage.getItem("cartDatas");
        if (null != cartDatas) {
          cartDatas = JSON.parse(cartDatas);
          if (cartDatas.length > 0) {
            for (var i = 0; i < cartDatas.length; i++) {
              if (rowData.id == cartDatas[i].id) {
                cartDatas.splice(i, 1)
                sessionStorage.setItem("cartDatas", JSON.stringify(cartDatas));
              }
            }
          }
          this.cartNum = cartDatas.length;
          this.list = cartDatas;
        }
      },

      /** 保存订单 */
      saveOrder(){
        var list=this.list;
        if(list.length==0){
          this.$vux.toast.show({
            text: "请添加菜品到购物车",
            type: 'text',
            width: '180px',
          })
          return;
        }
        var corp_id=sessionStorage.getItem('corp_id');
        var corp_name= sessionStorage.getItem('corp_name');
        var login_name=sessionStorage.getItem("login_name");
        var up_corp_id= sessionStorage.getItem('up_corp_id');
        debugger
        let reqData = {
          corpId: corp_id,
          corpName:corp_name,
          loginName: login_name,
          upCorpId: up_corp_id,
          content:JSON.stringify(list)
        }
        addPurOrder(reqData).then(res => {
          const {code, message} = res.data;
          if (code !== 200) {
            this.$vux.toast.show({
              text: message,
              type: 'text',
              width: '180px',
            })
            return;
          }
          this.$vux.toast.show({
            text: "提交成功",
            type: 'text',
            width: '180px',
          })
          sessionStorage.setItem("cartDatas","");
          this.list=[];
          this.cartNum=0;
          done()
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
      margin-top: 90px;
    }

    .van-list {
      padding-bottom: 1.25rem;
    }
  }
</style>
