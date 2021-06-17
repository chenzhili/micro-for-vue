<template>
  <div class="change-psw">
    <!-- 实训图片 -->
    <div class="img"></div>
    <!-- 文本内容 -->
    <div class="content">
      <div class="content-title">
        <span class="content-title-span1">{{content.title}}</span>
        <span class="content-title-span2">已报名</span>
      </div>
      <!-- 报名时间和比赛时间 -->
      <div class="content-explain">
        <div class="content-explain-div1">
          <span>报名：</span>
          <span>{{content.applyTime}}</span>
        </div>
        <div>
          <span>比赛：</span>
          <span>{{content.raceTime}}</span>
        </div>
      </div>
      <div class="content-button">继续实训</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => {
        return {
          title: "乾隆",
          applyTime: "2021.01.30-2021.02.28",
          raceTime: "2021.01.30-2021.02.28",
          applyState: 0,
          imgUrl: ""
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content-explain-div1 {
  margin-bottom: 3px;
}
.content-button {
  width: 100%;
  height: 40px;
  background-color: #e0585b;
  color: #fafafa;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  cursor: pointer;
  &:hover{
    background-color: #D9464A;
  }
}
.content-schedule {
  font-size: 12px;
  margin: 10px 0 15px 0;
}
.content-schedule1 {
  color: #222222;
}
.content-schedule {
  color: red;
}
.change-psw {
  width: 280px;
  height: 330px;
  opacity: 1;
  background: #ffffff;
  border: 1px solid #ebebeb;
  margin-top: 20px;
  border-radius: 10px;
  overflow: hidden;
}
.change-psw:after {
  content: '';
  width: 280px;
}
.img {
  width: 100%;
  height: 180px;
  background-color: gray;
}
.content {
  width: 240px;
  margin: 15px auto;
}
.content-title {
  font-size: 14px;
  font-weight: 600;
  color: #222222;
  display: flex;
  justify-content: space-between;
}
.content-title-span2 {
  border: 1px solid #e0585b;
  color: #e0585b;
  font-size: 10px;
  padding: 2px;
  font-weight: 500;
}
.content-explain {
  font-size: 12px;
  color: #bbbbbb;
  margin: 15px 0 10px 0;
}
</style>
