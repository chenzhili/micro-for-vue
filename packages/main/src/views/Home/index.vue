<template>
  <div class="home">
    <div class="left margin">
      <Banner></Banner>
      <Menu class="margin"></Menu>
      <Module
        class="margin"
        alias="race"
        type="ACTIVITIES"
        :tab="avtivityTab"
        @tabChange="avtivityTabChange"
        @moreCallback="__custom__coopPer(btns, 'race', [ avtivityTabMoreCallback ])"
        :data="avtivityData"
      >
        <template #grid="scope">
          <div
            class="activity-item"
            @click="__custom__coopPer(btns, 'race', [ avtivityItemClickHandle, scope.item ])"
          >
            <div class="content">
              <div class="title">{{ scope.item.title }}</div>
              <div class="time">
                <div>报名：{{ scope.item.time1 }}</div>
                <div>比赛：{{ scope.item.time2 }}</div>
              </div>
              <div class="footer">
                <div class="num">{{ scope.item.num }} 已报名</div>
                <div class="status" :style="{'color':scope.item.status===0?'#1D64F2':scope.item.status===1?'#E0585B':''}">{{ raceStatus[scope.item.status] }}</div>
              </div>
            </div>
            <div class="indicator"></div>
          </div>
        </template>
      </Module>
      <Module class="margin" alias="train" type="ABILITIES" :data="abilitiesData">
        <template #grid="scope">
          <div
            class="abilities-item"
            @click="__custom__coopPer(btns, 'train', [ abilitiesItemClickHandle, scope.item ])"
          >
            <div class="content">
              <svg-icon :class="'icon-' + scope.item.icon" :icon-class="scope.item.icon"></svg-icon>
              <div class="label">{{ scope.item.label }}</div>
              <div class="sub">{{ scope.item.sub }}</div>
            </div>
            <div class="indicator"></div>
          </div>
        </template>
      </Module>
      <Module
        class="margin"
        alias="jobcertify"
        type="PROFESSIONAL"
        :tab="professionalTab"
        :data="professionalData"
        @tabChange="professionaTabChange"
      >
        <template #grid="scope">
          <div
            class="professional-item"
            @click="__custom__coopPer(btns, 'jobcertify', [ professionalItemClickHandle, scope.item ])"
          >
            <div class="content">
              <img class="img" src="@/assets/home/test.png" />
              <div class="label" v-html="scope.item.label"></div>
            </div>
            <div class="indicator"></div>
          </div>
        </template>
      </Module>
    </div>
    <div class="right margin">
      <Shop></Shop>
      <Hot class="margin" label="时事热点" icon="hot"></Hot>
      <Ad class="margin"></Ad>
      <Hot class="margin" label="金融文献" icon="book"></Hot>
    </div>
    <Float></Float>
  </div>
</template>
<script>
import Banner from "./Banner"
import Menu from "./Menu"
import Module from "./Module"
import Shop from "./Shop"
import Hot from "./Hot"
import Ad from "./Ad"
import Float from "./Float"
import InterstitialAdPopup from "@/plugins/dialog/InterstitialAdPopup"
import { getPublicity } from "@/api/publicity"
import { ref, onMounted } from "vue"
import { buttonAuth } from "@/utils/buttonAuth"

