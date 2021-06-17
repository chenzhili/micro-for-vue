import { ElMessage } from 'element-plus'
import { hq, getJson } from "@/api/kline"

export const tipDialog = (message, type) => {
  ElMessage({
    message,
    type
  })
}

/**
   * 获取当前日期是否是交易日
   * @param ctx state状态
   * @param date 时间
   */
export function getDay ({ ctx, date } = {}) {
  return new Promise(function (resolve, reject) {
    const params = {
      date: date
    }
    getJson('/trade-web/race/istradeday.do', function (res) {
      resolve(res)
    }, function (e) {
      reject(e)
    }, params, false, { token: 'fbc795b1095d4c882da2e43e79c1e355ddf0d39599f795732f60af4b3f82b25b' })
  })
}
/**
   * 请求走势
   * @param ctx state状态
   * @param code 证券代码
   * @param date 请求前一天K线的时间
   * @param dateF 需要转换的时间
   */
export function minuteLine (ctx, code, date, dateF) {
  const params = {
    serviceid: "trenddata",
    body: {
      marketid: ctx.marketcode,
      stockcode: code,
      applysize: -1
    },
    token: 'fbc795b1095d4c882da2e43e79c1e355ddf0d39599f795732f60af4b3f82b25b'
  }
  const requestBeforeZS = async () => {
    try {
      const res = await hq(params)
      if (res.status !== 0) {
        ctx.loading = false
        return tipDialog(res.data.message, 'error')
      }
      if (res.data.length < 2) { // 判断今天早上开盘是否有行情，如果有没就用K线的数据
        clearInterval(ctx.timer)
        lastDay(ctx, code, date)
        return
      }
      ctx.loading = false
      const resultArr = res.data
      const sameDay = JSON.parse(JSON.stringify(res.data))
      resultArr.forEach((item, index) => {
        item.curPrice = item.now
        item.totalMoney = item.amount
        item.avPrice = item.avgprice
        item.dealMount = item.volume
        item.rate = (item.now - ctx.dataGraphForTime.preClosePrice) / ctx.dataGraphForTime.preClosePrice * 100
        item.time.length === 3 ? item.time = `${dateF} 0${item.time.slice(0, 1)}:${item.time.slice(1, 3)}` : item.time = `${dateF} ${item.time.slice(0, 2)}:${item.time.slice(2, 4)}`
      })
      ctx.dataGraphForTime.data = resultArr
      sameDay.forEach(item => { // 用于今日K线柱状图
        item.time.length === 3 ? item.date = `${dateF} 0${item.time.slice(0, 1)}:${item.time.slice(1, 3)}` : item.date = `${dateF} ${item.time.slice(0, 2)}:${item.time.slice(2, 4)}`
        item.dealMount = item.volume
        item.close = item.now
        item.rate = (item.now - ctx.dataGraphForTime.preClosePrice) / ctx.dataGraphForTime.preClosePrice * 100
      })
      if (date !== ctx.date && ctx.workingDay) { // K线数据中有当日行情数据时不做数据的添加
        //   ctx.dayDataGraphForK.curData = sameDay
        ctx.minDataGraphForK.curData = sameDay
        ctx.fifDataGraphForK.curData = sameDay
        ctx.dayDataGraphForK.curData = [sameDay[sameDay.length - 1]]
      }
    } catch (error) {
      ctx.loading = false
      return tipDialog(error, 'error')
    }
  }
  requestBeforeZS()
}
/**
   * 如果没有走势线查出前一天的K线出来
   * @param ctx state状态
   * @param code 代码
   * @param date 时间
   */
export function lastDay (ctx, code, date) {
  ctx.dataGraphForTime.preClodePrice = ctx.lastClose
  const params = {
    serviceid: "kline",
    body: {
      marketid: ctx.routeInfo.marketcode, // 行情id
      stockcode: code,
      requesttype: 2,
      starttime: date,
      endtime: date,
      datatype: 0
    },
    token: 'fbc795b1095d4c882da2e43e79c1e355ddf0d39599f795732f60af4b3f82b25b'
  }
  const requestBeforeHq = async () => {
    try {
      const res = await hq(params)
      ctx.loading = false
      if (res.data.status !== 0) {
        return tipDialog(res.data.message, 'error')
      }
      const resultArr = res.data.data
      resultArr.forEach((item, index) => {
        const time = item.datetime.slice(-4, item.datetime.length)
        item.time = `${time.slice(0, 2)}:${time.slice(2, 4)}`
        item.curPrice = item.close
        item.totalMoney = item.amount
        isNaN(item.amount / item.volume) ? item.avPrice = resultArr[index - 1].avPrice : item.avPrice = item.amount / item.volume
        item.dealMount = item.volume
        if (index === 0) {
          item.rate = item.close / item.open
        } else {
          item.rate = item.close / resultArr[index - 1].close
        }
      })
      ctx.dataGraphForTime.data = resultArr
    } catch (error) {
      ctx.loading = false
      return tipDialog(error, 'error')
    }
  }
  requestBeforeHq()
}

