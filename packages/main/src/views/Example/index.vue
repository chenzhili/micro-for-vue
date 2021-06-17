<template>
  <div>
    <p>Example</p>
    <!-- 从 setup 返回的 refs 在模板中访问时是被自动解开的，因此不应在模板中使用 .value -->
    <p>{{ counter }}</p>
    <el-button
      type="primary"
      @click="addCounter"
    >加</el-button>
    <el-button
      type="primary"
      @click="minusCounter"
    >减</el-button>
    <div style="margin-top: 48px">
      <p>example:{{ example }}</p>
      <el-button
        type="primary"
        @click="setInfoHandle"
      >setInfo:1</el-button>
      <el-button
        type="primary"
        @click="setInfoCustomHandle"
      > setInfoCustom:2 </el-button>
      <el-button
        type="primary"
        @click="setAllInfoHandle"
      > setAllInfo:3 </el-button>
    </div>
    <div style="margin-top: 48px">
      <svg-icon icon-class="hot"></svg-icon>
    </div>
    <div style="margin-top: 48px">
      <el-button
        type="primary"
        @click="alert"
      >show</el-button>
      <tip-dialog></tip-dialog>
    </div>
    <div style="margin-top: 48px">
      <el-button @click="show1">提示类弹窗1</el-button>
      <el-button @click="show2">提示类弹窗2</el-button>
      <el-button @click="show3">首页广告弹窗</el-button>
      <el-button @click="show4">报名成功-广告弹窗</el-button>
    </div>

    <dialog-com></dialog-com>
  </div>
</template>
<script>
import { ref, toRefs, watch, computed, onMounted, inject } from "vue"
import { useStore } from "vuex"
import { PHONE_REG, EMAIL_REG } from "../../utils/validate"
export default {
  inject: {
    test2: "test2"
  },
  components: {
  },
  props: {
    title: {
      type: String,
      default: "示例"
    }
  },
  data () {
    return {
      name: "这是示例",
      config: {
        submitText: '下一步'
        // title: '通过手机号找回'
      }
    }
  },
  setup (props, context) {
    // setup(props, { attrs, slots, emit })
    // Attribute (非响应式对象)
    console.log(context.attrs)
    // 插槽 (非响应式对象)
    console.log(context.slots)
    // 触发事件 (方法)
    console.log(context.emit)
    /*
    由于在执行 setup 时尚未创建组件实例，因此在 setup 选项中没有 this。
    这意味着，除了 props 之外，你将无法访问组件中声明的任何属性——本地状态、计算属性或方法。
    */
    console.log(this) // undefined

    // props 是响应式的，你不能使用 ES6 解构，因为它会消除 prop 的响应性。
    console.log("非解构", props.title)
    // 如果需要解构 prop，可以通过使用 setup 函数中的 toRefs 来安全地完成此操作。
    const { title } = toRefs(props)
    console.log("解构", title.value)

    const counter = ref(0)
    console.log(counter) // { value: 0 }
    console.log(counter.value) // 0
    const addCounter = () => {
      counter.value++
    }
    const minusCounter = () => {
      counter.value--
    }
    watch(counter, (newValue, oldValue) => {
      console.log("The new counter value is: " + counter.value)
    })

    onMounted(() => {
      console.log("This is step's mounted!")
    })

    const store = useStore()

    console.log(store)

    const $alert = inject('$alert')
    const alert = () => {
      $alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
    }

    return {
      counter,
      addCounter,
      minusCounter,
      example: computed(() => store.state.example),
      info: computed(() => store.getters.info),
      iinfoCustom: computed(() => store.getters.infoCustom),
      setInfoHandle: () => store.dispatch("example/setInfo", 1),
      setInfoCustomHandle: () => store.dispatch("example/setInfoCustom", 2),
      setAllInfoHandle: () => store.dispatch("example/setAllInfo", 3),
      alert
    } // 这里返回的任何内容都可以用于组件的其余部分
  },
  beforeCreate () {
    console.log("This is beforeCreate!")
  },
  created () {
    console.log("This is created!")
  },
  mounted () {
    console.log("$dcmAdd(1, 2)", this.$dcmAdd(1, 2))
    console.log("test2(1, 2)", this.test2(1, 2))
    console.log("This is also mounted!")
  },
  methods: {
    show1 () {
      this.$confirmDialog({ message: '确认要接触与微信的绑定嘛？', sub: '解绑后，将不能使用微信登录乾隆智慧云', maskClose: true }).then(res => {
        console.log(res)
      }).catch(e => {
        console.log(e)
      })
    },
    show2 () {
      this.$confirmDialog({ message: '确认删除全部消息？', maskClose: true }).then(res => {
        console.log(res)
      }).catch(e => {
        console.log(e)
      })
    },
    show3 () {
      this.$interstitialAd({ maskClose: true }).then(res => {
        console.log(res)
      }).catch(e => {
        console.log(e)
      })
    },
    show4 () {
      this.$applyDialog({ maskClose: true }).then(res => {
        console.log(res)
      }).catch(e => {
        console.log(e)
      })
    },
    test (data) {
      console.log(data)
    }
  }
}
</script>
<style lang="scss">
p {
  color: $primary-light-color;
}
</style>
