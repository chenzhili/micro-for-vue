<template>
  <div class="change-psw">
    <!-- 实训图片 -->
    <div class="img"></div>
    <!-- 文本内容 -->
    <div class="content">
      <div class="content-title">{{content.title}}</div>
      <div class="content-explain">{{content.explain}}</div>
      <div class="content-schedule">
        <span class="content-schedule1">已实训</span>
        <span class="content-schedule2">{{content.schedule}}%</span>
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
        return { title: "乾隆", explain: "说明", schedule: "0", imgUrl: "" }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
.change-psw:after{
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
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #222222;
}
.content-explain {
  font-size: 12px;
  color: #bbbbbb;
}
</style>