/**
   * 请求日k数据
   * @param ctx state状态
   * @param code 代码
   * @param wgtflag 复权
   * @param datatype 数据类型
   */
export function dayKline (ctx, code, wgtflag, datatype) {
  ctx.loading = true
  const date = new Date()
  const Y = date.getFullYear()
  const M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  ctx.date = Y.toString() + M + D
  const params = {
    serviceid: "kline",
    body: {
      marketid: ctx.routeInfo.marketcode, // 行情id
      stockcode: code,
      requesttype: 1,
      applysize: 1500,
      endtime: Y.toString() + M + D,
      datatype: datatype,
      wgtflag: wgtflag
    },
    token: 'fbc795b1095d4c882da2e43e79c1e355ddf0d39599f795732f60af4b3f82b25b'
  }
  const requestHQ = async () => {
    try {
      const res = await hq(params)
      ctx.loading = false
      const resultArr = res.data
      resultArr.forEach((item, index) => {
        item.date = item.datetime
        item.dealMount = item.volume
        if (index === 0 && item.close !== "0" && item.open !== '0') {
          item.rate = (item.close - item.open) / item.open * 100
        } else if (item.close !== "0" && item.open !== '0') {
          item.rate = (item.close - resultArr[index - 1].close) / resultArr[index - 1].close * 100
        } else {
          item.rate = 0
        }
      })
      if (datatype === 2) {
        ctx.day.noDate = JSON.parse(JSON.stringify(resultArr))
        ctx.day.forDate = JSON.parse(JSON.stringify(resultArr))
        ctx.day.forDate.forEach(item => {
          item.date = `${item.datetime.slice(0, 4)}-${item.datetime.slice(4, 6)}-${item.datetime.slice(6, 8)}`
        })
        if (ctx.selection === 5) {
          ctx.dayDataGraphForK.data = ctx.day.forDate
        } else {
          ctx.dayDataGraphForK.data = resultArr
        }
        if (String(ctx.routeInfo.marketcode) !== '11' && String(ctx.routeInfo.markettype) !== '7') {
          if (resultArr.length > 1) {
            ctx.lastClose = resultArr[resultArr.length - 2].close // 早上还没有开盘用这个收盘价
          } else {
            ctx.lastClose = resultArr[resultArr.length - 1].close // 早上还没有开盘用这个收盘价
          }
          ctx.workingDay = true // 工作日
          ctx.dataGraphForTime.preClosePrice = resultArr[resultArr.length - 1].close
          minuteLine(ctx, ctx.routeInfo.stockcode, resultArr[resultArr.length - 1].datetime, `${Y}-${M}-${D}`)
          // clearInterval(ctx.timer)
          // ctx.timer = setInterval(() => {
          //   minuteLine(ctx, ctx.routeInfo.stockcode, resultArr[resultArr.length - 1].datetime, `${Y}-${M}-${D}`)
          // })
          getDay({ ctx: ctx, date: `${Y.toString() + M + D}` }).then(res => { // 判断今天是不是交易日&&K线数据中是否有今天的日期来判断length-2||length-1, 1非工作日
            if (res === '1' || resultArr[resultArr.length - 1].datetime === `${Y.toString() + M + D}`) {
              ctx.dataGraphForTime.preClosePrice = resultArr[resultArr.length - 2].close
              const date = resultArr[resultArr.length - 1].datetime
              minuteLine(ctx, ctx.routeInfo.stockcode, date, `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`)
            } else {
              ctx.workingDay = true // 工作日
              ctx.dataGraphForTime.preClosePrice = resultArr[resultArr.length - 1].close
              minuteLine(ctx, ctx.routeInfo.stockcode, resultArr[resultArr.length - 1].datetime, `${Y}-${M}-${D}`)
              clearInterval(ctx.timer)
              ctx.timer = setInterval(() => {
                minuteLine(ctx, ctx.routeInfo.stockcode, resultArr[resultArr.length - 1].datetime, `${Y}-${M}-${D}`)
              }, 3000)
            }
          }).catch(() => { })
        } else { ctx.loading = false }
      } else if (datatype === 1) { // 取出15分钟线
        ctx.loading = false
        const resultAeeDate = JSON.parse(JSON.stringify(resultArr))
        resultAeeDate.forEach(item => {
          item.date = `${item.datetime.slice(0, 4)}-${item.datetime.slice(4, 6)}-${item.datetime.slice(6, 8)} ${item.datetime.slice(8, 10)}:${item.datetime.slice(10, 12)}`
        })
        ctx.fifDataGraphForK.data = resultAeeDate
      } else if (datatype === 0) { // 取出1分钟线
        ctx.loading = false
        ctx.minDataGraphForK.data = resultArr
      } else if (datatype === 3) { // 取出月线
        ctx.loading = false
        resultArr.forEach(item => {
          item.date = `${item.datetime.slice(0, 4)}-${item.datetime.slice(4, 6)}`
        })
        ctx.monDataGraphForK.data = resultArr
      }
    } catch (error) {
      ctx.loading = false
      return tipDialog(error, 'error')
    }
  }
  requestHQ()
}
