<template>
  <div class="record">
    <h-nav-bar
      :list="hlist"
      :activeIndex="hNavActiveIndex"
      @tabChange="hNavChange"
    >
      <template #subNav v-if="hNavActiveIndex === 0">
        <div class="childList">
          <div
            v-for="(item, index) in childList"
            :key="index"
            class="nav-item"
            @click="itemClick(item.type)"
          >
            <span class="label" :class="{ active: childIndex === item.type }">{{
              item.label
            }}</span>
          </div>
          <div class="select">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{roleText}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                  v-for="(item,i) in sList"
                  :key="i"
                  @click="roleChange(item.value)"
                  >{{item.label}}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </template>
    </h-nav-bar>
    <component :is="index"></component>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import AnswerRecord from './component/AnswerRecord.vue'
import ErrorRecord from './component/ErrorRecord'
const SLIST = {
  0: '理财经理',
  1: '投资经理',
  2: '风控经理'
}
export default {
  components: { AnswerRecord, ErrorRecord },
  setup (props) {
    const hlist = [{ label: '岗位训练' }, { label: '从业考证' }]
    const childList = [
      { label: '做题记录', type: 'record' },
      { label: '错题集', type: 'errorRecord' }
    ]

    const sList = [
      { label: '理财经理', value: 0 },
      { label: '投资经理', value: 1 },
      { label: '风控经理', value: 2 }
    ]
    const status = ref(0)
    const childIndex = ref('record')
    const hNavActiveIndex = ref(0)
    const hNavChange = (e) => {
      hNavActiveIndex.value = e.index
    }
    const itemClick = (type) => {
      childIndex.value = type
    }

    const roleChange = (label) => {
      status.value = label
    }
    const index = computed(() => {
      if (hNavActiveIndex.value === 0 && childIndex.value === 'record') {
        return 'AnswerRecord'
      } else if (
        hNavActiveIndex.value === 0 &&
        childIndex.value === 'errorRecord'
      ) {
        return 'ErrorRecord'
      } else {
        return 0
      }
    })
    return {
      hlist,
      hNavActiveIndex,
      hNavChange,
      childList,
      childIndex,
      itemClick,
      index,
      sList,
      roleText: computed(() => SLIST[status.value]),
      roleChange
    }
  }
}
</script>

<style lang="scss" scoped>
.record {
  .childList {
    height: 64px;
    display: flex;
    align-items: center;
    border-top: 1px solid #ebebeb;
    padding-left: 30px;
    .nav-item {
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #222222;
      margin-right: 60px;
      cursor: pointer;
      span {
        &.active {
          color: #e0585b;
        }
      }
    }
    .select {
      flex: 1;
      display: flex;
      flex-direction: row-reverse;
      margin-right: 24px;
      cursor: pointer;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #222222;
    }
  }
}
</style>
