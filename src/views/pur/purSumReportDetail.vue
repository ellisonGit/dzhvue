<template>
  <div class="content">
    <div class="nav-top">
      <van-nav-bar title="采购订单汇总明细报表" left-arrow @click-left="onClickLeft()">
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
              <van-col span="6">{{item.createTime}}</van-col>
              <van-col span="8">{{item.corpName}}</van-col>
              <van-col span="4">{{item.dishName}}</van-col>
              <van-col span="3">{{item.num}}</van-col>
              <van-col >{{item.unit}}</van-col>
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
        <van-field v-model="name" label="菜品名称" placeholder="请输入菜品名称" />
        <van-field v-if="(sub_corp_id==null || sub_corp_id=='') && (corp_id==null || corp_id=='')" v-model="upCorpName" label="上级名称" placeholder="请输入上级名称" />
        <van-field v-model="corpName" label="企业名称" placeholder="请输入企业名称" />
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
  import {queryPurOrderSumDetailReport} from "../../api/index/pur_report";

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
        createTime:'',
        pid:'',
        name:'',      //菜品名称
        corpName:'',  //分公司名称
        upCorpName:'',//企业名称
        sub_corp_id:'',
        corp_id:'',
      }
    },

    mounted() {
      this.sub_corp_id = sessionStorage.getItem("sub_corp_id");
      this.corp_id = sessionStorage.getItem("corp_id");

      let pid = this.$route.query.pid;
      let createTime = this.$route.query.createTime;

      this.pid = pid;
      this.createTime = createTime
      //获取采购汇总明细报表
      const data = {
        condition: {
          pid: this.pid,
          startTime: this.createTime + " 00:00:00",
          endTime: this.createTime + " 23:59:59"
        },
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      }
      this.queryPurOrderSumDetailReport(data);
    },

    methods: {
      //显示搜索弹出框
      showPopup() {
        this.show = true;
        this.name = '';
        this.corpName = '';
        this.upCorpName = '';
      },
      //关闭搜索弹出框
      closePopup() {
        this.show = false;
        this.name = '';
        this.corpName = '';
        this.upCorpName = '';
      },

      //返回
      onClickLeft() {
        this.$router.push('/purSumReport')
      },

      //搜索查询
      onSearch() {
        this.list=[]
        const data = {}
        let condition = {}
        var name = this.name;
        var corpName = this.corpName;
        var upCorpName = this.upCorpName;

        if (null != name && name.length > 0) {
          condition['name'] = name;
        }
        if (null != corpName && corpName.length > 0) {
          condition['corpName'] = corpName;
        }
        if (null != upCorpName && upCorpName.length > 0) {
          condition['upCorpName'] = upCorpName;
        }

        condition['startTime'] = this.createTime + ' 00:00:00'
        condition['endTime'] = this.createTime + ' 23:59:59'
        condition['pid'] = this.pid

        data['condition'] = condition
        data['pageIndex'] = 1
        data['pageSize'] = this.pageSize

        this.queryPurOrderSumDetailReport(data);
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
        let reqData = {
          condition: {
            pid:this.pid,
            startTime: this.createTime +" 00:00:00",
            endTime: this.createTime +" 23:59:59",
            name:this.name,
            corpName:this.corpName,
            upCorpName:this.upCorpName,
          },
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        };
        this.queryPurOrderSumDetailReport(reqData);
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

      /** 获取采购汇总明细列表 **/
      queryPurOrderSumDetailReport(reqData) {
        queryPurOrderSumDetailReport(reqData).then(res => {
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
