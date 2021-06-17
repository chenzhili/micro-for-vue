<template>
  <div class="app-footer">
    <div class="footer-content">
      <div class="top">
        <div class="top-left">
          <svg-icon class-name="footer-logo" icon-class="footer-logo"></svg-icon>
          <div class="app-name">乾隆集团倾力打造的高校培训教育综合平台</div>
        </div>
        <div class="top-right">
          <div class="link">联系我们</div>
          <div class="link">产学合作</div>
          <div class="link">意见反馈</div>
          <div class="link">法律条款</div>
          <div class="link">友情链接</div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-left">
          <div class="archival-info">
            <img class="icon" src="@/assets/jinhui.png" />
            <span class="text">
              <span>蜀公网安备 33010002000124号</span>
              <span>蜀ICP备09109183号-25</span>
              <span>©CDQL QLZHY,powered by cdql.</span>
            </span>
          </div>
          <div class="ohter-info">
            <span
              >转载内容版权归作者及来源网站所有，商业媒体及纸媒请先联系：cdql@Qianlong.com</span
            >
            <span>举报邮箱：chengdu@qqg.com</span>
          </div>
        </div>
        <div class="bottom-right">
          <svg-icon class-name="wechat" icon-class="wechat2"></svg-icon>
          <svg-icon class-name="android" icon-class="Android"></svg-icon>
          <svg-icon class-name="ios" icon-class="iOS"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.app-footer {
  width: 100%;
  height: 230px;
  background: #282828;

  .footer-content {
    width: 1200px;
    margin: 0 auto;

    .top {
      color: #999999;
      display: flex;
      height: 140px;
      border-bottom: 1px solid #333333;
      .top-left {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        .footer-logo {
          width: 237px;
          height: 42px;
          margin-top: 25px;
          user-select: none;
        }
        .app-name {
          font-size: 16px;
          font-weight: 400;
          text-align: left;
          color: #999999;
          letter-spacing: 2px;
          margin-top: 16px;
        }
      }
      .top-right {
        flex: 1;
        display: flex;
        height: 140px;
        font-size: 14px;
        margin-left: 280px;
        align-items: center;
        justify-content: space-between;
        .link {
          cursor: pointer;
        }
      }
    }

    .bottom {
      color: #666666;
      display: flex;
      padding-top: 24px;

      .bottom-left {
        font-size: 12px;
        font-weight: 400;
        text-align: left;
        color: #666666;
        .archival-info {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .icon {
            width: 17px;
            height: 17px;
            margin-right: 6px;
          }
          .text {
            span {
              padding: 0 16px;
              border-right: 1px solid #666666;
              cursor: pointer;
              &:first-child {
                padding-left: 0;
              }
              &:last-child {
                border-right: none;
                cursor: auto;
              }
            }
          }
        }

        .ohter-info {
          margin-top: 9px;
          span {
            padding: 0 16px;
            border-right: 1px solid #666666;
            &:first-child {
              padding-left: 0;
            }
            &:last-child {
              border-right: none;
            }
          }
        }
      }

      .bottom-right {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        .svg-icon {
          width: 34px;
          height: 34px;
          margin-left: 48px;
          cursor: pointer;
          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>
