<template>
  <div class="sub-nav">
    <el-menu
      :default-active="activeI"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#F9EEEE"
      text-color="#222222"
      active-text-color="#E0585B"
      router
    >
      <component
        v-for="(item,i) in subMenu"
        :popper-class="item.children?'sub-menu':''"
        :key="i"
        :index="item.path||''"
        :is="item.children?'el-submenu':'el-menu-item'"
      >
        <template #title>{{item.subText}}</template>
        <template v-if="item.children">
          <el-menu-item
            v-for="(citem,ci) in item.children"
            :key="ci"
            :index="citem.path"
          >{{citem.subText}}</el-menu-item>
        </template>
      </component>
    </el-menu>
  </div>
</template>

<script>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
export default {
  name: "subNav",
  setup () {
    const router = useRouter()
    const subMenu = [
      { subText: "我的地盘", path: "/index1" },
      { subText: "我的课程", path: "/index2" },
      { subText: "我的测评", path: "/index3" },
      {
        subText: "模拟交易",
        children: [
          { subText: "我的竞赛", path: "/raceEnter" },
          { subText: "我的练习", path: "/myPractice" },
          { subText: "我的账户", path: "/myAccount" }
        ]
      }
    ]
    const activeI = computed(() => router.currentRoute.value.fullPath)
    return {
      subMenu,
      activeI: computed(() =>
        router.currentRoute.value.fullPath.indexOf("/myRace") !== -1
          ? "/raceEnter"
          : router.currentRoute.value.fullPath
      )
    }
  }
}
</script>

<style scoped lang="scss">
.sub-menu {
  background: #ffffff;
  .el-menu-item {
    background-color: #ffffff !important;
    &:hover {
      background-color: #faf5f5 !important;
    }
  }
}
.el-menu {
  display: flex;
  justify-content: center;
}
.sub-nav {
  height: 56px;
  background-color: #f9eeee;
}

::v-deep {
  .el-menu-item,
  .el-submenu__title {
    font-size: 16px;
    padding: 0;
    margin: 0 28px;
  }
  .el-menu-item {
    &:hover {
      color: #e0585b !important;
    }
  }
  .el-submenu__title {
    position: relative;
    .el-icon-arrow-down {
      position: absolute;
      right: -26px;
      top: 30px;
      width: 15px;
      height: 8px;
      background: url("@/assets/myRace/sub_nav.png");
      &::before {
        content: "" !important;
      }
    }
  }
}
</style>
