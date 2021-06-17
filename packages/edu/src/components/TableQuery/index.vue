/* eslint-disable vue/valid-v-slot */ /* eslint-disable vue/valid-v-slot */ /*
eslint-disable vue/valid-v-slot */
<template>
  <div class="container">
    <div class="head">
      <div class="tabs">
        <div
          class="tab"
          v-for="item in navItems"
          :key="item.value"
          :class="{
            active: navValue === item.value,
            onelength: navItems.length === 1
          }"
          @click="toggle(item)"
        >{{ item.label }}</div>
      </div>
      <div class="tools">
        <div class="tool" v-if="toolBar.search" @click.stop="toolsChange('search')">
          <div class="icon">
            <div>
              <img src="@/assets/toolsImg/search.png" alt />
            </div>
            <div class="ac-icon">
              <img src="@/assets/toolsImg/search_ac.png" alt />
            </div>
          </div>查询
        </div>
        <div class="tool" v-if="toolBar.update" @click="toolsChange('update')">
          <div class="icon">
            <div>
              <img src="@/assets/toolsImg/update.png" alt />
            </div>
            <div class="ac-icon">
              <img src="@/assets/toolsImg/update_ac.png" alt />
            </div>
          </div>刷新
        </div>
        <div class="tool" v-if="toolBar.export" @click="toolsChange('exportData')">
          <div class="icon">
            <div>
              <img src="@/assets/toolsImg/export.png" alt />
            </div>
            <div class="ac-icon">
              <img src="@/assets/toolsImg/export_ac.png" alt />
            </div>
          </div>导出
        </div>
        <div class="tool" v-if="toolBar.status">
          状态：
          <el-select v-model="toolsValue.status" placeholder="请选择">
            <el-option
              v-for="state in statusList"
              :key="state.value"
              :label="state.label"
              :value="state.value"
            ></el-option>
          </el-select>
        </div>
        <div class="tool" v-if="toolBar.type">
          {{ typeName
          }}
          <el-select v-model="toolsValue.entrustbs" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="tool" v-if="toolBar.date">
          <div class="time-picker">
            <label>查询日期:</label>
            <div class="septime">
              <el-date-picker
                v-model="toolsValue.starttime"
                type="date"
                format="YYYY/MM/DD"
                placeholder="起始时间"
                :editable="false"
                :disabledDate="pickerBeginLimit"
              ></el-date-picker>
            </div>
            <label>至</label>
            <div class="septime">
              <el-date-picker
                v-model="toolsValue.endtime"
                type="date"
                :editable="false"
                format="YYYY/MM/DD"
                placeholder="截止时间"
                :disabledDate="pickerOverLimit"
              ></el-date-picker>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table">
      <page-table :api="ajaxApi" ref="pageRef">
        <template #="tableScope">
          <table-com
            :tableData="tableScope.datas"
            :tableHeader="tableHeader"
            v-loading="tableScope.loading"
          >
            <template v-for="col in columnList" #[col]="scope">
              <slot :name="col" :scope="scope.scope"></slot>
            </template>
          </table-com>
        </template>
      </page-table>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue"
import { dateChange } from "@/utils"
export default {
  props: {
    navItems: {
      type: Array,
      default: () => {
        return [
          { label: "tab1", value: 0 },
          { label: "tab2", value: 1 }
        ]
      }
    },
    tableHeader: {
      type: Array,
      required: true
    },
    ajaxApi: {
      type: Object,
      required: true
    },
    typeName: {
      type: String,
      default: "类别："
    },
    options: {
      type: Array,
      default: () => {
        return [
          { label: "全部", value: "" },
          { label: "买入", value: 1 },
          { label: "卖出", value: 2 }
        ]
      }
    },
    toolBar: {
      type: Object,
      default: () => {
        return {
          search: false,
          update: false,
          export: false,
          type: false,
          date: false,
          status: false
        }
      }
    },
    statusList: {
      type: Array,
      default: () => {
        return [
          { label: "全部", value: "" },
          { label: "未成交", value: 1 },
          { label: "部分撤单", value: 2 },
          { label: "已撤单", value: 3 },
          { label: "部分成交", value: 4 },
          { label: "已完成", value: 5 }
        ]
      }
    }
  },
  setup (props, { emit }) {
    const navValue = ref(0)
    const pageRef = ref(null)
    const value = ref("")
    const toggle = item => {
      navValue.value = item.value
      emit("navChange", item)
    }

    const toolsValue = reactive({
      status: "",
      entrustbs: "",
      starttime: "",
      endtime: ""
    })

    const pickerBeginLimit = time => {
      if (toolsValue.endtime) {
        return time.getTime() < new Date(toolsValue.endtime)
      }
    }

    const pickerOverLimit = time => {
      if (toolsValue.starttime) {
        return time.getTime() < new Date(toolsValue.starttime)
      }
    }

    const toolsChange = type => {
      if (type === "search") {
        if (toolsValue.starttime) {
          toolsValue.starttime = dateChange(toolsValue.starttime)
        }
        if (toolsValue.endtime) {
          toolsValue.endtime = dateChange(toolsValue.endtime)
        }
        emit("search", toolsValue)
      } else {
        emit(type)
      }
    }

    const loadData = p => {
      pageRef.value.setParam(p)
    }

    const columnList = ref([])

    onMounted(() => {
      props.tableHeader.map(item => {
        if (item.custom === true) {
          columnList.value.push(item.attrs.prop)
        }
      })
    })
    return {
      navValue,
      toolsValue,
      toggle,
      pageRef,
      columnList,
      value,
      pickerBeginLimit,
      pickerOverLimit,

      toolsChange,

      loadData
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/common.scss";
.container {
  // width: 1352px;
  // background: #ffffff;
  // border-radius: 8px;
  // padding: 0 24px 42px 24px;
  // margin-top: 20px;
  @include contain();
  padding-top: 0;
  .head {
    height: 89px;
    box-sizing: border-box;
    padding: 24px 0;
    border-bottom: 1px solid #ebebeb;
    display: flex;
    align-items: center;
    .tabs {
      display: flex;
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: center;
      color: #a8abae;
      .tab {
        padding-right: 10px;
        margin-right: 10px;
        border-right: 1px solid #a8abae;
        cursor: pointer;
        &.active {
          transition: 0.3s;
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
          font-weight: 700;
          color: #e0585b;
        }
        &:hover {
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
          font-weight: 700;
          color: #e0585b;
        }
        &.onelength {
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
          font-weight: 700;
          color: #222222;
          cursor: default;
          &:hover {
            font-weight: 700;
            color: #222222;
            cursor: default;
          }
        }
        &:nth-last-child(1) {
          border-right: none;
        }
      }
    }
    .tools {
      flex: 1;
      display: flex;
      flex-direction: row-reverse;
      .tool {
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #222222;
        margin-right: 24px;
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        &:nth-child(1) {
          margin-right: 0;
        }
        &:hover {
          color: #e0585b;
          .icon {
            .ac-icon {
              opacity: 1;
            }
          }
        }
        .icon {
          position: relative;
          margin-right: 5px;
          &>div{
            height: 15px;
          }
          .ac-icon {
            position: absolute;
            opacity: 0;
            top: 0;
            background-color: #ffffff;
          }
        }
      }
    }
  }
}
.time-picker {
  display: flex;
  align-items: center;
  label {
    &:nth-of-type(1) {
      margin-right: 8px;
    }
    &:nth-of-type(2) {
      margin: 0 10px;
    }
  }
}
</style>
