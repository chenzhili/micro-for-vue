<template>
  <div class="message">
    <div class="left">
      <div class="time" v-for="(item, index) in timeList" :key="index">
        <div class="time-label">{{ item.label }}</div>
        <div class="time-value">
          <div class="times" v-if="item.hour">{{ item.hour }}<span>小时</span>{{item.minute}}<span>分钟</span></div>
          <div class="times" v-if="item.value">{{item.value}}<span>次</span></div>
          </div>
      </div>
    </div>
    <div class="right">
      <div class="left-msg">
        <div class="photo-title">
          <img src="@/assets/person/school.png" alt="图片加载失败" />
          <span class="title">五道口职业技术学院</span>
        </div>
        <div class="photo-title">
          <img src="@/assets/person/zhuanye.png" alt="图片加载失败" />
          <span class="title">航空制造专业</span>
        </div>
        <div class="photo-title">
          <img src="@/assets/person/class.png" alt="图片加载失败" />
          <span class="title">130711班</span>
        </div>
      </div>
      <div class="right-msg">
        <div class="img">
          <img src="@/assets/person/leida.png" alt="图片加载失败" />
        </div>
        <div class="title">能力雷达图</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timeList: [
        { label: "学习时长", value: "", hour: '156', minute: '14' },
        { label: "实训次数", value: "15", hour: '', minute: '' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  width: 878px;
  height: 189px;
  opacity: 1;
  background: #ffffff;
  border: 1px solid #ebebeb;
  border-radius: 9px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .left {
    display: flex;
    align-items: center;
    width: 360px;
    height: 95px;
    border-right: 1px solid #ebebeb;
    margin-left: 70px;
    .time {
      margin-right: 80px;
      .time-label {
        font-size: 16px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        color: #222;
        text-align: left;
        margin-bottom: 16px;
      }
      .time-value {
        font-size: 24px;
        font-family: Arial, Arial-Regular;
        font-weight: 400;
        color: #e0585b;
        text-align: left;
        span{
          font-size: 14px;
        }
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    padding-left: 80px;
    .left-msg {
      margin-right: 80px;
      padding-top: 15px;
      .photo-title {
        width: 196px;
        height: 36px;
        display: flex;
        align-items: center;
        margin-bottom: 18px;
        img {
          margin-right: 16px;
        }
        .title {
          font-size: 16px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #222222;
        }
      }
    }
    .right-msg {
      .img {
        margin-bottom: 8px;
        text-align: center;
      }
      .title {
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #1d64f2;
      }
    }
  }
}
</style>
