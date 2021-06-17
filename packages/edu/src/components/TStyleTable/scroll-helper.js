import { reactive } from 'vue'
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'

BScroll.use(ObserveDOM)

/* header bs实例化配置 */
const hbsScrollConfig = {
  scrollX: true,
  scrollY: false,
  bounce: false, // 关闭回弹效果
  probeType: 3, // 任何时候都派发 scroll 事件
  observeDOM: true // 开启 observe-dom 插件
}
/* body两侧 bs实例化配置 */
const bbsScrollConfig = {
  scrollX: true,
  scrollY: true,
  bounce: false,
  probeType: 3,
  observeDOM: true
}
/* body中间 bs实例化配置 */
const cbsScrollConfig = {
  scrollX: false,
  scrollY: true,
  bounce: false,
  probeType: 3,
  observeDOM: true
}
/* 水平滚动配置 */
const HSConfig = [0, 0, undefined, {}]
const BSConfig = [0, undefined, {}]

export const scrollHelper = () => {
  const BSScrollObject = reactive({
    HLBS: null,
    HCBS: null,
    HRBS: null,
    BLBS: null,
    BCBS: null,
    BRBS: null
  })

  const BSEnableScroll = reactive({
    HLBS: true,
    HRBS: true,
    BLBS: true,
    BCBS: true,
    BRBS: true
  })

  const BLScroll = reactive({
    x: 0,
    y: 0
  })
  const BRScroll = reactive({
    x: 0,
    y: 0
  })

  const getBS = () => {
    return BSScrollObject
  }

  const scrollStartCallback = (array) => {
    array.forEach((key) => {
      BSEnableScroll[key] = false
    })
  }

  const resetBS = () => {
    destroyBS()
    BSScrollObject.HLBS = null
    BSScrollObject.HRBS = null
    BSScrollObject.BLBS = null
    BSScrollObject.BCBS = null
    BSScrollObject.BRBS = null
  }

  const destroyBS = () => {
    BSScrollObject.HLBS && BSScrollObject.HLBS.destroy()
    BSScrollObject.HRBS && BSScrollObject.HRBS.destroy()
    BSScrollObject.BLBS && BSScrollObject.BLBS.destroy()
    BSScrollObject.BCBS && BSScrollObject.BCBS.destroy()
    BSScrollObject.BRBS && BSScrollObject.BRBS.destroy()
  }

  const initHeaderLeftBS = (
    _this,
    className,
    leftHalfWidth,
    rightHalfWidth,
    nul
  ) => {
    BSScrollObject.HLBS = new BScroll(className, {
      ...hbsScrollConfig
    })
    BSScrollObject.HLBS &&
      BSScrollObject.HLBS.scrollTo(
        BLScroll.x === 0 ? _this.halfWidth * nul - leftHalfWidth : BLScroll.x,
        ...HSConfig
      )
    BSScrollObject.HLBS &&
      BSScrollObject.HLBS.on('beforeScrollStart', () => {
        BSEnableScroll.HLBS = true
      })
    BSScrollObject.HLBS &&
      BSScrollObject.HLBS.on('scrollStart', () =>
        scrollStartCallback(['HRBS', 'BLBS', 'BCBS', 'BRBS'])
      )
    BSScrollObject.HLBS &&
      BSScrollObject.HLBS.on('scroll', (e) => {
        if (BSEnableScroll.HLBS) {
          const x = _this.halfWidth * nul - rightHalfWidth - e.x
          BLScroll.x = e.x
          BRScroll.x = x
          BSScrollObject.HRBS && BSScrollObject.HRBS.scrollTo(x, ...HSConfig)
          BSScrollObject.BLBS &&
            BSScrollObject.BLBS.scrollTo(BLScroll.x, BLScroll.y, ...BSConfig)
          BSScrollObject.BRBS &&
            BSScrollObject.BRBS.scrollTo(BRScroll.x, BRScroll.y, ...BSConfig)
        }
      })

    return BSScrollObject.HLBS
  }

  const initHeaderRightBS = (_this, className, leftHalfWidth) => {
    BSScrollObject.HRBS = new BScroll(className, {
      ...hbsScrollConfig
    })
    BSScrollObject.HRBS && BSScrollObject.HRBS.scrollTo(0, ...HSConfig)
    BSScrollObject.HRBS &&
      BSScrollObject.HRBS.on('beforeScrollStart', () => {
        BSEnableScroll.HRBS = true
      })
    BSScrollObject.HRBS &&
      BSScrollObject.HRBS.on('scrollStart', () =>
        scrollStartCallback(['HLBS', 'BLBS', 'BCBS', 'BRBS'])
      )
    BSScrollObject.HRBS &&
      BSScrollObject.HRBS.on('scroll', (e) => {
        if (BSEnableScroll.HRBS) {
          const x = _this.halfWidth - leftHalfWidth - e.x
          BLScroll.x = x
          BRScroll.x = e.x
          BSScrollObject.HLBS && BSScrollObject.HLBS.scrollTo(x, ...HSConfig)
          BSScrollObject.BLBS &&
            BSScrollObject.BLBS.scrollTo(BLScroll.x, BLScroll.y, ...BSConfig)
          BSScrollObject.BRBS &&
            BSScrollObject.BRBS.scrollTo(BRScroll.x, BRScroll.y, ...BSConfig)
        }
      })
    return BSScrollObject.HRBS
  }

  const initBodyLeftBS = (_this, className, leftHalfWidth, nul) => {
    if (BSScrollObject.BLBS) {
      BSScrollObject.BLBS.refresh()
    } else {
      BSScrollObject.BLBS = new BScroll(className, {
        ...bbsScrollConfig
      })
      console.log(BLScroll.x)
      BSScrollObject.BLBS &&
        BSScrollObject.BLBS.scrollTo(
          BLScroll.x === 0 ? (_this.halfWidth * nul - leftHalfWidth) : BLScroll.x,
          BLScroll.y,
          ...BSConfig
        )
      // BLScroll.x = (_this.halfWidth * nul - leftHalfWidth)
      BSScrollObject.BLBS &&
        BSScrollObject.BLBS.on('beforeScrollStart', () => {
          BSEnableScroll.BLBS = true
        })
      BSScrollObject.BLBS &&
        BSScrollObject.BLBS.on('scrollStart', () =>
          scrollStartCallback(['HLBS', 'HRBS', 'BCBS', 'BRBS'])
        )
      BSScrollObject.BLBS &&
        BSScrollObject.BLBS.on('scroll', (e) => {
          if (BSEnableScroll.BLBS) {
            const x = _this.halfWidth * nul - leftHalfWidth - e.x
            BLScroll.x = e.x
            BLScroll.y = e.y
            BRScroll.x = x
            BRScroll.y = e.y
            BSScrollObject.HLBS &&
              BSScrollObject.HLBS.scrollTo(e.x, ...HSConfig)
            BSScrollObject.HRBS && BSScrollObject.HRBS.scrollTo(x, ...HSConfig)

            BSScrollObject.BCBS &&
              BSScrollObject.BCBS.scrollTo(0, e.y, ...BSConfig)
            BSScrollObject.BRBS &&
              BSScrollObject.BRBS.scrollTo(BRScroll.x, BRScroll.y, ...BSConfig)
          }
        })
    }

    return BSScrollObject.BLBS
  }

  const initBodyCenterBS = (_this, className) => {
    if (BSScrollObject.BCBS) {
      BSScrollObject.BCBS.refresh()
    } else {
      BSScrollObject.BCBS = new BScroll(className, {
        ...cbsScrollConfig
      })
      BSScrollObject.BCBS &&
        BSScrollObject.BCBS.scrollTo(0, BRScroll.y, ...BSConfig)
      BSScrollObject.BCBS &&
        BSScrollObject.BCBS.on('beforeScrollStart', () => {
          BSEnableScroll.BCBS = true
        })
      BSScrollObject.BCBS &&
        BSScrollObject.BCBS.on('scrollStart', () =>
          scrollStartCallback(['HLBS', 'HRBS', 'BLBS', 'BRBS'])
        )
      BSScrollObject.BCBS &&
        BSScrollObject.BCBS.on('scroll', (e) => {
          if (BSEnableScroll.BCBS) {
            BLScroll.y = e.y
            BRScroll.y = e.y
            BSScrollObject.BLBS &&
              BSScrollObject.BLBS.scrollTo(BLScroll.x, BLScroll.y, ...BSConfig)
            BSScrollObject.BRBS &&
              BSScrollObject.BRBS.scrollTo(BRScroll.x, BRScroll.y, ...BSConfig)
          }
        })
    }

    return BSScrollObject.BCBS
  }

  const initBodyRightBS = (_this, className, leftHalfWidth) => {
    BSScrollObject.BRBS = new BScroll(className, {
      ...bbsScrollConfig
    })
    BSScrollObject.BRBS && BSScrollObject.BRBS.scrollTo(BRScroll.x, BRScroll.y, ...BSConfig)
    BSScrollObject.BRBS &&
      BSScrollObject.BRBS.on('beforeScrollStart', () => {
        BSEnableScroll.BRBS = true
      })
    BSScrollObject.BRBS &&
      BSScrollObject.BRBS.on('scrollStart', () =>
        scrollStartCallback(['HLBS', 'HRBS', 'BLBS', 'BCBS'])
      )
    BSScrollObject.BRBS &&
      BSScrollObject.BRBS.on('scroll', (e) => {
        if (BSEnableScroll.BRBS) {
          const x = _this.halfWidth - leftHalfWidth - e.x
          BLScroll.x = x
          BLScroll.y = e.y
          BRScroll.x = e.x
          BRScroll.y = e.y
          BSScrollObject.HLBS && BSScrollObject.HLBS.scrollTo(x, ...HSConfig)
          BSScrollObject.HRBS && BSScrollObject.HRBS.scrollTo(e.x, ...HSConfig)
          BSScrollObject.BLBS &&
            BSScrollObject.BLBS.scrollTo(BLScroll.x, BLScroll.y, ...BSConfig)
          BSScrollObject.BCBS &&
            BSScrollObject.BCBS.scrollTo(0, e.y, ...BSConfig)
        }
      })

    return BSScrollObject.BRBS
  }

  return {
    initHeaderLeftBS,
    initHeaderRightBS,

    initBodyLeftBS,
    initBodyCenterBS,
    initBodyRightBS,

    resetBS,
    getBS,
    destroyBS
  }
}
