<template>
  <div>
    <div class="contain status">
      <div class="status_tabs">
        <div class="status_head">排名类型</div>
        <div
          class="status_tab"
          v-for="item in statusList"
          :key="item.value"
          :class="{ active: statusTab === item.value }"
          @click="statusTab=item.value"
        >{{ item.label }}</div>
      </div>
    </div>
    <div class="content">
      <div class="aside">
        <div
          class="aside-item"
          v-for="item in asideType"
          :key="item.value"
          :class="{ active: asideTab === item.value }"
          @click="asideTab=item.value"
        >{{item.label}}</div>
      </div>
      <div class="rank-area contain">
        <div class="type-tabs">
          <div
            class="tab"
            v-for="item in rankType"
            :key="item.value"
            :class="{ active: rankTab === item.value }"
            @click="rankTab=item.value"
          >{{item.label}}</div>
        </div>
        <div class="rank-list">
          <div class="th">
            <div
              v-for="(item,index) in tableConfig"
              :style="{width:item.width+'px'}"
              :key="index"
            >{{item.label}}</div>
          </div>
          <div class="tr cur-rank">
            <div v-for="(td,index) in tableConfig" :style="{width:td.width+'px'}" :key="index">
              <template v-if="td.props==='portrait'">
                <div class="portrait">
                  <img src alt />
                  <div class="ranking">NO.1</div>
                </div>
              </template>
              <template v-else>{{td.sub}}{{curRank[td.props]}}</template>
            </div>
          </div>

          <div class="divider"></div>

          <page-table ref="pageRef" :defaultData="tableData">
            <template #="tableScope">
              <div class="tr" v-for="(item,index) in tableScope.datas" :key="index">
                <div
                  v-for="(td,tindex) in tableConfig"
                  :style="{width:td.width+'px'}"
                  :key="tindex"
                >
                  <template v-if="td.props==='portrait'">
                    <div class="portrait">
                      <img src alt />
                      <div
                        class="ranking"
                        :style="{backgroundColor:topThree[index]?topThree[index]:'#dfdfdf'}"
                      >NO.{{index+1}}</div>
                    </div>
                  </template>
                  <template v-else>{{td.sub}}{{item[td.props]}}</template>
                </div>
              </div>
            </template>
          </page-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { data } from "./fakeData"
import { ref } from "vue"
export default {
  setup () {
    const statusList = [
      { label: "个人", value: 0 },
      { label: "学校", value: 1 },
      { label: "学院", value: 2 },
      { label: "学系", value: 3 },
      { label: "专业", value: 4 },
      { label: "班级", value: 5 }
    ]

    const asideType = [
      { label: "收益率", value: 0 },
      { label: "交易金额", value: 1 },
      { label: "交易次数", value: 2 },
      { label: "总资产", value: 3 }
    ]

    const rankType = [
      { label: "开赛以来", value: 0 },
      { label: "当日排行", value: 1 },
      { label: "本周排行", value: 2 },
      { label: "本月排行", value: 3 }
    ]

    const topThree = ["#FFD82A", "#E4E6E5", "#F3C677"]

    const tableConfig = [
      { label: "排名", width: 50, props: "portrait" },
      { label: " ", width: 150, props: "studentname", sub: "姓名：" },
      { label: "选手信息", width: 150, props: "strudentcode", sub: "账号：" },
      { label: "总市值", width: 150, props: "totalmaketvalue" },
      { label: "资金余额", width: 150, props: "balance" },
      { label: "收益率", width: 150, props: "yield" }
    ]

    const statusTab = ref(0)
    const asideTab = ref(0)
    const rankTab = ref(0)
    const tableData = data.info
    const curRank = data.info[0]

    return {
      statusList,
      asideType,
      rankType,
      tableConfig,
      topThree,

      tableData,
      curRank,

      statusTab,
      asideTab,
      rankTab
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/common.scss';
.contain {
  @include contain()
}
.content {
  display: flex;
  .aside {
    width: 83px;
    .aside-item {
      width: 83px;
      height: 64px;
      background: #ffffff;
      border: 1px solid #ebebeb;
      border-radius: 12px 0px 0px 12px;
      line-height: 64px;
      text-align: center;
      margin-top: 24px;
      cursor: pointer;
      &:first-child {
        margin-top: 49px;
      }
      &.active {
        color: #e0585b;
        border-color: #e0585b;
      }
    }
  }
  .rank-area {
    flex-grow: 1;
    .type-tabs {
      display: flex;
      margin-bottom: 20px;
      .tab {
        width: 104px;
        height: 40px;
        border: 1px solid #dddddd;
        border-radius: 13px 13px 0 0;
        line-height: 40px;
        text-align: center;
        margin-right: 56px;
        cursor: pointer;
        &.active {
          color: #ffffff;
          background-color: #e0585b;
          border: none;
        }
      }
    }
    .rank-list {
      display: flex;
      flex-direction: column;
      .th,
      .tr {
        display: flex;
        justify-content: space-between;
        padding: 0 17px;
      }
      .tr {
        align-items: center;
        font-size: 14px;
        height: 94px;
        border: 1px solid #dddddd;
        border-radius: 15px;
        margin-top: 17px;
        .portrait {
          width: 48px;
          height: 48px;
          background: #ffffff;
          border: 1px solid #a8abae;
          border-radius: 50%;
          position: relative;
          .ranking {
            position: absolute;
            width: 50px;
            height: 19px;
            background: #dfdfdf;
            text-align: center;
            border-radius: 4px;
            font-size: 12px;
            bottom: -9px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
      .cur-rank {
        margin-bottom: 17px;
      }
      .divider {
        border-bottom: 1px dashed #707070;
      }
    }
  }
}

.status {
  padding: 0 24px;
  color: #222222;
}
.status_tabs {
  display: flex;
  align-items: center;
  height: 67px;
  width: 1342px;
  margin: 0 auto;
  font-size: 16px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  color: #222222;
  .status_head {
    width: 82px;
    height: 34px;
    opacity: 1;
    background: linear-gradient(50deg, rgba(248, 70, 70, 0.99) 4%, #ff8672 93%);
    border-radius: 17px 0 17px 0;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 48px;
  }
  .status_tab {
    margin-right: 48px;
    cursor: pointer;
    height: 65px;
    display: flex;
    align-items: center;
    &.active {
      color: #e0585b;
      border-bottom: 2px solid #e0585b;
    }
  }
}
</style>
