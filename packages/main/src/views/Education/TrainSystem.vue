<template>
  <div>
    <div class="nav">
      <div class="contain">
        <div class="tabs" :class="{'active-tab':centerTab==0}" @click="centerTab=0">全市场模拟投资教学解决方案</div>
        <div class="tabs" :class="{'active-tab':centerTab==1}" @click="centerTab=1">金融岗位模拟操作解决方案</div>
        <div class="tabs" :class="{'active-tab':centerTab==2}" @click="centerTab=2">金融就业解决方案</div>
      </div>
    </div>
    <div class="introduction">
      <div class="contain-title">
        <span>PROGRAM INTRODUCTION</span>
        <h3>方案介绍</h3>
      </div>
      <div class="intro-contain contain">
        <div>
          <img src="@/assets/education/sys_man.png" alt />
        </div>
        <div :class="centerTab==2?'intro-area-sp':'intro-area'">
          <div class="intro-item" v-for="(item,index) in introArr" :key="index">
            <div class="img-icon">
              <svg-icon
                :style="{'width':item.size.split('-')[0],'height':item.size.split('-')[1]}"
                :icon-class="item.icon"
                :class-name="item.className"
              ></svg-icon>
            </div>
            <p>{{item.title}}</p>
            <span>{{item.subTitle}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="scenarios">
      <div class="contain-title">
        <span>USAGE SCENARIOS</span>
        <h3>使用场景</h3>
      </div>
      <div class="scenarios-contain contain">
        <div class="scenarios-item" v-for="(item,index) in scenariosArr" :key="index">
          <img :src="scenariosList[index]" alt />
          <span>{{item}}</span>
        </div>
      </div>
    </div>

    <div class="product">
      <div class="product-contain contain">
        <div class="product-area">
          <h3>方案产品</h3>
          <div class="product-ul">
            <ul v-for="(list,listIndex) in productArr" :key="listIndex">
              <li v-for="(item,index) in list" :key="index">
                {{item}}
              </li>
            </ul>
          </div>
        </div>
        <div>
          <img src="@/assets/education/sys_product.png" alt />
        </div>
      </div>
    </div>

    <div class="partner">
      <div class="partner-contain contain">
        <div class="contain-title">
          <span>OUR PARTNER</span>
          <h3>合作客户</h3>
        </div>
        <h2>1000+学校/机构加入乾隆教育，已服务1400w+学生</h2>
        <PartnersShow></PartnersShow>
      </div>
    </div>
    <div class="cooperation">
      <div class="cooperation-contain contain">
        <h1>合作申请</h1>
        <span>提交成功后，我们会在24小时候内与您联系，为您提供定制化的企业培训方案。您也可拨打试用申请专线进行咨询：18488558933</span>
      </div>
    </div>
  </div>
</template>

<script>
import PartnersShow from "./components/PartnersShow"
import { ref, computed } from "vue"
import { MARKET, JOBS, EMPLOYMENT, scenariosList } from "./sysConfig"
export default {
  components: {
    PartnersShow
    // Market,
    // Jobs,
    // Employment
  },
  setup (props, content) {
    const centerTab = ref(0)
    const tabList = {
      0: MARKET,
      1: JOBS,
      2: EMPLOYMENT
    }
    return {
      centerTab,
      introArr: computed(() => tabList[centerTab.value].intro),
      scenariosArr: computed(() => tabList[centerTab.value].scenarios),
      productArr: computed(() => tabList[centerTab.value].product),
      scenariosList
    }
  }
}
</script>

<style lang="scss" scoped>
.partner {
  padding-top: 64px;
  h2 {
    margin-top: 0;
    text-align: center;
    font-weight: normal;
  }
}
.cooperation {
  background-image: linear-gradient(to right, #4562ee, #95a7f9);
  // height: 182px;
  .cooperation-contain {
    color: #ffffff;
    padding: 50px 0;
    box-sizing: border-box;
  }
}
.nav {
  width: 100%;
  height: 96px;
  line-height: 96px;
  box-shadow: 0px 3px 30px 0px rgba(104, 131, 255, 0.2);
  .contain {
    display: flex;
    justify-content: space-around;
    .active-tab {
      color: #4361ee;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 93px;
        height: 4px;
        background-color: #4361ee;
      }
    }
    .tabs {
      font-size: 20px;
      cursor: pointer;
    }
  }
}

.introduction {
  padding-top: 64px;
  box-sizing: border-box;
  height: 812px;
  .intro-contain {
    display: flex;
    justify-content: space-between;
  }
  .intro-area {
    width: 620px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .intro-item {
      width: 244px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 65px;
      p {
        margin: 15px 0 0;
        line-height: 50px;
      }
      span {
        font-size: 14px;
        color: #666666;
        line-height: 32px;
      }
    }
  }

  .intro-area-sp {
    width: 620px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .intro-item {
      display: flex;
      align-items: center;
      margin-bottom: 65px;
      justify-content: space-between;
      .img-icon{
        flex-shrink: 0;
      }
      p {
        flex-shrink: 0;
        width: 98px;
        margin: 0;
        line-height: 50px;
      }
      span {
        width: 376px;
        font-size: 14px;
        color: #666666;
        line-height: 32px;
      }
    }
  }
}
.scenarios {
  padding-top: 64px;
  box-sizing: border-box;
  height: 565px;
  background-color: #f9f8fd;
  .scenarios-contain {
    display: flex;
    justify-content: space-between;
    .scenarios-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        font-size: 20px;
        color: #666666;
      }
      img {
        width: 218px;
        height: 218px;
        margin-bottom: 50px;
      }
    }
  }
}
.product {
  height: 698px;
  background-image: linear-gradient(to right, #4a67ef, #a5b6ff);
  .product-contain {
    display: flex;
    padding-top: 38px;
    justify-content: space-between;
    align-items: center;
    .product-area {
      color: #ffffff;
      .product-ul {
        width: 503px;
        display: flex;
        justify-content: space-between;
      }
      h3 {
        font-size: 24px;
      }
      ul {
        display: inline-block;
        list-style: none;
        padding-left: 25px;
        li {
          line-height: 50px;
          font-size: 14px;
          position: relative;
          &::before {
            content: "";
            position: absolute;
            left: -23px;
            top: 50%;
            transform: translateY(-50%);
            width: 15px;
            height: 15px;
            background-color: #ffffff;
            border-radius: 50%;
          }
        }
      }
    }
  }
  img {
    width: 568px;
    height: 568px;
  }
}

.contain-title {
  width: 325px;
  height: 71px;
  line-height: 25px;
  text-align: center;
  border-bottom: 1px solid #dedede;
  position: relative;
  margin: 0 auto 65px;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 2px;
    background-color: #cbc2c2;
  }
  span {
    color: #a7a8ae;
    font-size: 22px;
  }
  h3 {
    color: #3e3e3e;
    font-size: 24px;
    margin: 0;
    margin-top: 4px;
  }
}

.img-icon {
  width: 91px;
  height: 91px;
  border-radius: 50%;
  box-shadow: 0px 3px 15px 0px rgba(146, 146, 146, 0.16);
  position: relative;
  .svg-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
