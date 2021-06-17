<template>
  <div class="education-footer">
    <div class="contain">
      <div class="left">
        <div class="title">
          <h3>QLZHY</h3>
          <h4>乾隆智慧云</h4>
        </div>
        <div class="text m40">
          乾隆集团倾力打造的高校培训教育综合平台。
          <br />机构用户、高校用户、个人用户可以在此平台刷题训练，也可以参与模拟竞赛，使用模拟资金体验实盘操作。
        </div>
        <div class="text">
          ©CDQL QLZHY,powered by cdql.
          <br />转载内容版权归作者及来源网站所有，商业媒体及纸媒请先联系：cdql@Qianlong.com
          <br />法律声明 蜀ICP备09109183号-25
          <img src="@/assets/education/police1.png" alt />
          <img src="@/assets/education/police2.png" alt /> 蜀公网安备 33010002000124号
        </div>
      </div>
      <div class="right">
        <div class="contact">
          <h4>联系我们</h4>
          <div class="contact-way">
            <div>
              <img src="@/assets/education/footer_phone.png" alt />
              <span>电话：028-86679941</span>
            </div>
            <div>
              <img src="@/assets/education/footer_mail.png" alt />
              <span>邮箱：cdql@qianlong.com</span>
            </div>
          </div>
        </div>
        <div class="icon-box">
          <img src="@/assets/education/footer_vx.png" alt />
          <img src="@/assets/education/footer_az.png" alt />
          <img src="@/assets/education/footer_apple.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.education-footer {
  height: 509px;
  background: url("@/assets/education/footer_bg.png") no-repeat;
  color: #fff;
  padding: 261px 0 40px;
  box-sizing: border-box;
  .contain {
    display: flex;
    justify-content: space-between;
    .left {
      .title {
        display: flex;
        h3 {
          font-size: 24px;
          letter-spacing: 1px;
          position: relative;
          margin-top: 0;
          &::after {
            content: "+";
            top: -10px;
            right: -24px;
            color: #e60012;
            position: absolute;
          }
        }
        h4 {
          margin-top: 0;
          font-size: 20px;
          font-weight: normal;
          margin-left: 36px;
        }
      }
      .text {
        font-size: 14px;
        line-height: 24px;
        img{
          vertical-align: sub;
          margin: 0 5px;
        }
      }
      .m40 {
        margin-bottom: 30px;
      }
    }
    .right {
      h4 {
        font-size: 20px;
        font-weight: normal;
        margin-top: 0;
      }
      .contact-way {
        & > div {
          display: flex;
          align-items: center;
          font-size: 14px;
          line-height: 36px;
          img {
            margin-right: 10px;
          }
        }
      }
      .icon-box {
        margin-top: 45px;
        display: flex;
        width: 162px;
        justify-content: space-between;
      }
    }
  }
}
</style>
