<template>
  <div class="content">
    <div class="nav-top">
      <van-nav-bar title="餐厅收款信息" left-arrow @click-left="onClickLeft()">
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
            <van-col span="2"><img src="../assets/images/tabImg/receive.png" style="width: 40px"/></van-col>
            <van-row type="flex" justify="space-between">
              <van-col span="12" offset="2"> {{item.dinlev_name}}</van-col>
            </van-row>
            <van-row type="flex" justify="space-between">
              <van-col span="12" offset="2">{{item.sign_time}}</van-col>
              <van-col span="10">金额: +{{item.card_consume}}</van-col>
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
        <van-field label="日 期" :value="date" @click="dateShow = true" readonly
                   clickable name="calendar" placeholder="点击选择日期区间"/>
        <van-calendar v-model="dateShow" type="range" @confirm="onConfirmDate" :min-date="minDate"
                      :max-date="maxDate"/>
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
  import {querydinroomSumList} from '@/api/index/manager';

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
        minDate: new Date(2010, 0, 1),
        maxDate: new Date(),
        showPicker: false, //下拉框选择弹框
        date: '',
        dateShow: false, //日期弹框
      }
    },

    mounted() {
      //获取充值记录列表
      let reqData = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      };
      this.querydinroomSumList(reqData);

    },

    methods: {
      //显示搜索弹出框
      showPopup() {
        this.show = true;
        this.date = '';
      },
      //关闭搜索弹出框
      closePopup() {
        this.show = false;
        this.date = '';
      },
      //格式化日期
      formatDate(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      },
      //选中日期
      onConfirmDate(date) {
        const [start, end] = date;
        this.dateShow = false;
        this.date = `${this.formatDate(start)} / ${this.formatDate(end)}`;
      },

      //返回
      onClickLeft() {
        this.$router.push('/adminIndex')
      },

      //搜索查询
      onSearch() {
        this.list=[]
        const data = {}
        let condition = {}
        var date = this.date;

        if (null != date && date.length > 0) {
          var startDate = date.split("/")[0].trim()
          var endDate = date.split("/")[1].trim()
          condition['start_date'] = startDate + ' 00:00:00'
          condition['end_date'] = endDate + ' 23:59:59'
        }
        data['condition'] = condition
        data['pageIndex'] = 1
        data['pageSize'] = this.pageSize

        this.querydinroomSumList(data);
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
        var date = this.date;
        if (null != date && date.length > 0) {
          var startDate = date.split("/")[0].trim()
          var endDate = date.split("/")[1].trim()
          condition['start_date'] = startDate + ' 00:00:00'
          condition['end_date'] = endDate + ' 23:59:59'
        }

        data['condition'] = condition
        data['pageIndex'] =  this.pageIndex
        data['pageSize'] = this.pageSize

        this.querydinroomSumList(data);
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

      /** 获取餐厅记录列表 **/
      querydinroomSumList(reqData) {
        querydinroomSumList(reqData).then(res => {
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
