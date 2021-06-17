<template>
  <div class="account-contain">
    <div class="account-baseInfo">
      <div class="left">
        <div>
          <i class="el-icon-user-solid"></i>
        </div>
        <h3>测试名</h3>
      </div>
      <div class="right">
        <ul>
          <li>
            <p class="myschool">
              <svg-icon icon-class="account-school"></svg-icon>
            </p>
             <span>五道口职业技术学院</span>
          </li>
          <li>
            <p class="mymajor">
              <svg-icon icon-class="account-major"></svg-icon>
            </p>
            <span>航空制造专业</span></li>

          <li>
            <p class="myclass">
              <svg-icon icon-class="account-class"></svg-icon>
            </p>
            <span>13741班</span>
          </li>
        </ul>
        <div class="long-string"></div>
        <div class="brief">
          <p>简介:</p>
          <div class="brief-content">暂无</div>
        </div>
      </div>
    </div>
    <div class="nav">
      <div
        class="nav-item"
        v-for="(item, index) in navItems"
        :key="index"
        :class="activeIndex === index ? 'active': ''"
        @click="myAcountMenuClick(item, index)"
      >
        <span> {{ item.name }}  </span>
      </div>
    </div>
    <div class="race-pro">
      <div v-if="activeIndex === 0" class="race-record">
        <table-com :tableData="tableRace.tableDataRace" :tableHeader="tableRace.tableHeaderRace" :border="false"></table-com>
        <page-table :api="ajaxApi" :defaultData="tableRace.tableDataRace">
        </page-table>
      </div>
      <template v-else>
        <div class="zhishu">
          <div class="stock-index" v-for="(item,index) in allIndex" :key="index">
            <dl>
              <dt>{{ item.name }}</dt>
              <dd>
                <strong>{{ item.now }}</strong>
                <span :class="[item.floatn > 0 ? 'rise':'fall']">{{ item.float }}
                  <br />
                  {{ item.floatn }}
                </span>
                <img src=""/>
              </dd>
            </dl>
        </div>
        </div>
        <div class="table">
          <table-com :tableData="tablePro.tableDataPro" :tableHeader="tablePro.tableHeaderPro" :border="false"></table-com>
          <page-table :api="ajaxApi" :defaultData="tablePro.tableDataPro" ></page-table>
        </div>
        <div class="show-charts">
          <div class="left" id="leftCharts"></div>
          <div class="right">
            <table-com :tableData="tableRank.tableDataRank" :tableHeader="tableRank.tableHeaderRank" :border="false"></table-com>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, reactive, inject, onUpdated } from "vue"
import { competitionResults } from "@/api/myAccount"
import { accountoption, tableRace, tablePro, tableRank } from "./myAccount"
export default {
  setup () {
    // 引入图表
    const echarts = inject("ec")
    const navItems = [
      { name: "竞赛战绩", path: "/raceRecord" },
      { name: "自选商品", path: "/optionalProduction" }
    ]
    const activeIndex = ref(0)
    const myAcountMenuClick = (i, index) => {
      activeIndex.value = index
    }
    // 竞赛战绩
    const ajaxApi = reactive({
      getList (param) {
        return competitionResults(param)
      }
    })
    // 自选商品
    const allIndex = [
      {
        name: '上证指数',
        now: '3463.17',
        float: '-0.28%',
        floatn: -9.87
      },
      {
        name: '深证成指',
        now: '14209.44',
        float: '0.46%',
        floatn: 12.33
      },
      {
        name: '创业板指',
        now: '2940.12',
        float: '0.79%',
        floatn: 23.15
      }
    ]
    // 绘制图表
    onUpdated(() => {
      if (activeIndex.value) {
        const myChart = echarts.init(document.getElementById('leftCharts'))
        myChart.setOption(accountoption)
        // 图表自适应大小
        window.onresize = function () {
          myChart.resize()
        }
      }
    })
    return {
      navItems,
      activeIndex,
      myAcountMenuClick,
      ajaxApi,
      allIndex,
      tableRace,
      tablePro,
      tableRank
    }
  }
}
</script>

