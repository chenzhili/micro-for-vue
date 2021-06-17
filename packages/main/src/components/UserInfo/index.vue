<template>
  <div class="user-info">
    <div class="avtar">
      <el-image class="imgBox" :src="avatar || headerImage" fit="contain"></el-image>
    </div>
    <div class="name">{{ nickName }}</div>
  </div>
</template>

<script>
import { useStore } from "vuex"
import { computed } from "vue"
import { getBasicInfo } from "@/utils/auth"
import headerImage from "@/assets/person/touxiang.png"

export default {
  setup (porps) {
    const store = useStore()
    return {
      avatar: computed(() => getBasicInfo().portrait),
      nickName: computed(() => getBasicInfo().nickname),
      headerImage: headerImage
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  width: 298px;
  height: 189px;
  background-color: #ffffff;
  border: 1px solid $divide-line-color;
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;

  .avtar {
    width: 80px;
    height: 80px;
    background-color: #fff;
    border-radius: 50%;
    margin-top: 36px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    .imgBox{
      width: 100%;
    }
    img{
      width: 100%;
      height: 100%;
    }
  }

  .name {
    font-size: 16px;
    font-family: $zh-bold;
    font-weight: 700;
    color: #000000;
    margin-top: 18px;
    cursor: pointer;
  }
}
</style>
