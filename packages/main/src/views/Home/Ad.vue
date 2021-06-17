<template>
  <div class="ad">
    <img src="@/assets/home/ad-img.png" class="ad-img" />
    <div class="ad-text">
      <div class="text-label1">行业访谈</div>
      <div class="text-label2">证券岗位何去何从？</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
 .ad{
    width: 300px;
    height: 130px;
    border-radius: 9px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: 0.3s;
    top: 0;
    &:hover {
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
      top: -4px;
    }

    .ad-img{
      position: absolute;
      top: 0;
      left: 0;
    }

    .ad-text{
      position: absolute;
      color: #ffffff;
      font-weight: 400;
      text-align: left;

      .text-label1{
        font-size: 24px;
        margin-top: 31px;
        margin-left: 24px;
      }
      .text-label2{
        font-size: 14px;
        margin-top: 14px;
        margin-left: 24px;
      }
    }
  }
</style>
