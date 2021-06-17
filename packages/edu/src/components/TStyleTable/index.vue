<script>
import { h, onMounted } from 'vue'
import { renderHelper } from './render-helper'
import { scrollHelper } from './scroll-helper'

export default {
  name: 'TStyleTable',
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    halfWidth: {
      type: [String, Number],
      default: '375'
    },
    headerHeight: {
      type: [String, Number],
      default: '40'
    },
    bodyHeight: {
      type: [String, Number],
      default: '500'
    },
    bodyItemHeight: {
      type: [String, Number],
      default: '40'
    },
    headerClassName: {
      type: String,
      default: ''
    },
    bodyClassName: {
      type: String,
      default: ''
    },
    headerCenterClassName: {
      type: String,
      default: ''
    },
    bodyCenterClassName: {
      type: String,
      default: ''
    }
  },
  setup () {
    onMounted(() => {})

    return {
      ...renderHelper(),
      ...scrollHelper()
    }
  },
  render () {
    const { left, center, right } = this.data || {}

    const dataNotNull =
      left &&
      center &&
      right &&
      (left.length !== 0 || center.length !== 0 || right.length !== 0)

    /* 创建 header 开始 */
    let __HLRenderWidth = 0
    let __HRRenderWidth = 0
    let __HLRender = { children: [], width: 0 }
    let __HCRender = { children: [], width: 0 }
    let __HRRender = { children: [], width: 0 }

    let noRight = false

    const { HLRender, HLWapper } = this.renderLeftHeader(this)
    const { HCRender, HCWapper } = this.renderCenterHeader(this)
    const { HRRender, HRWapper } = this.renderRightHeader(this)

    __HLRender = HLRender
    __HCRender = HCRender
    __HRRender = HRRender

    /* 只渲染有的，body 类似 */
    const headerChildren = []
    __HLRender.children.length !== 0 && headerChildren.push(HLWapper)
    __HCRender.children.length !== 0 && headerChildren.push(HCWapper)
    __HRRender.children.length !== 0 && headerChildren.push(HRWapper)

    const headerWidth = Number(this.halfWidth) * 2 + HCRender.width
    __HLRenderWidth = HLRender.width
    __HRRenderWidth = HRRender.width

    /* 对children进行处理， */

    let p = {}
    headerChildren.forEach((item) => {
      p[item.props.tname] = item.props
    })

    p = JSON.parse(JSON.stringify(p))

    let lw = Number(this.halfWidth)
    let rw = Number(this.halfWidth)

    if (!p.headerCenter) {
      !p.headerLeft && p.headerRight && (rw += Number(this.halfWidth))
      p.headerLeft &&
        !p.headerRight &&
        (lw += Number(this.halfWidth)) &&
        (noRight = true)
      p.headerLeft &&
        p.headerRight &&
        (lw += HCRender.width / 2) &&
        (rw += HCRender.width / 2)

      p.headerLeft && (p.headerLeft.style.width = lw + 'px')
      p.headerRight && (p.headerRight.style.width = rw + 'px')
    } else {
      if (!p.headerLeft && p.headerRight) {
        rw += Number(this.halfWidth)
        p.headerRight.style.width = rw + 'px'
      } else if (p.headerLeft && !p.headerRight) {
        noRight = true
        lw += Number(this.halfWidth)
        p.headerLeft.style.width = lw + 'px'
      }
    }

    const keys = Object.keys(p)

    headerChildren.map((item) => {
      if (keys.indexOf(item.props.tname) !== -1) {
        item.props.style.width = p[item.props.tname].style.width
      }
    })

    const header = h(
      'div',
      {
        class: `t-style-table-header ${this.headerClassName}`,
        style: { width: headerWidth + 'px' }
      },
      headerChildren
    )
    /* 创建 header 结束 */

    /* 创建 body 开始 */
    let body = []
    let __BLRenderWidth = 0
    let __BRRenderWidth = 0
    let __BLRender = { children: [], width: 0 }
    let __BCRender = { children: [], width: 0 }
    let __BRRender = { children: [], width: 0 }
    if (dataNotNull) {
      const { BLRender, BLWapper } = this.renderLeftBody(this, left, this.data)
      const { BCRender, BCWapper } = this.renderCenterBody(
        this,
        center,
        this.data
      )
      const { BRRender, BRWapper } = this.renderRightBody(
        this,
        right,
        this.data
      )

      __BLRender = BLRender
      __BCRender = BCRender
      __BRRender = BRRender

      const bodyChildren = []
      __BLRender.children.length !== 0 && bodyChildren.push(BLWapper)
      __BCRender.children.length !== 0 && bodyChildren.push(BCWapper)
      __BRRender.children.length !== 0 && bodyChildren.push(BRWapper)

      const bodyWidth = this.halfWidth * 2 + BCRender.width
      __BLRenderWidth = BLRender.width
      __BRRenderWidth = BRRender.width

      /* 对body进行处理， */

      let _p = {}
      bodyChildren.forEach((item) => {
        _p[item.props.tname] = item.props
      })

      _p = JSON.parse(JSON.stringify(_p))

      let _lw = Number(this.halfWidth)
      let _rw = Number(this.halfWidth)
      if (!_p.bodyCenter) {
        !_p.bodyLeft && _p.bodyRight && (_rw += Number(this.halfWidth))
        _p.bodyLeft &&
          !_p.bodyRight &&
          (_lw += Number(this.halfWidth)) &&
          (noRight = true)
        _p.bodyLeft &&
          _p.bodyRight &&
          (_lw += HCRender.width / 2) &&
          (_rw += HCRender.width / 2)

        _p.bodyLeft && (_p.bodyLeft.style.width = _lw + 'px')
        _p.bodyRight && (_p.bodyRight.style.width = _rw + 'px')
      } else {
        if (!_p.bodyLeft && _p.bodyRight) {
          _rw += Number(this.halfWidth)
          _p.bodyRight.style.width = _rw + 'px'
        } else if (_p.bodyLeft && !_p.bodyRight) {
          noRight = true
          _lw += Number(this.halfWidth)
          _p.bodyLeft.style.width = _lw + 'px'
        }
      }

      const keys = Object.keys(_p)

      bodyChildren.map((item) => {
        if (keys.indexOf(item.props.tname) !== -1) {
          item.props.style.width = _p[item.props.tname].style.width
        }
      })

      body = h(
        'div',
        {
          class: `t-style-table-body ${this.bodyClassName}`,
          style: { width: bodyWidth + 'px' }
        },
        bodyChildren
      )
    } else {
      body = h(
        'div',
        {
          class: `t-style-table-body empty`,
          style: { width: headerWidth + 'px' }
        },
        '暂无数据'
      )
    }
    /* 创建 body 结束 */

    this.$nextTick(() => {
      this.resetBS()
      /*  初始化 header 左边滚动 */
      __HLRender.children.length !== 0 &&
        this.initHeaderLeftBS(
          this,
          '#ts-table-header-left',
          __HLRenderWidth,
          __HRRenderWidth,
          noRight ? 2 : 1
        )
      /* 初始化 header 右边滚动 */
      __HRRender.children.length !== 0 &&
        this.initHeaderRightBS(this, '#ts-table-header-right', __HLRenderWidth)

      if (dataNotNull) {
        /* 初始化 body 左边滚动 */
        __BLRender.children.length !== 0 &&
          this.initBodyLeftBS(
            this,
            '#ts-table-body-left',
            __BLRenderWidth,
            noRight ? 2 : 1
          )
        /* 初始化 body 中间滚动 */
        __BCRender.children.length !== 0 &&
          this.initBodyCenterBS(this, '#ts-table-body-center')
        /* 初始化 body 右边滚动 */
        __BRRender.children.length !== 0 &&
          this.initBodyRightBS(this, '#ts-table-body-right', __BRRenderWidth)
      }
    })

    return h(
      'div',
      { class: 't-style-table', style: { width: headerWidth + 'px' } },
      [header, body]
    )
  }
}
</script>
<style lang="scss">
.t-style-table {
  display: flex;
  flex-direction: column;
  text-align: center;
  cursor: default;
  user-select: none;

  .t-style-table-header {
    display: flex;
    background-color: #eee;
    border: 1px solid #eee;
    border-left: none;
    border-right: none;
    color: #222;
    overflow: hidden;
    &-left,
    &-right,
    &-center {
      &.wapper {
        overflow: hidden;
      }
      .content-header-left,
      .content-header-center,
      .content-header-right {
        display: flex;
      }
    }
  }

  .t-style-table-body {
    display: flex;
    background-color: #fff;
    color: #222;
    &-left,
    &-right,
    &-center {
      &.wapper {
        overflow: hidden;
      }
      .content-body-left,
      .content-body-center,
      .content-body-right {
        display: flex;
        flex-direction: column;
        .t-style-table-row {
          display: flex;
          &.row-current{
            background-color: #deeaff;
          }
        }
      }
    }
  }
}
</style>
