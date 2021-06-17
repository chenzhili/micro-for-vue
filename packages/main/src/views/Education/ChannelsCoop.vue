<template>
  <div>
    <div class="agent contain">
      <div class="contain-title">
        <span>AGENT</span>
        <h3>代理加盟</h3>
      </div>
      <div class="card-box">
        <div class="icon-card card">
          <img src="@/assets/education/channel_icon1.png" alt />
          <span>在乾隆教育授权区域开展代理销售业务</span>
        </div>
        <div class="icon-card card">
          <img src="@/assets/education/channel_icon2.png" alt />
          <span>完善的产品培训</span>
        </div>
        <div class="icon-card card">
          <img src="@/assets/education/channel_icon3.png" alt />
          <span>协助平台开展区域内营销活动推广</span>
        </div>
      </div>
    </div>
    <div class="contact contain">
      <div class="contain-title">
        <span>AFFILIATE CONTACT</span>
        <h3>加盟联系</h3>
      </div>
      <div class="card-box">
        <div v-for="item in 9" :key="item" class="contact-card card">
          <p>王经理</p>
          <div>
            <div>
              <div class="card-text">
                <span>区域：</span>
                <span>江苏、上海、广东、广西、 海南</span>
              </div>
              <div class="card-text">
                <span>电话：</span>
                <span>15566667777</span>
              </div>
            </div>
            <img src="@/assets/education/tx.png" alt />
          </div>
        </div>
      </div>
    </div>

    <div class="business contain">
      <div class="contain-title">
        <span>BUSINESS COOPERATION</span>
        <h3>商务合作</h3>
      </div>
      <div class="card-box">
        <div class="contact-card card">
          <p>王经理</p>
          <div>
            <div>
              <div class="card-text">
                <span>区域：</span>
                <span>江苏、上海、广东、广西、 海南</span>
              </div>
              <div class="card-text">
                <span>电话：</span>
                <span>15566667777</span>
              </div>
            </div>
            <img src="@/assets/education/tx.png" alt />
          </div>
        </div>
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
.agent {
  padding-top: 64px;
}
.contact {
  padding-top: 64px;
}
.business {
  .card-box{
    justify-content: center;
  }
}

.card-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .card {
    width: 355px;
    border: 1px solid #bab6b6;
    color: #8a8787;
    margin-bottom: 40px;
  }
}
.icon-card {
  height: 175px;
  padding: 35px 9px 25px;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  span {
    display: block;
    font-size: 18px;
  }
}
.contact-card{
  height: 215px;
  box-sizing: border-box;
  padding: 40px 16px 40px 27px;
  p{
    font-size: 18px;
    text-align: center;
    margin: 0 0 25px;
    &+div{
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
  }
  .card-text{
    display: flex;
    span{
      // display: inline-block;
      &:first-child{
        width: 48px;
        flex-shrink: 0;
      }
      &:last-child{
        width: 168px;
      }
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
</style>
