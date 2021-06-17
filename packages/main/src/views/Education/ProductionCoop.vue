<template>
  <div>
    <div class="scope">
      <span>合作范围</span>
      <img src="@/assets/education/contain.png" alt="">
    </div>
    <div class="method">
      <div class="contain-title">
        <span>COOPERATION METHOD</span>
        <h3>合作方式</h3>
      </div>
      <div class="method-contain contain">
        <ul class="ul">
          <li>高教司产学研项目支持</li>
          <li>虚拟仿真项目落地</li>
          <li>线上教学平台</li>
          <li>校园活动合作</li>
          <li>战略投资合作</li>
        </ul>
        <img src="@/assets/education/pro_coop1.png" alt />
      </div>
    </div>

    <div class="support">
      <div class="contain-title">
        <span>PROGRAM INTRODUCTION</span>
        <h3>提供支持</h3>
      </div>
      <div class="support-contain contain">
        <div class="support-item">
          <img src="@/assets/education/pro_icon1.png" alt="">
          <span>技术支持</span>
        </div>
        <div class="support-item">
          <img src="@/assets/education/pro_icon2.png" alt="">
          <span>市场支持</span>
        </div>
        <div class="support-item">
          <img src="@/assets/education/pro_icon3.png" alt="">
          <span>品牌支持</span>
        </div>
      </div>
    </div>

    <div class="result">
      <div class="contain-title">
        <span>COOPERATION RESULT</span>
        <h3>合作成果</h3>
      </div>
      <div class="result-contain contain">
        <img src="@/assets/education/pro_coop2.png" alt />
        <ul class="ul">
          <li>打造精品课程</li>
          <li>打造国家级虚拟仿真项目</li>
          <li>深化产学研合作</li>
        </ul>
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
export default {}
</script>

<style lang="scss" scoped>
.scope {
  width: 526px;
  height: 84px;
  margin: auto;
  padding: 0 48px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: -50px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 3px 30px 0px rgba(67, 97, 238, 0.15);
  span {
    position: relative;
    font-size: 24px;
    &::after {
      content: "";
      position: absolute;
      left: 134px;
      width: 1px;
      height: 50px;
      top: -12px;
      background-color: #dedede;
    }
  }
}
.method {
  .method-contain {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 260px;
    box-sizing: border-box;
    img{
      margin-left: 350px;
    }
  }
}
.support{
  background-color: #F9F8FD;
  padding: 64px 0;
  box-sizing: border-box;
  .support-contain{
    display: flex;
    justify-content: space-around;
    .support-item{
      width: 460px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      &::before{
        content: "";
        position: absolute;
        left: 0px;
        width: 1px;
        height: 73px;
        background-color: #DBDBDB;
      }
      &:first-child{
        &::before{
          content: none;
        }
      }
      span{
        margin-top: 26px;
      }
    }
  }
}

.result{
  padding-top: 64px;
  .result-contain{
    display: flex;
    align-items: center;
    img{
      margin-right: 96px;
    }
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

.cooperation{
  background-image: linear-gradient(to right, #4562EE, #95A7F9);
  // height: 182px;
  .cooperation-contain{
    color: #ffffff;
    padding: 50px 0;
    box-sizing: border-box;
  }
}

.ul {
  list-style: none;
  padding-left: 35px;
  li {
    line-height: 50px;
    font-size: 18px;
    position: relative;
    color: #3E3E3E;
    &::before {
      content: "";
      position: absolute;
      left: -34px;
      top: 50%;
      transform: translateY(-50%);
      width: 18px;
      height: 18px;
      background-color: #4361EE;
      border-radius: 50%;
    }
  }
}
</style>
