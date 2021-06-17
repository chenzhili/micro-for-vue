<template>
  <div class="shop">
    <div class="title">积分商城</div>
    <div class="sub">努力学习还可以换礼物！！！</div>
    <svg-icon icon-class="shop" class-name="icon-shop"></svg-icon>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.shop {
  width: 298px;
  height: 261px;
  background-color: #ffffff;
  border: 1px solid $divide-line-color;
  border-radius: 9px;
  overflow: hidden;
  position: relative;
  user-select: none;
  cursor: pointer;
  .title{
    font-size: 24px;
    font-family: $zh-bold;
    font-weight: 700;
    text-align: left;
    color: $primary-light-color;
    margin: 24px 0 0 24px;
  }
  .sub{
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    color: rgba(224,88,91,0.50);
    margin: 18px 0 0 24px;
  }
  .icon-shop{
    width: 100px;
    height: 100px;
    position: absolute;
    right: 16px;
    bottom: 14px;
  }
}
</style>
