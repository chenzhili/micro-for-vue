<template>
  <div
    class="nav"
    :style="{
      height: cList.list ? '125px' : '62px',
      borderRadius: isMargin ? '0 9px 9px 9px' : '9px'
    }"
  >
    <div class="margin-nav" v-if="isMargin">
      <div :class="{ active: marginTab === 0 }" @click="changeMargin(0)">信用交易</div>
      <div :class="{ active: marginTab === 1 }" @click="changeMargin(1)">普通交易</div>
    </div>
    <div class="nav-row" :style="{ 'border-bottom': cList.list ? '1px dashed #ebebeb' : 'none' }">
      <div
        class="nav-item"
        v-for="(item, fi) in navItems"
        :key="fi"
        :class="{ active: navStatus.first === item.name }"
        @click="handleFirst(fi)"
      >
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div class="c-nav" v-if="cList.list">
      <div
        class="c-item"
        v-for="(item, si) in cList.list"
        :key="si"
        :class="{
          active:
            navStatus.second === item.name && navStatus.first === cList.fName
        }"
        @click="handleSecond(si)"
      >{{ item.label }}</div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { getNavList } from "./navConfig"
import { getRaceConfig, getNavStatus } from "@/utils/auth.js"
export default {
  setup (props) {
    const store = useStore()
    const router = useRouter()
    const isGeneral = router.currentRoute.value.fullPath.indexOf('general') !== -1
    const raceConfig = JSON.parse(getRaceConfig())

    const navStatus = computed(() =>
      store.getters.navStatus.first
        ? store.getters.navStatus
        : JSON.parse(getNavStatus())
    )
    const navItems = getNavList(raceConfig.markettype)
    const cList = ref({})

    const changeStatus = (f, s) => {
      store.commit("competition/CHANGE_NAV_STATUS", {
        first: f,
        second: s
      })
    }

    const isMargin = raceConfig.markettype === 11
    const marginTab = ref(0)

    const changeMargin = e => {
      marginTab.value = e
      const firstItem = navItems[0]
      cList.value = {
        list:
          marginTab.value === 0
            ? firstItem.children.list
            : firstItem.children.list1,
        fName: firstItem.children.fName
      }
      changeStatus(cList.value.fName, cList.value.list[0].name)
      router.push({ name: cList.value.list[0].name })
    }

    const setStatus = (fi, si, isClick = false) => {
      const curItem = navItems[fi]
      if (curItem.hasChildren) {
        if (isMargin) {
          cList.value = {
            list:
              marginTab.value === 0
                ? curItem.children.list
                : curItem.children.list1,
            fName: curItem.children.fName
          }
        } else {
          cList.value = curItem.children
        }
        !isClick && changeStatus(cList.value.fName, cList.value.list[si].name)
      } else {
        changeStatus(curItem.name)
        if (isClick) {
          cList.value = {}
          router.push({ name: curItem.name })
        }
      }
    }

    const handleFirst = fi => {
      setStatus(fi, 0, true)
    }

    const handleSecond = si => {
      changeStatus(cList.value.fName, cList.value.list[si].name)
      router.push({ name: cList.value.list[si].name })
    }

    const init = () => {
      const { first, second } = navStatus.value
      if (isGeneral) marginTab.value = 1
      let fIndex, sIndex
      if (first) {
        fIndex = navItems.findIndex(item => item.name === first)
        if (navItems[fIndex].hasChildren) {
          sIndex = navItems[fIndex].children.list.findIndex(
            item => item.name === second
          )
          setStatus(fIndex, sIndex)
        } else {
          setStatus(fIndex)
        }
      } else {
        setStatus(0, 0)
      }
    }

    onMounted(() => {
      // init()
    })

    return {
      navItems,
      isMargin,
      marginTab,
      changeMargin,
      cList,

      navStatus,

      handleFirst,
      handleSecond
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/interaction.scss";
.nav {
  max-width: 1350px;
  height: 125px;
  opacity: 1;
  background: #ffffff;
  border: 1px solid #ebebeb;
  // border-radius: 9px;
  padding: 0 24px;
  transition: height 0.3s;
  position: relative;
  .nav-row {
    display: flex;
    height: 62px;
    border-bottom: 1px dashed #ebebeb;
    .nav-item {
      width: 64px;
      margin-right: 56px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      @include tabs-interaction("true");
    }
  }
  .margin-nav {
    position: absolute;
    display: flex;
    color: #8d8d8d;
    top: -37px;
    left: -1px;
    & > div {
      width: 100px;
      height: 36px;
      border-radius: 9px 9px 0 0;
      text-align: center;
      line-height: 36px;
      cursor: pointer;
      &:first-child {
        margin-right: 17px;
      }
      &.active {
        background-color: #ffffff;
        font-weight: bold;
        color: #e0585b;
        border: 1px solid #ebebeb;
        border-bottom: none;
      }
    }
  }
}
.c-nav {
  position: absolute;
  display: flex;
  align-items: center;
  height: 62px;
  font-size: 14px;
  .c-item {
    white-space: nowrap;
    height: 19px;
    text-align: center;
    color: #222222;
    margin-right: 24px;
    padding: 9px 16px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
    &:hover {
      color: #e0585b;
    }
    &.active {
      background: #e0585b;
      color: #fff !important;
    }
    &:last-child {
      margin: 0;
    }
  }
}
</style>