<style lang="scss" scoped>
$boder-color: #ebebeb;
@import "@/styles/interaction.scss";
.account-contain {
  padding-top: 23px;
  text-align: center;
}
.account-baseInfo {
  display:flex;
  height:190px;
  .left {
    >div{
      width:80px;
      height:80px;
      border-radius:50%;
      background: #FBE6E6;
      i{
        font-size: 66px;
        color: $primary-light-color;
        line-height: 80px;
      }
    }
    border: 1px solid $boder-color;
    border-radius: 4px;
    width:304px;
    margin-right:20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .right {
    border: 1px solid $boder-color;
    border-radius: 4px;
    flex: 1;
    display: flex;
    padding:6px 0 ;
    align-items: center;
    >ul {
      width:320px;
      padding-left: 80px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      >li {
        list-style: none;
        // margin: 0 auto;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        text-align: left;
        &:nth-child(2) {
          padding: 16px 0 ;
        }
        p{
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin: 0;
          display: inline-block;
          margin-right: 16px;
          text-align: center;
          .svg-icon{
            line-height: 36px;
            font-size: 30px;
            padding-top: 3px;
          }
        }
        .myschool {
          background: #FBE6E6;
        }
        .mymajor {
          background: #E1E6FA;
          .svg-icon{
            font-size: 26px;
            padding-top: 5px;
          }
        }
        .myclass {
          background: #FDF4DD;
        }
        span{
          line-height: 36px;
        }
      }
    }
    .long-string {
      // width: 1px;
      height:96px;
      border-right: 1px solid $boder-color;
    }
    .brief {
      flex: 1;
      text-align: left;
      margin: 0 40px;
      .brief-content {
        background: #ebebeb;
        border-radius: 4px;
        color: #8d8d8d;
        height: 100px;
        margin-left: 1em;
        text-indent:2em;
      }
    }
  }
}
// .race-name {
//   color: #222222;
//   font-size: 20px;
//   font-weight: bold;
//   // text-align: center;
//   margin-bottom: 23px;
// }
.nav {
  margin-top: 20px;
  border: 1px solid $boder-color;
  border-radius: 4px;
  display: flex;
  align-items: center;
  flex-direction: row;
  height: $sub-nav-height;
  // justify-content: center;
  color: rgba(34, 34, 34, 1);
  font-size: 16px;
  padding-left: 16px;
  .nav-item {
    margin-right: 56px;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    // 特殊的 tabs 交互
    // @include tabs-interaction('true');
    // 一般的
    @include tabs-interaction("false");
  }
}
.race-pro {
  >div{
    border: 1px solid $boder-color;
    border-radius: 4px;
    padding:12px 24px;
    margin-top: 20px;
  }
  .rise{
    color:$rise-color-green
  }
  .fall{
    color:$fall-color-green
  }
  max-height: 442px;
  // border: 1px solid $boder-color;
  // border-radius: 4px;
  // padding:12px 24px;
  .zhishu{
    display: flex;
    justify-content: space-between;
    border: none;
    padding: 0;
    >div{
      border: 1px solid $boder-color;
      border-radius: 4px;
      padding:12px 24px;
    }
    dl{
      // padding:24px 12px 24px;
      // border: 1px solid red;
      text-align: left;
      dt{
        // text-align: left;
        font-weight: bolder;
      }
      dd{
        margin-inline-start: 0;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        img{
          width: 135px;
          height: 63px;
        }
      }
      span{
        width: 70px;
        font-size: 12px;
        padding-left: 8px;
      }
    }
  }
  .show-charts{
    display: flex;
    justify-content: space-between;
    border: none;
    height: 587px;
    padding: 0;
    >div{
      border: 1px solid $boder-color;
      border-radius: 4px;
      margin-bottom: 42px;
      padding:12px 24px;
    };
    .left{
      width:916px;
      margin-right:20px;
    }
    .right{
      flex: 1;
    }
  }
}
.el-popper__arrow{
      width: 200px;
    }
::v-deep{
  .el-dropdown{
    color: rgba(34, 34, 34, 1);
    font-size: 16px
  }
  .el-popper__arrow{
      width: 200px;
    }
  .el-dropdown-menu__item{
    width: 320px;
    height: 40px;
    opacity: 1;
    padding: 0 16px;
    // background: #faf5f5;
  }
}
</style>
