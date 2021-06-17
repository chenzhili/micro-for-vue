import { h, toRaw, ref } from 'vue'
import { eventHelper } from './event-helper'

export const renderHelper = () => {
  const { handleClick } = eventHelper()

  const currentRowIndex = ref(null)

  const getChildNode = (slotNode) => {
    let children = []
    let width = 0
    try {
      if (slotNode instanceof Array) {
        slotNode.forEach((childNode) => {
          if (childNode.type.name === 'TStyleTableColumn') {
            width += Number(childNode.props.width)
            children.push(childNode)
          } else if (childNode.children instanceof Array) {
            const d = getChildNode(childNode.children)
            children.push(...d.children)
            width += d.width
          }
        })
      }
    } catch {
      children = []
      width = 0
    }

    return {
      children,
      width
    }
  }

  const getRowData = (data, index) => {
    const { left, center, right } = toRaw(data)
    return { left: left[index], center: center[index], right: right[index] }
  }

  // const setActiveClass = () => {}

  const renderLeftHeader = (_this) => {
    const HLRender = getChildNode(_this.$slots.left ? _this.$slots.left() : [])

    let HLContent = null
    let HLWapper = null

    if (HLRender.children.length !== 0) {
      HLContent = h(
        'div',
        {
          class: 'content-header-left',
          style: {
            width: HLRender.width + 'px',
            height: _this.headerHeight + 'px',
            lineHeight: _this.headerHeight + 'px'
          }
        },
        HLRender.children
      )
      HLWapper = h(
        'div',
        {
          tname: 'headerLeft',
          twidth: Number(_this.halfWidth),
          id: 'ts-table-header-left',
          class: 't-style-table-header-left wapper',
          style: { width: _this.halfWidth + 'px' }
        },
        HLContent
      )
    }

    return { HLRender, HLWapper }
  }

  const renderCenterHeader = (_this) => {
    const HCRender = getChildNode(
      _this.$slots.center ? _this.$slots.center() : []
    )
    const HLContent = h(
      'div',
      {
        class: 'content-header-center',
        style: {
          width: HCRender.width + 'px',
          height: _this.headerHeight + 'px',
          lineHeight: _this.headerHeight + 'px'
        }
      },
      HCRender.children
    )
    const HCWapper = h(
      'div',
      {
        tname: 'headerCenter',
        twidth: Number(HCRender.width),
        id: 'ts-table-header-center',
        class: `t-style-table-header-center ${_this.headerCenterClassName}`,
        style: { width: HCRender.width + 'px' }
      },
      HLContent
    )
    return { HCRender, HCWapper }
  }

  const renderRightHeader = (_this) => {
    const HRRender = getChildNode(
      _this.$slots.right ? _this.$slots.right() : []
    )
    const HRContent = h(
      'div',
      {
        class: 'content-header-right',
        style: {
          width: HRRender.width + 'px',
          height: _this.headerHeight + 'px',
          lineHeight: _this.headerHeight + 'px'
        }
      },
      HRRender.children
    )
    const HRWapper = h(
      'div',
      {
        tname: 'headerRight',
        twidth: Number(_this.halfWidth),
        id: 'ts-table-header-right',
        class: 't-style-table-header-right wapper',
        style: { width: _this.halfWidth + 'px' }
      },
      HRContent
    )

    return { HRRender, HRWapper }
  }

  const renderLeftBody = (_this, data, allData) => {
    const BLRender = getChildNode(_this.$slots.left ? _this.$slots.left() : [])

    const props = BLRender.children.map((item) => item.props)

    const contentChilds = data.map((dItem, index) => {
      const rowChilds = props.map((pItem) => {
        return h(
          'div',
          {
            class: 't-style-table-column',
            style: { width: pItem.width + 'px' }
          },
          dItem[pItem.prop]
        )
      })
      const currClass = currentRowIndex.value === index ? ' row-current' : ''
      return h(
        'div',
        {
          class: 't-style-table-row' + currClass,
          style: {
            height: _this.bodyItemHeight + 'px',
            lineHeight: _this.bodyItemHeight + 'px'
          },
          onClick: ($event) => {
            currentRowIndex.value = index
            handleClick($event, getRowData(allData, index), index)
          }
        },
        rowChilds
      )
    })

    const BLContent = h(
      'div',
      { class: 'content-body-left', style: { width: BLRender.width + 'px' } },
      contentChilds
    )
    const BLWapper = h(
      'div',
      {
        tname: 'bodyLeft',
        twidth: Number(_this.halfWidth),
        id: 'ts-table-body-left',
        class: 't-style-table-body-left wapper',
        style: {
          width: _this.halfWidth + 'px',
          height: _this.bodyHeight + 'px'
        }
      },
      BLContent
    )

    return { BLRender, BLWapper }
  }

  const renderCenterBody = (_this, data, allData) => {
    const BCRender = getChildNode(
      _this.$slots.center ? _this.$slots.center() : []
    )

    const props = BCRender.children.map((item) => item.props)

    const contentChilds = data.map((dItem, index) => {
      const rowChilds = props.map((pItem) => {
        return h(
          'div',
          {
            class: 't-style-table-column',
            style: { width: pItem.width + 'px' }
          },
          dItem[pItem.prop]
        )
      })
      const currClass = currentRowIndex.value === index ? ' row-current' : ''
      return h(
        'div',
        {
          class: 't-style-table-row' + currClass,
          style: {
            height: _this.bodyItemHeight + 'px',
            lineHeight: _this.bodyItemHeight + 'px'
          },
          onClick: ($event) => {
            currentRowIndex.value = index
            handleClick($event, getRowData(allData, index), index)
          }
        },
        rowChilds
      )
    })

    const BCContent = h(
      'div',
      { class: 'content-body-center', style: { width: BCRender.width + 'px' } },
      contentChilds
    )
    const BCWapper = h(
      'div',
      {
        tname: 'bodyCenter',
        twidth: Number(BCRender.width),
        id: 'ts-table-body-center',
        class: `t-style-table-body-center wapper ${_this.bodyCenterClassName}`,
        style: {
          width: BCRender.width + 'px',
          height: _this.bodyHeight + 'px'
        }
      },
      BCContent
    )

    return { BCRender, BCWapper }
  }

  const renderRightBody = (_this, data, allData) => {
    const BRRender = getChildNode(
      _this.$slots.right ? _this.$slots.right() : []
    )

    const props = BRRender.children.map((item) => item.props)

    const contentChilds = data.map((dItem, index) => {
      const rowChilds = props.map((pItem) => {
        return h(
          'div',
          {
            class: 't-style-table-column',
            style: { width: pItem.width + 'px' }
          },
          dItem[pItem.prop]
        )
      })
      const currClass = currentRowIndex.value === index ? ' row-current' : ''
      return h(
        'div',
        {
          class: 't-style-table-row' + currClass,
          style: {
            height: _this.bodyItemHeight + 'px',
            lineHeight: _this.bodyItemHeight + 'px'
          },
          onClick: ($event) => {
            currentRowIndex.value = index
            handleClick($event, getRowData(allData, index), index)
          }
        },
        rowChilds
      )
    })

    const BRContent = h(
      'div',
      { class: 'content-body-right', style: { width: BRRender.width + 'px' } },
      contentChilds
    )
    const BRWapper = h(
      'div',
      {
        tname: 'bodyRight',
        twidth: Number(_this.halfWidth),
        id: 'ts-table-body-right',
        class: 't-style-table-body-right wapper',
        style: {
          width: _this.halfWidth + 'px',
          height: _this.bodyHeight + 'px'
        }
      },
      BRContent
    )

    return { BRRender, BRWapper }
  }

  return {
    renderLeftHeader,
    renderRightHeader,
    renderCenterHeader,

    renderLeftBody,
    renderCenterBody,
    renderRightBody
  }
}
