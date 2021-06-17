<template>
  <div class="container">
    <div class="filter">
      <race-filter @changeFilter="changeFilter"></race-filter>
    </div>
    <div class="table">
      <page-table :api="ajaxApi" ref="pageRef">
        <template #="tableScope">
          <table-com
            :rowClick="true"
            @rowClickEvent="enterRace"
            :tableData="tableScope.datas"
            :tableHeader="tableHeader"
            v-loading="tableScope.loading"
          >
            <template #market="{ scope }">{{marketFormat[scope.row.markettype]}}</template>
            <template
              #signUpDate="{ scope }"
            >{{`${scope.row.enrollstart} - ${scope.row.enrollend}`}}</template>
            <template #raceDate="{ scope }">{{`${scope.row.starttime} - ${scope.row.endtime}`}}</template>
            <template
              #isstand="{ scope }"
            >{{scope.row.isstand === '1' ? '标准模式':scope.row.isstand === '0' ? '非标准模式':''}}</template>
            <template #matchstat="{ scope }">
              <span
                :style="{color:raceStatus[scope.row.matchstat].color}"
              >{{raceStatus[scope.row.matchstat].text}}</span>
            </template>
            <template #signupstatus="{ scope }">
              <el-button
                v-if="scope.row.signupstatus === 1"
                @click.stop="changeVisible('signUpVis', true, scope.row)"
                size="small"
              >报名参加</el-button>
              <el-button
                v-else-if="scope.row.signupstatus === 2"
                @click.stop="changeVisible('submitCheckVis', true, scope.row)"
                size="small"
              >提交审核</el-button>
              <span v-else>{{signStatus[scope.row.signupstatus]}}</span>
            </template>
            <template #coop="{ scope }">
              <el-button @click.stop="changeVisible('checkRaceVis', true, scope.row)" size="small">查看</el-button>
            </template>
          </table-com>
        </template>
      </page-table>
    </div>
    <sign-up-race
      :visible="modal.signUpVis"
      @changeVisible="changeVisible('signUpVis')"
      @confirm="signUp"
    ></sign-up-race>
    <submit-audit
      :visible="modal.submitCheckVis"
      @changeVisible="changeVisible('submitCheckVis')"
      @confirm="audit"
    ></submit-audit>
    <check-race
      :visible="modal.checkRaceVis"
      :rule="curRule"
      @changeVisible="changeVisible('checkRaceVis')"
    ></check-race>
  </div>
</template>

<script>
import CheckRace from "./dialog/checkRace"
import RaceFilter from "./raceFilter.vue"
import SubmitAudit from "./dialog/submitAudit.vue"
import signUpRace from "./dialog/signUpRace.vue"
import {
  TAB_STATUS,
  TABLE_HEADER,
  TABLE_DATA,
  MARKET_FORMATTER,
  RACE_STATUS,
  SIGN_STATUS
} from "./raceEnter"
import { ref, reactive, onMounted } from "vue"
import { getNavList } from "../myRace/MyRaceNav/navConfig"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { setRaceConfig } from "@/utils/auth.js"
import { queryRaces, signUp, sumCheck, queryMatchrule } from "@/api/myRace/raceEnter"
export default {
  components: {
    RaceFilter,
    SubmitAudit,
    signUpRace,
    CheckRace
  },
  setup (props) {
    const store = useStore()
    const router = useRouter()
    const pageRef = ref(null)

    const curRace = ref({})
    const curRule = ref({})

    const marketList = ref([])
    const tableData = ref([])

    const changeFilter = p => {
      pageRef.value.setParam(p)
    }

    const ajaxApi = reactive({
      getList (param) {
        // return queryRaces(param)
        return Promise.resolve(TABLE_DATA)
      }
    })

    const modal = reactive({
      submitCheckVis: false,
      checkRaceVis: false,
      signUpVis: false
    })

    const changeVisible = (type, bool, data) => {
      modal[type] = bool || false
      if (data) curRace.value = data
      if (bool && type === 'checkRaceVis') checkRule()
    }

    const enterRace = async row => {
      const config = {
        marketId: row.markettype,
        raceId: row.raceid,
        racename: row.racename
      }
      store.commit("competition/CHANGE_RACE_CONFIG", row)
      store.commit("competition/CHANGE_NAV_STATUS", {
        first: '',
        second: '',
        isMargin: row.markettype === 11
      })
      setRaceConfig(JSON.stringify(row))
      const firstPush = getNavList(row.markettype)[0].children.list[0].name
      router.push({ name: firstPush })
    }

    const audit = () => {
      const params = {}
    }

    const checkRule = async () => {
      console.log(curRace.value.raceid)
      const res = await queryMatchrule({
        raceid: curRace.value.raceid
      })
      // console.log(res)
      curRule.value = res.data
    }

    const signUp = () => {}

    const queryRace = async () => {
      const res = await queryRaces()
      tableData.value = res.data
    }

    onMounted(() => {
      pageRef.value.setParam()
    })

    return {
      marketList,
      tableHeader: TABLE_HEADER,
      raceStatus: RACE_STATUS,
      marketFormat: MARKET_FORMATTER,
      signStatus: SIGN_STATUS,

      pageRef,
      changeFilter,

      ajaxApi,
      modal,
      changeVisible,
      curRace,
      curRule,
      enterRace,

      audit,
      signUp
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  :deep .el-table thead tr{
    cursor: default;
  }
  :deep .stripe-row,.el-table tr{
    cursor: pointer;
  }
  .filter {
    margin: 20px 0;
  }
  .table {
    max-width: 1350px;
    margin-bottom: 70px;
    opacity: 1;
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 9px;
    padding: 24px;
  }
}
</style>
