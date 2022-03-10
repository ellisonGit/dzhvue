<template>
  <div class="loginBox">
    <div class="headBox"></div>
    <div class="loginContent">
      <div class="loginTitle">车辆进出校园预约登记</div>
      <div class="formList flex" v-if="student_name.length>0">
        <div class="leftHint" style="display: none">学生姓名:</div>
        <input type="text" class="inputBox" v-model="student_name" disabled/>
      </div>

      <div class="formList flex"  v-if="class_name.length>0">
        <div class="leftHint" style="display: none">班级:</div>
        <input type="text" class="inputBox" v-model="class_name" disabled/>
      </div>

      <div class="formList flex">
        <div class="leftHint" style="display: none"></div>
        <input type="text" class="inputBox" v-model="number_plate" placeholder="请输入车牌号"/>
      </div>
      <div class="formList flex">
        <div class="leftHint" style="display: none"></div>
        <input type="text" class="inputBox" v-model="phone" placeholder="请输入手机号码"/>
      </div>
      <div class="formList flex" @click="selectStartDate()">
        <div class="leftHint" style="display: none"></div>
        <input type="text" class="inputBox" v-model="start_time" placeholder="请选择起始时间"/>
      </div>
      <div class="formList flex" @click="selectEndDate()">
        <div class="leftHint" style="display: none"></div>
        <input type="text" class="inputBox" v-model="end_time" placeholder="请选择结束时间"/>
      </div>
      <div class="formList flex">
        <div class="leftHint" style="display: none"></div>
        <input type="text" class="inputBox" v-model="remark" placeholder="请输入来访事由"/>
      </div>
      <div class="loginBtn" @click="reseRegister()">预约</div>
    </div>
  </div>
</template>

<script>
  import {getUserInfo, reseRegister} from '@/api/index/dingding';
  import md5 from 'js-md5';
  import * as dd from 'dingtalk-jsapi';

  export default {
    data() {
      return {
        student_name:'',
        class_name:'',
        number_plate: '',
        start_time: '',
        end_time: '',
        remark: '',
        userid:'',
        phone:''

      }
    },
    created() {
      // 通过该免登授权码可以获取用户身份
      var that=this;
      dd.ready(function () {
        dd.runtime.permission.requestAuthCode({
          corpId: 'dinge74bd0aee899da6535c2f4657eb6378f', // 企业id
          onSuccess: function (info) {
            let authcode = info.code
            console.log("code:{}",authcode)
            let reqdata = {
              code: authcode
            };
            getUserInfo(reqdata).then(res => {
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
              console.log("student_name:"+resultData.student_name)
              console.log("class_name:"+resultData.class_name)
              console.log("userid:"+resultData.userid)
              that.student_name=resultData.student_name;
              that.class_name=resultData.class_name;
              that.userid=resultData.userid;

            }).catch(err => {
              console.log(err)
            });

          }
        });
      });
    },
    mounted() {
    },
    methods: {
      formatDate(time, fmt) {
        // time = time * 1000
        let date = new Date(time)
        console.log(new Date(time))

        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        let o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds()
        }
        for (let k in o) {
          if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
          }
        }
        return fmt

      },
      padLeftZero(str) {
        return ('00' + str).substr(str.length)
      },

      selectStartDate() {
        let that=this;
        dd.biz.calendar.chooseDateTime({
          onSuccess: function (result) {
            let time = result.chosen;
            that.start_time=that.formatDate(time,'yyyy-MM-dd hh:mm')
          },
          onFail: function (err) {
          }
        })
      },

      selectEndDate() {
        let that=this;
        dd.biz.calendar.chooseDateTime({
          onSuccess: function (result) {
            let time = result.chosen;
            that.end_time=that.formatDate(time,'yyyy-MM-dd hh:mm')
          },
          onFail: function (err) {
          }
        })
      },

      // 车辆预约登记
      reseRegister() {
        let user_id = this.userid;
        let number_plate = this.number_plate;
        let start_time = this.start_time;
        let end_time = this.end_time;
        let remark = this.remark;
        let phone = this.phone;

        if (number_plate.length == 0) {
          this.$vux.toast.show({
            text: '请输入车牌号',
            type: 'text',
            width: '180px',
          })
          return;
        }

        if (phone.length == 0) {
          this.$vux.toast.show({
            text: '请输入手机号码',
            type: 'text',
            width: '180px',
          })
          return;
        }
        const reg =/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if ((!reg.test(phone)) && phone != '') {
          this.$vux.toast.show({
            text: '请输入正确的手机号码',
            type: 'text',
            width: '180px',
          })
          return;
        }

        if (start_time.length == 0) {
          this.$vux.toast.show({
            text: '请选择起始时间',
            type: 'text',
            width: '180px',
          })
          return;
        }
        if (end_time.length == 0) {
          this.$vux.toast.show({
            text: '请选择结束时间',
            type: 'text',
            width: '180px',
          })
          return;
        }

        if (remark.length == 0) {
          this.$vux.toast.show({
            text: '请输入预约事由',
            type: 'text',
            width: '180px',
          })
          return;
        }

        let reqData = {
          number_plate: number_plate,
          start_time: start_time,
          end_time: end_time,
          remark: remark,
          user_id:user_id,
          phone:phone
        };
        reseRegister(reqData).then(res => {
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
            text: "预约成功",
            type: 'text',
            width: '180px',
          })
          this.number_plate='';
          this.start_time='';
          this.end_time='';
          this.remark='';
          return;

        }).catch(err => {
          console.log(err)
        });
      },
    }
  }
