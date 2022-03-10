<template>
  <div class="content">
    <div class="nav-top">
      <van-nav-bar title="我的采购订单明细" left-arrow @click-left="onClickLeft()">
        <template #right>
          <van-icon name="search" size="22" @click="showPopup()"/>
        </template>
      </van-nav-bar>
    </div>
    <div class="nav-bottom">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad">

          <van-cell v-for="(item,index) in list" :key="item.id">
            <van-row type="flex" justify="space-between">
              <van-col span="1">{{index+1}}</van-col>
              <van-col span="8">{{item.createTime}}</van-col>
              <van-col span="5">{{item.pidName}}</van-col>
              <van-col span="5">{{item.dishName}}</van-col>
              <van-col span="3">{{item.num}}</van-col>
              <van-col>{{item.unit}}</van-col>
            </van-row>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-popup v-model="show"
               closeable
               close-icon="close"
               position="top"
               :style="{ height: '35%' }">

      <van-cell-group>
        <van-field readonly
                   clickable
                   name="picker"
                   :value="selectValue"
                   label="菜品类目"
                   placeholder="点击选择菜品类目"
                   @click="showPicker = true"/>

        <van-popup v-model="showPicker" position="bottom">
          <van-picker show-toolbar
                      :columns="columns"
                      @confirm="onSelectConfirm"
                      @cancel="showPicker = false"/>
        </van-popup>

        <van-field v-model="name" label="菜品名称" placeholder="请输入菜品名称" />
      </van-cell-group>

      <div style="text-align:center; margin-top:.5rem;margin-bottom:.5rem">
        <van-button primary size="small" @click="closePopup()">取消</van-button>
        <van-button type="info" size="small" @click="onSearch()">确认</van-button>
      </div>
    </van-popup>
  </div>

</template>

<script>
  import Vue from 'vue';
  import {Popup, Cell, Row, Col, Calendar} from "vant";
  import {Card} from 'vant';
  import {queryPurOrderDetailList} from "../../api/index/pur";
  import {queryDishList} from "../../api/index/pur_report";

  export default {
    components: {
      Vue, Cell, Row, Col, Card, Calendar, Popup
    },
    data() {
      return {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        list: [],
        loading: false,
        finished: false,
        refreshing: false,
        show: false,        //搜索弹框
        selectValue: '',
        columns: [],
        pidList:[],
        showPicker: false, //下拉框选择弹框
        orderNo:'',
        name:'',      //菜品名称
      }
    },

    mounted() {
      let orderNo = this.$route.query.orderNo;
      this.orderNo = orderNo;

      //获取类目
      let pidData = {
        pageSize: 1000,
        pageIndex: 1,
        condition: {
          pid: 0
        }
      }
      this.queryPidList(pidData);

      //获取我的采购订单明细
      const data = {
        condition: {
          orderNo: this.orderNo,
        },
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      }
      this.queryPurOrderDetailList(data);
    },

    methods: {
      //显示搜索弹出框
      showPopup() {
        this.show = true;
        this.name = '';
        this.selectValue = '';
      },
      //关闭搜索弹出框
      closePopup() {
        this.show = false;
        this.name = '';
        this.selectValue = '';
      },
      //选中类目
      onSelectConfirm(value) {
        this.selectValue = value;
        this.showPicker = false;
      },
      //返回
      onClickLeft() {
        this.$router.push('/myPurOrder')
      },

      //搜索查询
      onSearch() {
        this.list=[]
        const data = {}
        let condition = {}
        var selectValue = this.selectValue;
        if (null != selectValue && selectValue.length > 0) {
          let obj = {}
          obj = this.pidList.find(function(item){
            return item.name === selectValue
          });
          condition['pid'] = obj.id;
        }

        var name = this.name;
        if (null != name && name.length > 0) {
          condition['name'] = name;
        }
        condition['orderNo'] = this.orderNo

        data['condition'] = condition
        data['pageIndex'] = 1
        data['pageSize'] = this.pageSize

        this.queryPurOrderDetailList(data);
        this.show=false;
      },

      onLoad() {
        if (this.total <= (parseInt(this.pageIndex) * parseInt(this.pageSize))) {
          this.loading = false;
          return;
        }
        this.pageIndex++;
        if (this.refreshing) {
          this.pageIndex = 1;
          this.list = [];
          this.refreshing = false;
        }
        const data = {}
        let condition = {}

        var selectValue = this.selectValue;
        if (null != selectValue && selectValue.length > 0) {
          let obj = {}
          obj = this.pidList.find(function(item){
            return item.name === selectValue
          });
          condition['pid'] = obj.id;
        }
        condition['name'] = this.name;
        data['condition'] = condition
        data['pageIndex'] =  this.pageIndex
        data['pageSize'] = this.pageSize
        this.queryPurOrderDetailList(data);
        this.loading = false;
      },

      //下拉刷新
      onRefresh() {
        if (this.total <= (parseInt(this.pageIndex) * parseInt(this.pageSize))) {
          this.loading = false;
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

      /** 获取采购订单明细列表 **/
      queryPurOrderDetailList(reqData) {
        queryPurOrderDetailList(reqData).then(res => {
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
              this.list.push(item)
            });
          }
          if (this.list.length >= this.total) {
            this.finished = true;
          }

        }).catch(err => {
          console.log(err)
        });
      },

      //获取类目列表
      queryPidList(reqData) {
        queryDishList(reqData).then(response => {
          const {code,data,message} = response.data
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
          this.pidList = result;

          if(result.length>0){
            result.forEach((item, index) => {
              this.columns.push(item.name)
            });
          }

        }).catch(error => {
          console.log(error)
        })
      }

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
      margin-top: 80px;
    }

    .van-list {
      padding-bottom: 1.25rem;
    }

    /deep/ .van-cell-group {
      margin-top: 1.2rem;
    }
  }
</style>
