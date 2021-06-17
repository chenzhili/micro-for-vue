<template>
  <div class="hot">
    <div class="header">
      <div class="label-area">
        <div class="label">{{ label }}</div>
      </div>
      <div class="icon-area">
        <svg-icon class-name="icon" :icon-class="icon"></svg-icon>
      </div>
    </div>
    <ul class="list">
      <li class="list-item" v-for="item in 10" :key="item">
        <div class="list-item-line">
          <span class="left">时事热点时事热点时事热点时事热点时事热点时事热点</span>
          <span class="right">今天</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "时事热点"
    },
    icon: {
      type: String,
      default: "hot"
    }
  }
}
</script>

<style scoped lang="scss">
.hot {
  width: 298px;
  border: 1px solid $divide-line-color;
  border-radius: 9px;
  overflow: hidden;
  background-color: #ffffff;

  .header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $divide-line-color;
    .label-area {
      flex: 1;
      height: 54px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .label {
        font-size: 16px;
        font-weight: 400;
        color: $primary-text-color;
        height: 20px;
        line-height: 20px;
        border-left: 3px solid $primary-light-color;
        padding-left: 16px;
      }
    }

    .icon-area {
      flex: 1;
      height: 54px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      background: linear-gradient(270deg, #fff3d9, #ffffff);
      .icon {
        width: 24px;
        height: 24px;
        margin-right: 16px;
      }
    }
  }

  .list {
    &-item {
      list-style-type: square;
      color: $primary-light-color;
      font-size: 14px;
      font-weight: 400;
      margin: 16px 0;
      &::marker {
        font-size: 15px;
      }

      &-line {
        display: flex;
        justify-content: space-between;
        .left {
          color: $primary-text-color;
          text-align: left;
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
          &:hover{
            color: $primary-light-color;
            // transition: color 0.3s;
          }
        }
        .right {
          color: $gray-text-color;
          text-align: right;
          margin: 0 16px;
        }
      }
    }
  }
}
</style>