export default {
  components: { Banner, Menu, Module, Shop, Hot, Ad, Float },
  setup (props) {
    const avtivityTab = [
      { label: "可报名" },
      { label: "已报名" },
      { label: "已结束" }
    ]

    const professionalTab = [
      { label: "证券从业类" },
      { label: "基金从业类" },
      { label: "银行从业类" }
    ]

    const raceStatus = {
      0: '报名中',
      1: '比赛中',
      2: '报名结束'
    }

    const avtivityData = ref([])
    avtivityData.value = [
      {
        title: "乾隆杯期权比赛",
        time1: "2020-01-12 - 2020-03-23",
        time2: "2020-01-12 - 2020-03-23",
        num: "123234",
        status: 0
      },
      {
        title: "乾隆杯期权比赛",
        time1: "2020-01-12 - 2020-03-23",
        time2: "2020-01-12 - 2020-03-23",
        num: "123234",
        status: 1
      },
      {
        title: "乾隆杯期权比赛",
        time1: "2020-01-12 - 2020-03-23",
        time2: "2020-01-12 - 2020-03-23",
        num: "123234",
        status: 0
      },
      {
        title: "乾隆杯期权比赛",
        time1: "2020-01-12 - 2020-03-23",
        time2: "2020-01-12 - 2020-03-23",
        num: "123234",
        status: 1
      },
      {
        title: "乾隆杯期权比赛",
        time1: "2020-01-12 - 2020-03-23",
        time2: "2020-01-12 - 2020-03-23",
        num: "123234",
        status: 2
      },
      {
        title: "乾隆杯期权比赛",
        time1: "2020-01-12 - 2020-03-23",
        time2: "2020-01-12 - 2020-03-23",
        num: "123234",
        status: 0
      }
    ]

    const abilitiesData = [
      {
        icon: "lcjl",
        label: "理财经理",
        sub: "包含专业名词、销售话术、基础技能"
      },
      {
        icon: "tzgw",
        label: "投资顾问",
        sub: "包含财报分析、技术分析、投资声明周期"
      },
      { icon: "bxjj", label: "保险经纪", sub: "包含专业名词、保险法" },
      {
        icon: "hyfxs",
        label: "行业分析师",
        sub: "包含宏观指标、微观指标、行业分析法、数理基础"
      },
      {
        icon: "zqjyy",
        label: "证券交易员",
        sub: "包含K线理论、技术指标、交易法则"
      },
      {
        icon: "fkzy",
        label: "风控专员",
        sub: "包含证券法律法规、风险因子、风险控制、风险发现"
      }
    ]

    const professionalData = ref([])
    professionalData.value = [
      { image: "", label: "证券市场<br/>基本法律法规" },
      { image: "", label: "金融市场<br/>基础知识" },
      { image: "", label: "保荐代表人<br/>胜任能力考试" },
      { image: "", label: "证券分析师<br/>胜任能力考试" },
      { image: "", label: "证券投资顾问<br/>胜任能力考试" }
    ]

    const avtivityTabMoreCallback = () => {
      console.log("点击了更多")
    }
    const avtivityTabChange = e => {
      console.log(e)
    }
    const professionaTabChange = e => {
      console.log(e)
    }

    const avtivityItemClickHandle = item => {
      console.log(item)
    }
    const abilitiesItemClickHandle = item => {
      console.log(item)
    }
    const professionalItemClickHandle = item => {
      console.log(item)
    }

    // 获取插屏广告
    const getInterstitialAd = () => {
      getPublicity("sy_tc").then(res => {
        if (res.code === "000000" && res.data.length !== 0) {
          const url = res.data[0].imageUrl || ""
          const linkUrl = res.data[0].linkUrl || ""
          if (sessionStorage.getItem("openedAd")) return
          InterstitialAdPopup({ imageUrl: url }).then(res => {
            window.open(linkUrl)
          })
          sessionStorage.setItem("openedAd", true)
        }
      })
    }
    onMounted(() => {
      getInterstitialAd()
    })

    return {
      avtivityTab,
      raceStatus,
      professionalTab,
      avtivityData,
      abilitiesData,
      professionalData,
      avtivityTabMoreCallback,
      avtivityTabChange,
      professionaTabChange,
      avtivityItemClickHandle,
      abilitiesItemClickHandle,
      professionalItemClickHandle,
      ...buttonAuth()
    }
  }
}
</script>
<style scoped lang="scss">
@mixin hover-border {
  position: relative;
  .indicator {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 4px;
    opacity: 0;
    background: $primary-light-color;
  }

  &:hover {
    .indicator {
      width: 100%;
      left: 0;
      opacity: 1;
      transition: 0.2s;
    }
  }
}
.home {
  display: flex;
  justify-content: center;
  position: relative;
  background-color: #fafafa;
  padding-bottom: 48px;

  .margin {
    margin-top: 20px;
  }

  .left {
    margin-right: 20px;

    .activity-item {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      @include hover-border;

      .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .title {
          font-size: 18px;
          font-weight: 400;
          text-align: left;
          color: $primary-text-color;
          margin-bottom: 16px;
        }
        .time {
          font-size: 14px;
          font-weight: 400;
          text-align: left;
          color: $gray-text-color;
          div {
            margin-bottom: 8px;
            &:last-child {
              margin-bottom: 16px;
            }
          }
        }
        .footer {
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 400;
          text-align: left;
          .num {
            color: $gray-text-color;
          }
          .status {
            color: $gray-text-color;
          }
        }
      }
    }
    .abilities-item {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      @include hover-border;
      // .indicator {
      //   position: absolute;
      //   bottom: 0;
      //   left: 50%;
      //   width: 0;
      //   height: 4px;
      //   opacity: 0;
      //   background: $primary-light-color;
      // }

      // &:hover {
      //   .indicator {
      //     width: 100%;
      //     left: 0;
      //     opacity: 1;
      //     transition: 0.2s;
      //   }
      // }
      .content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        padding: 0 40px;

        .icon-lcjl {
          width: 52px;
          height: 38px;
          margin-bottom: 9px;
        }
        .icon-tzgw {
          width: 52px;
          height: 42px;
          margin-bottom: 5px;
        }
        .icon-bxjj {
          width: 52px;
          height: 42px;
          margin-bottom: 7px;
        }
        .icon-hyfxs {
          width: 52px;
          height: 37px;
          margin-bottom: 15px;
        }
        .icon-zqjyy {
          width: 52px;
          height: 47px;
          margin-bottom: 9px;
        }
        .icon-fkzy {
          width: 49px;
          height: 52px;
          margin-bottom: 7px;
        }
        .label {
          color: $primary-text-color;
        }
        .sub {
          color: $gray-text-color;
          margin-top: 8px;
        }
      }
    }

    .professional-item {
      height: 100%;
      display: flex;
      align-items: center;
      @include hover-border;
      .content {
        display: flex;
        align-items: center;
        padding: 0 20px;

        .img {
          width: 89px;
          height: 122px;
        }
        .label {
          flex: 1;
          font-size: 16px;
          font-weight: 700;
          text-align: left;
          color: $primary-text-color;
          margin-left: 18px;
          line-height: 30px;
          white-space: "pre-wrap";
        }
      }
    }
  }

  .right {
    position: relative;
  }
}
</style>
