<template>
  <div class="funds-positions">
    <h3>资金持仓</h3>
    <ul>
      <li v-for="(item, index) in position" :key="index">
        <span class="attrname">{{item.label}}</span>
        <span class="attrvalue">{{item.percent?(parseFloat(item.value)*100).toFixed(2)+'%':item.value}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    positionsHeader: {
      type: Array,
      default: () => []
    },
    positionData: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    const position = props.positionsHeader.map(item => {
      return {
        label: item.label,
        props: item.props,
        percent: item.percent,
        value: props.positionData[item.props]
      }
    })
    return {
      position
    }
  }
}
</script>

<style lang="scss" scoped>
.funds-positions {
  h3{
    font-size: 16px;
    text-align: left;
    margin: 0;
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    padding: 0 33px;
    margin:23px 0 0;
    li{
      background: #F8F8F8;
      list-style: none;
      margin-bottom: 5px;
      position: relative;
      width: 296px;
      height: 42px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-right: 33px;
      &:nth-child(4n){
        margin-right: 0;
      }
      .attrname {
        position: absolute;
        left:12px
      }
      .attrvalue {
        position: absolute;
        color: #78787A;
        left:132px
      }
    }
  }
}
</style>
