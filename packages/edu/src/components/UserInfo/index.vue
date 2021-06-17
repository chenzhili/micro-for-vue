<template>
  <div class="user-info">
    <div class="avtar">
      <img/>
    </div>
    <div class="name">25K纯帅</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.user-info{
  width: 298px;
  height: 189px;
  background-color: #ffffff;
  border: 1px solid $divide-line-color;
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .avtar{
    width: 80px;
    height: 80px;
    opacity: 0.15;
    background-color: $primary-light-color;
    border-radius: 50%;
    margin-top: 36px;
    cursor: pointer;
  }

  .name{
    font-size: 16px;
    font-family: $zh-bold;
    font-weight: 700;
    color: #000000;
    margin-top: 18px;
    cursor: pointer;
  }
}
</style>