</script>

<style lang="less" scoped>
  .loginBox {
    background-color: #fff;

    .headBox {
      position: relative;
      padding: 0px;

      img {
        position: absolute;
        top: 0;
        right: 0;
        width: 180px;
      }

      .headContent {
        padding-top: 20px;
        font-size: 34px;

        .leftBox {
          color: #04aaff;
          font-size: 40px;
        }

        .rightBox {
          display: inline-block;
          color: #04aaff;
          border-radius: 40px;
          border: 2px solid #04aaff;
          text-align: center;
          line-height: 60px;
          height: 80px;
          width: 140px;
          background-color: #fff;
          z-index: 3;
        }
      }
    }

    .loginContent {
      /*padding: 40px 80px;*/
      padding: 20px 80px;

      .loginTitle {
        font-size: 40px;
        font-weight: bold;
        padding: 20px 0;
        text-align: center;
      }

      .formList {
        // padding: 40px 0;
        height: 120px;
        padding-top: 30px;
        border-bottom: 2px solid #f0f0f0;

        .leftHint {
          /*background-color: #f6f6fe;*/
          color: #798696;
          padding: 2px 10px;
          margin-right: 10px;
          font-size: 32px;
          border-radius: 10px;
        }

        .inputBox {
          border: none;
          outline: none;
          font-size: 32px;
          flex-grow: 1;
          padding: 0 10px;
          height: 80px;
        }

        .seeBtn {
          width: 50px;
        }

        .authBtn {
          font-size: 30px;
          color: #04aaff;
        }

        .second {
          font-size: 30px;
          color: #04aaff;
        }
      }

      .handleBox {
        padding: 40px 0;
        font-size: 34px;
        color: #798696;

        .forget {
          color: #04aaff;
        }
      }

      .loginBtn {
        margin-top: 40px;
        text-align: center;
        padding: 16px 40px;
        border-radius: 8px;
        font-size: 40px;
        color: #ffffff;
        background-color: rgb(239, 83, 80);
      }

      .loginBtn.active {
        background: linear-gradient(60deg, #98d8ff, #06a9f5);
        color: #fff;
      }

      .moreGoIn {
        text-align: center;
        color: #798696;
        font-size: 36px;
        display: block;
        margin-top: 40px;
      }
    }
  }
</style>
