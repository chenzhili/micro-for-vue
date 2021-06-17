<template>
  <div class="but" :class="type" :style="{width:width+'px'}">{{content}} </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default () {
        return "按钮内容"
      }
    },
    type: {
      type: String,
      default () {
        return "danger"
      }
    },
    width: {
      type: Number,
      default: 120
    }
    // butStyle: {
    //   type: Object,
    //   default () {
    //     return {
    //       width: '120px',
    //       height: '36px'
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.danger {
  background: #e0585b;
  color: #fff;
}
.normal {
  border: 1px solid #8d8d8d;
  color: #8d8d8d;
  background: #fff;
}
.but {
  display: flex;
  align-items: center;
  height: 36px;
  justify-content: center;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  &:hover {
    &.danger {
      background-color: #d9464a;
    }
    &.normal {
      border: 1px solid #505050;
      color: #505050;
    }
  }
}
</style>
